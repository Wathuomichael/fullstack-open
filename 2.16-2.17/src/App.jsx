import { useEffect, useState } from 'react'
import Search from './components/Search'
import Contactform from './components/Contactform'
import Contacts from './components/Contacts'
import contactService from './services/contacts'
import Notification from './components/Notification'
import './App.css'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [message, setMessage] = useState(null)

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
        console.log('got here')
        contactService.update(persons[i].id, newContact)
          .then(response => {
            setPersons(persons.map(item => {
              return item.id !== newContact.id ? item : newContact 
            }))
          })
          .catch(error => {
            setMessage(`Information of ${newContact.name} has already been removed from the server`)
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })

        alreadyAdded = true
        break
      }
    }

    if (!alreadyAdded) {
      contactService.create(newContact)
        .then(response => setPersons(persons.concat(response.data)))
      setMessage('Contact was added')
      setTimeout(() => {
        setMessage(null)
      }, 5000)
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
        .then(response => setPersons(persons.filter(item => item.id !== response.data.id)))
        .catch(error => {
          setMessage(`Information of ${obj.name} has already been removed from the server`)
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  return (
    <div>
      <Notification message={message} />
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
