import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
        console.log(countries)
      })

  },[])
  const handleSubmit = (e) => {
  }

  const handleChange = (e) => {
    const searchInput = e.target.value
    setSearchTerm(searchInput)
    console.log(searchInput)
  }
  
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <p>find countries</p>
        <input onChange={handleChange} value={searchTerm} />
      </form>   
      {countries.filter(country => {
        const userInput = searchTerm.toLowerCase()
        const listItem = country.name.common.toLowerCase()
        return userInput && listItem.startsWith(userInput);
      }).map(country => {
        return (
          <div key={country.name.common}>
            <p>{country.name.common}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App  
