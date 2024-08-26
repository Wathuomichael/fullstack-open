const express = require('express')
const app = express()
require('express-async-errors')
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const connectDB = require('./utils/db')
const loginRouter = require('./controllers/user')
const errorHandler = require('./utils/middleware')

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)
app.use('/api/users', loginRouter)
app.use(errorHandler)


module.exports = app
