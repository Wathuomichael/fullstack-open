const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "DM settings",
    author: "RedDevilMike",
    url: "x.com/reddevilmike",
    likes: 4000
  },
  {
    title: "CB settings",
    author: "RedDevilMike",
    url: "x.com/reddevilmike",
    likes: 2000
  }
]

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs,
  blogsInDb
}
