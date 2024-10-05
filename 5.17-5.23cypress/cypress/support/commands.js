// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username, password) => {
    cy.get('input.username').type(username)
    cy.get('input.password').type(password)
    cy.get('button').contains('Login').click()
})

Cypress.Commands.add('addBlog', (title, author, url) => {
    cy.get('button').contains('Create New Blog').click()
    cy.get('input.title').type(title)
    cy.get('input.author').type(author)
    cy.get('input.url').type(url)
    cy.get('button.createblog').click()
})
