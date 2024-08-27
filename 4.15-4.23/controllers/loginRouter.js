const loginRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const bcrypt = require('bcrypt')
const config = require('../utils/config')

loginRouter.post('/', async (request, response) => {
  const { username, password } = request.body

  const user = await User.findOne({ username })

  const userValidation = user === null ? false : await bcrypt.compare(password, user.password) 

  if(!(user && userValidation)) {
    return response.status(400).json({ message: 'invalid credentials' })
  }
  
  const token = jwt.sign(user.id, config.secret)
  response.status(200).send(token)
})

module.exports = loginRouter
