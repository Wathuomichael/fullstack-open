const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, createBlog } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/tests/reset')
    await request.post('/api/users', {
      data: {
        username: 'testuser',
        name: 'test user',
        password: 'testuser'
      }
    })
    await page.goto('/')
  })

  test('Login form is shown', async ({ page }) => {
    const locator = page.getByRole('heading', { name: 'Login' })
    await expect(locator).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'testuser')
      await expect(page.getByText('test user is logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'testuser', 'wrong')
      await expect(page.getByText('Invalid Credentials')).toBeVisible()
    })
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {
      await loginWith(page, 'testuser', 'testuser')
    })

    test('a new blog can be created', async ({ page }) => {
      await createBlog(page, 'testblog', 'testuser', 'x.com/testuser')
      await expect(page.getByText('A new blog testblog has been added')).toBeVisible()
      await expect(page.getByRole('button', { name: 'View' })).toBeVisible()
    })

    test('blog can be liked', async ({ page }) => {
      await createBlog(page, 'testblog', 'testuser', 'x.com/testuser')
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Like' }).click()
      await expect(page.getByText('Likes: 1')).toBeVisible()
    })

    test('blog can be deleted by user', async ({ page }) => {
      await createBlog(page, 'testblog', 'testuser', 'x.com/testuser')
      await page.getByRole('button', { name: 'View' }).click()
      await page.getByRole('button', { name: 'Delete' }).click()
      page.on('dialog', dialog => dialog.accept())

      await expect(page.getByText('testblog', { exact: true })).not.toBeVisible()
    })
  })
})
