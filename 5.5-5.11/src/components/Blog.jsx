import { useState } from "react"

const Blog = ({ blog }) => { 
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
      {blog.title} {blog.author}
      <button onClick={() => setView(!view)}>{view ? 'Hide' : 'View'}</button>
      <div style={fullView}>
        <p>Likes: {blog.likes}</p>
        <p>Link: {blog.url}</p>
      </div>
    </div>
  )
}

export default Blog
