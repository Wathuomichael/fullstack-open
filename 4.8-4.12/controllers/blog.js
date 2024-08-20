const Blog = require('../models/blog')
const blogRouter = require('express').Router()

blogRouter.get('/', async (request, response) => {
  const blogs= await Blog.find({})
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

module.exports = blogRouter

