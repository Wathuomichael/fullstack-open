import { useState } from 'react'

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-1234567' },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault() 
    let alreadyAdded = false;

    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i]) === JSON.stringify(newContact)) {
        alert(`${newContact.name} is already added to the phonebook`)
        alreadyAdded = true
        break
      }
    }

    if (!alreadyAdded) {
      setPersons([
        ...persons,
        newContact
      ]);
    }
  } 

  const handleNameChange = (e) => {
    const name = e.target.value
    setNewContact({
      ...newContact,
      name
    }) 
  }

  const handleNumberChange = (e) => {
    const number = e.target.value
    setNewContact({
      ...newContact,
      number
    }) 
  }

  const handleFindChange = (e) => {
    const searchInput = e.target.value
    setSearchTerm(searchInput)
  }

  return (
    <div>
      <h2>Find</h2>
      <input onChange={handleFindChange} value={searchTerm}/>
      <h2>Phonebook</h2>
      <form onSubmit={handleSubmit}>
        <div>
          name: <input name='name' value={newContact.name} onChange={handleNameChange}/>
        </div>
        <div>
          number: <input name='number' value={newContact.number} onChange={handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.filter(obj => {
        return obj.name.toLowerCase().startsWith(searchTerm.toLowerCase())
      }).map(obj => {
          return (
            <div key={obj.name}>
              <p>{obj.name}</p>
              <p>{obj.number}</p>
            </div>
          )
        })}
    </div>
  )
}

export default App
