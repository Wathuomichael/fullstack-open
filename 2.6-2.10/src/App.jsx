import { useEffect, useState } from 'react'
import Search from './components/Search'
import Contactform from './components/Contactform'
import Contacts from './components/Contacts'
import axios from 'axios'
const baseUrl = '/api'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newContact, setNewContact] = useState({ name: '', number: '' })
  const [searchTerm, setSearchTerm] = useState('')
  const [trigger, setTrigger] = useState(true)


  const fetchData = async() => {
    const response = await axios.get(baseUrl)
    console.log('Fetched data:', response.data)
    setPersons(response.data)
  }

  useEffect(() => {
    fetchData()
    console.log('useeffect triggered')
  }, [trigger])

  const handleSubmit = async(e) => {
    e.preventDefault() 
    let alreadyAdded = false;

    for (let i = 0; i < persons.length; i++) {
      if (JSON.stringify(persons[i]) === JSON.stringify(newContact)) {
        alert(`${newContact.name} is already added to the phonebook`)
        alreadyAdded = true
        break
      }
    }

    if(!alreadyAdded) {
      await axios.post(baseUrl, newContact)
      setTrigger(!trigger)
      console.log('axios post done')
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
      <Search handleChange={handleFindChange}/>
      <h2>Phonebook</h2>
      <Contactform handlesubmit={handleSubmit} handlenamechange={handleNameChange} handlenumberchange={handleNumberChange}/>
      <h2>Numbers</h2>
      <Contacts persons={persons} searchterm={searchTerm}/>
    </div>
  )
}

export default App
