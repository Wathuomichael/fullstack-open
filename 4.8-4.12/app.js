const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const connectDB = require('./utils/db')

connectDB()

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
