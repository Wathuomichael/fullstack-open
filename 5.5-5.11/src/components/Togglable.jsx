import { useState } from "react"

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(null)
  
  const hideWhenVisible = visibility ? { display: 'none' } : { display: '' }
  const showWhenVisible = visibility ? { display: '' } : { display: 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button onClick={toggleVisibility}>Cancel</button>
      </div>
    </div>
  )
}

export default Togglable
