import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Login from './components/Login'
import loginService from './services/users'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

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
    } catch (error) {
      console.log(error) 
    }
  }

  return (
    user === null ? 
    <Login handleSubmit={handleUserSubmit}/> :
      <div>
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
        <h2>blogs</h2>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
  )
}

export default App
