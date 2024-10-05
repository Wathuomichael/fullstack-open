const mongoose = require('mongoose')
const { MONGODB_URI } = require('./config')

const connectDB = async () => {
  mongoose.connect(MONGODB_URI)
  console.log('Connected to DB') 
}

module.exports = connectDB
