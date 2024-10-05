const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')
const blogRouter = require('./controllers/blog')
const { MONGO_URI } = require('./utils/config')



mongoose.connect(MONGO_URI)

app.use(cors())
app.use(express.json())

app.use('/api/blogs', blogRouter)

module.exports = app
