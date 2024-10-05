import { render, screen } from "@testing-library/react"
import BlogForm from "./BlogForm"
import userEvent from "@testing-library/user-event"
import { assert, expect } from "vitest"

test('<BlogForm />', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleInput = screen.getByPlaceholderText('title')
  const authorInput = screen.getByPlaceholderText('author')
  const urlInput = screen.getByPlaceholderText('url')
  const submit = screen.getByText('Create')

  await user.type(titleInput, 'testblog')
  await user.type(authorInput, 'testuser')
  await user.type(urlInput, 'x.com/testuser')
  await user.click(submit)
  
  expect(createBlog.mock.calls).toHaveLength(1)
  console.log(createBlog.mock.calls)
  assert.deepStrictEqual(createBlog.mock.calls[0][0], { title: 'testblog', author: 'testuser', url: 'x.com/testuser' })
})
