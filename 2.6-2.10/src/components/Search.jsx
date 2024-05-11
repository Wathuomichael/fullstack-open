
const Search = (props) => {
  return (
    <div>Search
      <input onChange={(e) => {
        props.handleChange(e)
      }}/>
    </div>
  )
}

export default Search
