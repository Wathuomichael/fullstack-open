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
    </div> 
  ) 
}

export default BlogForm
