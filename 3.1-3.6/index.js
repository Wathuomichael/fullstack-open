const express = require('express')
const app = express()

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

app.get('/info', (req, res) => {
  const date = new Date()
  res.write(`<p>Phonebook has info for ${persons.length} people</p>`)
  res.write(`<p>${date}</p>`)
  res.end()
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id - '1'
  if(id > persons.length) {
    res.status(404)
  }
  res.json(persons[id])
})

app.get('/api/persons', (req, res) => {
   res.json(persons) 
})

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id - '1'
  res.send(persons.filter(person => {
    return person.id !== id
  }))
})

app.listen('3000', () => {
    console.log(`Server running on port 3000`)
})
