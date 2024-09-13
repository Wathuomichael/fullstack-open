import { useState } from "react"
import PropTypes from 'prop-types'

const Togglable = (props) => {
  const [visibility, setVisibility] = useState(null)
  
  const hideWhenVisible = visibility ? { display: 'none' } : { display: '' }
  const showWhenVisible = visibility ? { display: '' } : { display: 'none' }

  const toggleVisibility = () => {
    setVisibility(!visibility)
  }

  Togglable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
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
