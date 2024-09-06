import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/users'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [message, setMessage] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs)
      console.log(blogs)
    })  
  }, [])

  useEffect(() => {
    const loggedInUser = window.localStorage.getItem('loggedInUser')
    if(loggedInUser) {
      const user = JSON.parse(loggedInUser)
      setUser(user)
    }
  }, [])

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

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    try {
      const newBlog = await blogService.addBlog({ title: blogTitle, author: blogAuthor, url: blogUrl })
      setBlogs(blogs.concat(newBlog.data)) 

      setBlogTitle('')
      setBlogAuthor('')
      setBlogUrl('')
      setMessage({ content: `A new blog ${blogTitle} has been added`, type: 'info'})
      setTimeout(() => {
        setMessage(null)
      }, 5000)
    } catch (error) {
      console.log(error) 
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedInUser')
    setUser(null)
  }

  return (
    <div>
      <Notification message={message}/>
      {user === null ? 
        <Login handleSubmit={handleUserSubmit}/> :
        <div>
          <h2>blogs</h2>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <form onSubmit={handleBlogSubmit}>
            <h1>Create new</h1>
            <div>
              Title:<input type='text' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)}></input>
            </div>
            <div>
              Author:<input type='text' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)}></input>
            </div>
            <div>
              Url:<input type='text' value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)}></input>
            </div>
            <button type='submit'>Create</button>
          </form>
          {blogs.map(blog =>
            <Blog key={blog.id} blog={blog} />
          )}
        </div>}
    </div>
  )
}

export default App
