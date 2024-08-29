const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const connectDB = require('./utils/db')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/loginRouter')

connectDB()

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/users/login', loginRouter)
app.use(middleware.errorHandler)


module.exports = app
