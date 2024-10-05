const loginWith = async (page, username, password) => {
  await page.getByTestId('username').fill(username)
  await page.getByTestId('password').fill(password)
  await page.getByRole('button', { name: 'Login'}).click()
}

const createBlog = async (page, title, author, url) => {  
  await page.getByRole('button', { name: 'Create New Blog' }).click()

  const blogInputs = await page.getByRole('textbox').all()
  await blogInputs[0].fill(title)
  await blogInputs[1].fill(author)
  await blogInputs[2].fill(url)
  await page.getByRole('button', { name: 'Create' }).click()
}

export { loginWith, createBlog }
