import { useEffect, useState } from 'react'
import Search from './components/Search'
import Contactform from './components/Contactform'
import Contacts from './components/Contacts'
import contactService from './services/contacts'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    contactService.getAll()
    .then(response => {
      setPersons(response.data)
    })
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault() 
    let alreadyAdded = false;

    for (let i = 0; i < persons.length; i++) {
//      console.log(JSON.stringify(persons[i]), JSON.stringify(newContact))
      if (persons[i].name === newContact.name) {
        contactService.update(persons[i].id, newContact)
        .then(response => {
          setPersons(persons.map(person => persons[i].id !== person.id ? person : response.data))
          console.log(response)
        })
        alreadyAdded = true
        console.log(persons, newContact)
        break
      }
    }

    if (!alreadyAdded) {
      contactService.create(newContact)
      .then(response => setPersons(persons.concat(response.data)))
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

  const handleDelete = (obj) => {
    if(window.confirm(`Delete ${obj.name}?`)) {
      contactService.deleteContact(obj.id)
      setPersons(persons.filter(item => item.id !== obj.id))
    }
  }

  return (
    <div>
      <h2>Find</h2>
      <Search handleChange={handleFindChange}/>
      <h2>Phonebook</h2>
      <Contactform handlesubmit={handleSubmit} handlenamechange={handleNameChange} handlenumberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} searchterm={searchTerm} onclick={handleDelete}/>
    </div>
  )
}

export default App
