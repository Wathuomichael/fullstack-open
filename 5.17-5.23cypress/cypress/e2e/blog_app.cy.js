describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/tests/reset')
    const user = {
      name: 'test user',
      username: 'testuser',
      password: 'testuser'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:5173')
  })

  it('Login form is shown', function() {
    cy.get('#loginform').contains('Login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.login('testuser', 'testuser')

      cy.get('p').contains('test user is logged in').should('be.visible')
    })

    it('fails with wrong credentials', function() {
      cy.login('testuser', 'wrong')

      cy.get('h2').contains('Invalid Credentials').should('be.visible')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.login('testuser', 'testuser')
    })

    it('A blog can be created', function() {
      cy.addBlog('testblog', 'testuser', 'x.com/testuser')

      cy.get('h2').contains('A new blog testblog has been added').should('be.visible')
    })

    describe('When blogs are added', function() {
      beforeEach(function() {
        cy.addBlog('firstblog', 'testuser', 'x.com/testuser')
        cy.get('button').contains('Cancel').click()
        cy.addBlog('secondblog', 'testuser', 'x.com/testuser')
        cy.get('button').contains('Cancel').click()
        cy.addBlog('thirdblog', 'testuser', 'x.com/testuser')
      })

      it('A blog can be liked', function() {
        cy.contains('firstblog').parent().first().as('firstBlog');
        cy.get('@firstBlog').contains('View').click()
        cy.get('@firstBlog').contains('Likes:').then(likesText => {
          const initialLikes = parseInt(likesText.text().split(': ')[1])

          cy.get('@firstBlog').get('button').contains('Like').click()

          cy.get('@firstBlog').contains('Likes:').should(likes => {
            const newLikes = parseInt(likes.text().split(': ')[1])
            expect(newLikes).to.eq(initialLikes + 1)
          })
        })
      })

      it('A blog can be deleted', function() {
        cy.get('.blog').first().as('firstBlog');
        cy.get('@firstBlog').contains('View').click()
        cy.get('@firstBlog').find('.title').invoke('text').as('blogTitle')
        cy.get('@firstBlog').contains('Delete').click()

        cy.get('@blogTitle').then((title) => {
          cy.contains(title).should('not.exist');
        })
      })
    })
  })
})
