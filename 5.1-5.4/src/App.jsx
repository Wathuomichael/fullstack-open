import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  const handleSubmit = async (event, { username, password }) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      console.log(user)
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    user === null ? 
    <Login handleSubmit={handleSubmit}/> :
    <div>
      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App
