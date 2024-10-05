import { render, screen } from "@testing-library/react"
import Blog from "./Blog"
import { expect } from "vitest"
import userEvent from "@testing-library/user-event"

test('renders blog', () => {
    const blog = {
        title: 'test blog',
        author: 'testuser',
        url: 'x.com/testuser',
        likes: 12
    }
    const { container } = render(<Blog blog={blog}/>)

    const title = container.querySelector('.title')
    const author = container.querySelector('.author')
    const extra = container.querySelector('.extra')

    expect(title).toHaveTextContent('test blog')
    expect(author).toHaveTextContent('testuser')
    expect(extra).toHaveStyle('display: none')
})

test('like button adds as many likes as clicks', async () => {
    const blog = {
        title: 'test blog',
        author: 'testuser',
        url: 'x.com/testuser',
        likes: 12
    }
    const mockHandler = vi.fn()
    const { container } = render(<Blog blog={blog} addLike={mockHandler}/>)

    const user = userEvent.setup()
    const button = screen.getByText('Like')

    await user.dblClick(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})

