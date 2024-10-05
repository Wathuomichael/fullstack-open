import { useState } from "react"



const Login = ({ handleSubmit }) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div>
      <form onSubmit={(event) => {
        handleSubmit(event, { username, password })
        setUsername('')
        setPassword('')
      }}>
        <div>
          Username:
          <input name="username" type="text" value={username} onChange={({ target }) => setUsername(target.value)}></input>
        </div>
        <div>
          Password:
          <input name="password" type="password" value={password} onChange={({ target }) => setPassword(target.value)}></input>
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}

export default Login  
