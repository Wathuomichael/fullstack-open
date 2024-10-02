const Blog = require('../models/blog')
const blogRouter = require('express').Router()
const User = require('../models/user')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')


blogRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
  const { title, author, url, likes } = request.body
  const decodedToken = jwt.verify(request.token, config.secret)
  const user = await User.findById({ _id: decodedToken.id })
  console.log(decodedToken.id, request.token, user)
  if(!decodedToken.id) {
    response.status(401).json({ message: 'invalid token' })
  }

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
  user.save()
  response.status(201).json(newPost)
})

blogRouter.delete('/:id', async (request, response) => {
  const id = request.params.id  
  const blog = await Blog.findById(id)
  const decodedToken = jwt.verify(request.token, config.secret)
  const user = await User.findById({ _id: decodedToken.id })

  if(!decodedToken.id) {
    request.status(401).json({ message: 'invalid token' })
  }


  if((decodedToken.id.toString() === blog.user.id.toString())) {
    response.status(401).json({ message: 'Unauthorized'})
  }

  const deletedBlog = await Blog.findByIdAndDelete({ _id: id })
  const index = user.blogs.indexOf(id)
  user.blogs.splice(index, 1)
  await user.save()

  response.status(204).json(deletedBlog)
})

blogRouter.put('/:id', async (request, response) => {
  const id = request.params.id
  const updatedBlog = request.body
  const update = await Blog.findByIdAndUpdate({ _id: id }, updatedBlog, { new: true })
  response.status(200).json(update)
})

module.exports = blogRouter

