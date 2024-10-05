
const Contacts = ({ persons, searchterm, onclick }) => {
  return (
    <div>
      {persons.filter(obj => {
        return obj.name.toLowerCase().startsWith(searchterm.toLowerCase())
      }).map(obj => {
          return (
            <div key={obj.name}>
              <p>{obj.name}</p>
              <p>{obj.number}</p>
              <button onClick={() => {
                onclick(obj)
              }}>Delete</button>
            </div>
          )
        })}
    </div>
  )
}

export default Contacts
