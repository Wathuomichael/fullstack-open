const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(result => console.log('connected to mongodb'))
.catch(error => console.log('failed to connect to mongodb', error))

const contactSchema = new mongoose.Schema({
  name: String,
  number: String
})

const contactModel = mongoose.model('contact', contactSchema)

module.exports = contactModel


