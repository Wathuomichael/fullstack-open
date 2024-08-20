const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  if(request.body.title && request.body.url) {
    const blog = new Blog(request.body)

    const newPost = await blog.save()
    response.status(201).json(newPost)
  }
  response.status(400).json({
    message: 'missing properties'
  })
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

