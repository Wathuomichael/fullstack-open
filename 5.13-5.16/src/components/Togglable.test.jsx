import { render, screen } from "@testing-library/react"
import { beforeEach, expect } from "vitest"
import Togglable from "./Togglable"
import userEvent from "@testing-library/user-event"

describe('<Togglable />', () => {
  let container
  
  beforeEach(() => {
    container = render(
      <Togglable buttonLabel='Show all'>
        <div className="testdiv">
          togglable content
        </div>
      </Togglable>
    ).container
  })

  test('content not displayed at start', () => {
    const div = container.querySelector('.togglablecontent')
    expect(div).toHaveStyle('display: none')
  })

  test('content shown when button is pressed', async () => {
    const user = userEvent.setup()
    const button = screen.getByText('Show all')
    await user.click(button)

    const div = container.querySelector('.togglablecontent')
    expect(div).not.toHaveStyle('display: none')
  })
})
