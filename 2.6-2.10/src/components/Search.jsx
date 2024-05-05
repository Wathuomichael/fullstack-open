import { useState } from "react"

const Search = ({ clicked }) => {
  const [searchTerm, setSearchTerm] = useState('')
  return (
    <div> 
      <h2>Find</h2>
      <input onChange={() => {
        clicked(searchTerm)
      }} value={searchTerm}/>
    </div>
  )
}

export default Search 
