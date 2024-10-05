import { useEffect, useState } from 'react'
import axios from 'axios'

const App = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const [countries, setCountries] = useState([])
  const [searchList, setSearchList] = useState([])

  useEffect(() => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        setCountries(response.data)
      })

  },[])

  const handleChange = (e) => {
    const searchInput = e.target.value
    setSearchTerm(searchInput)
    const list = countries.filter(country => {
      const userInput = searchInput.toLowerCase()
      const listItem = country.name.common.toLowerCase()
      return userInput && listItem.startsWith(userInput);
    })
    setSearchList(list)
  }

  const handleClick = (country) => {
    axios.get(`https://studies.cs.helsinki.fi/restcountries/api/name/${country}`)
    .then(response => {
      setSearchList([response.data])
      console.log(response.data)
    })

  }
  
  return (
    <div>
      <form>
        <p>find countries</p>
        <input onChange={handleChange} value={searchTerm} />
      </form>   
      {searchList.length > 10 ? 
        <p>Too many matches, specify another filter</p>
        :
        searchList.length == 1 ?
        <div>
          <h1>{searchList[0].name.common}</h1>
          <p>Capital: {searchList[0].capital[0]}</p>
          <p>Area: {searchList[0].area}</p>
          <h2>Languages:</h2>
          <ul>  
          {Object.values(searchList[0].languages).map(language => {
            return(
              <li key={language}>{language}</li>
            )
          })}
          </ul>
          <img src={searchList[0].flags.png} alt='Country flag'/>
        </div>
        :
        searchList.map((country) => (
          <div key={country.name.common} className='country-list'>
            <p className=''>{country.name.common}</p>
            <button onClick={() => {
              handleClick(country.name.common)
            }}>Show</button>
          </div>
        ))
      }
    </div>
  )
}

export default App  
