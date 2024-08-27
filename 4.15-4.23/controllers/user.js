const userRouter = require('express').Router()
const User = require('../models/user')
const bcrypt = require('bcrypt')

userRouter.get('/', async (request, response) => {
  const users = await User.find().populate('blogs')
  response.json(users)
})

userRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body
  
  if(password.length < 3) {
    return response.status(400).json({ message: 'minimum of 3 characters required for password' })
  }
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const user = new User({
    username,
    name,
    password: hashedPassword
  })

  const savedUser = await user.save()
  response.status(201).json(savedUser)
})

module.exports = userRouter
