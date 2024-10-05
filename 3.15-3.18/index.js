const express = require('express')
const app = express()
const cors = require('cors')
const contactModel = require('./db')
const errorHandler = require('./errorHandler')

require('dotenv').config()
app.use(cors())
app.use(express.json())

let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api', async(req, res, next) => {
  try {
    const contactsList = await contactModel.find()
    console.log(contactsList)
    res.json(contactsList) 
  } catch (error) {
    next(error)    
  }
})

app.get('/info', async(req, res, next) => {
  const date = new Date()
  try {
    const contactsList = await contactModel.find()
    console.log(contactsList)
    res.write(`<p>Phonebook has info for ${contactsList.length} people</p>`)
    res.write(`<p>${date}</p>`)
    res.end()
  } catch (error) {
    next(error)    
  }
})

app.get('/api/persons/:id', async(req, res, next) => {
  const id = req.params.id
  try {
    const contact = await contactModel.findById({_id: id})
    if(!contact) {
      res.status(400).send({ message: 'Contact not found'})
    }
    res.json(contact)
  } catch (error) {
    
  }
})


app.post('/api', async(req, res, next) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }
  const contact = new contactModel({
    id: Math.floor(Math.random() * 100),
    name,
    number
  }) 
  try {
    await contact.save()
    console.log('post route')
    res.json(contact)
  } catch (error) {
    next(error)   
  }
})


app.delete('/api/:id', async(req, res, next) => {
  const id = req.params.id
  try {
    const deletedContact = await contactModel.findByIdAndDelete({ _id: id })  
    res.json(deletedContact)
  } catch (error) {
    next(error)  
  }
})

app.put('/api/:id', async(req, res, next) => {
  const id = req.params.id
  const contact = await contactModel.findById({_id: id})
  if(!contact) {
    res.status(400).send({ message: 'Contact not found'})
  }

  const { name, number } = req.body
  const updatedContact = {
    name,
    number
  }
  try {
    await contactModel.findByIdAndUpdate({_id: id}, updatedContact, { runValidators: true })
    res.json(updatedContact)
  } catch (error) {
    next(error)    
  }
})

app.use(errorHandler)

app.listen('3000', () => {
    console.log(`Server running on port 3000`)
})
