const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const blogRouter = require('./controllers/blog')
const connectDB = require('./utils/db')
const userRouter = require('./controllers/user')
const middleware = require('./utils/middleware')
const loginRouter = require('./controllers/loginRouter')
const config = require('./utils/config')

connectDB()

app.use(cors())
app.use(express.json())
app.use(middleware.tokenExtractor)

app.use('/api/blogs', middleware.userExtractor, blogRouter)
app.use('/api/users', userRouter)
app.use('/api/users/login', loginRouter)

if (config.NODE_ENV === 'test') {
  const testRouter = require('./controllers/testing')
  app.use('/api/tests', testRouter)
}

app.use(middleware.errorHandler)


module.exports = app
