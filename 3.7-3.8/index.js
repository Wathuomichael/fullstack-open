const express = require('express')
const morgan = require('morgan')
const app = express()
const cors = require('cors')

app.use(express.json())
app.use(cors())


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

app.get('/', (req, res) => {
  res.json(persons) 
})

app.get('/info', (req, res) => {
  const date = new Date()
  res.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  res.write(`<p>${date}</p>`)
  res.end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id
  res.send(persons.filter(person => {
    return person.id == id
  }))
})


app.post('/', (req, res) => {
  const { name, number } = req.body
  if (!name || !number) {
    return res.status(400).json({ 
      error: 'content missing' 
    })
  }
  persons.forEach(person => {
    if(name == person.name) {
      return res.status(400).json({
        error: 'name must be unique'
      })
    }
  })
  const person = {
    id: Math.floor(Math.random() * 100),
    name,
    number
  } 
  persons.push(person)
})


app.delete('/api/persons/del/:id', (req, res) => {
  
  const id = req.params.id
  res.send(persons.filter(person => {
    return person.id !== id
  }))
  
})


app.listen('3000', () => {
    console.log(`Server running on port 3000`)
})
