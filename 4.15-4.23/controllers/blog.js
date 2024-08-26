const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const user = await User.findById('66ccc968dc71c9212bab30a2')

  if(!(request.body.title && request.body.url)) {
    response.status(400).json({
      message: 'missing properties'
    })
  }
  const blog = new Blog({
    title,
    author, 
    url, 
    likes,
    user: user.id
  })
  const newPost = await blog.save()
  user.blogs = user.blogs.concat(newPost._id)
  await user.save()
  response.status(201).json(newPost)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id  
  const deletedBlog = await Blog.findByIdAndDelete({ _id: id })
  response.status(204).json(deletedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updatedBlog = request.body
  const update = await Blog.findByIdAndUpdate({ _id: id }, updatedBlog, { new: true })
  response.status(200).json(update)
})

module.exports = blogRouter

