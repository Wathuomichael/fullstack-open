import { useState } from "react"

const Blog = ({ blog, addLike, deleteBlog }) => { 
  const [view, setView] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const fullView = view ? { display: '' } : { display: 'none' }

  return (
    <div style={blogStyle}>
      <div className="title">
        {blog.title}
      </div>
      <div className="author"> 
        {blog.author}
      </div>
      <button className="toggleblog" onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
      <div style={fullView} className="extra">
        <p className="likes">Likes: {blog.likes}</p>
        <button onClick={() => addLike(blog)}>Like</button>
        <p className="url">Link: {blog.url}</p>
        <button onClick={() => deleteBlog(blog)} style={{ backgroundColor: 'red'}}>Delete</button>
      </div>
    </div>
  )
}

export default Blog
