
const Contacts = ({ persons, searchterm }) => {
  console.log(persons)
  return (
    <div>
      {persons.filter(obj => {
        return obj.name.toLowerCase().startsWith(searchterm.toLowerCase())
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

export default Contacts
