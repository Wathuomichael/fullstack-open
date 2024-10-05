import { useState } from "react"

const BlogForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleBlogSubmit = async (event) => {
    event.preventDefault()
    createBlog({ title: blogTitle, author: blogAuthor, url: blogUrl })
    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  return (
    <div>
      <form onSubmit={handleBlogSubmit}>
        <h1>Create new</h1>
        <div>
          Title:<input className="title" placeholder="title" type='text' value={blogTitle} onChange={({ target }) => setBlogTitle(target.value)}></input>
        </div>
        <div>
          Author:<input className="author" placeholder="author" type='text' value={blogAuthor} onChange={({ target }) => setBlogAuthor(target.value)}></input>
        </div>
        <div>
          Url:<input className="url" placeholder="url" type='text' value={blogUrl} onChange={({ target }) => setBlogUrl(target.value)}></input>
        </div>
        <button className="createblog" type='submit'>Create</button>
      </form>
    </div> 
  ) 
}

export default BlogForm
