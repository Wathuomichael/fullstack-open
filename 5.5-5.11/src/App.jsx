import { useState, useEffect } from 'react'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/users'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import Blog from './components/Blog'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState(null)


  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])


  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
    })  
  }, [])

  const addBlog = async (blogObject) => {
    try {
      const newBlog = await blogService.addBlog(blogObject)
      setBlogs(blogs.concat(newBlog.data)) 
      setMessage({ content: `A new blog ${newBlog.data.title} has been added`, type: 'info' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error) 
    }
  }

  const handleUserSubmit = async (event, { username, password }) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedInUser', JSON.stringify(user))
    } catch (error) {
      console.log(error) 
      setMessage({ content: 'Invalid Credentials', type: 'error' })
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    }
  }

  return (
    <div>
      <Notification message={message}/>
      {user === null ? 
        <Login handleSubmit={handleUserSubmit}/> :
        <div>
          <p>{user.name} is logged in</p>
          <Togglable buttonLabel='Create New Blog'>
            <BlogForm user={user} createBlog={addBlog} />
          </Togglable>
          <h1>Blogs</h1>
          {blogs.map(blog => {
            return <Blog key={blog.id} blog={blog}/>
          })}
        </div>}
    </div>
  )
}

export default App
