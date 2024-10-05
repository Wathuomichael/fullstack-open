const mongoose = require('mongoose')

require('dotenv').config()

const uri = process.env.MONGO_URI
mongoose.connect(uri)
.then(result => console.log('connected to mongodb'))
.catch(error => console.log('failed to connect to mongodb', error))

const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 3
  },
  number: {
    type: String,
    minlength: 8,
    validate: {
      validator: function(v) {
        return /^\d{2,3}-\d+$/.test(v);
      },
      message: props => `${props.value} is not a valid phone number!`
    }

  }
})

const contactModel = mongoose.model('contact', contactSchema)

module.exports = contactModel


