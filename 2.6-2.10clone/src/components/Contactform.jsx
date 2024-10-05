const Contactform = (props) => {
  return (
    <div>
      <form onSubmit={(e) => {
        props.handlesubmit(e)
      }}>
        <div>
          name: <input name='name' onChange={(e) => {
            props.handlenamechange(e)
          }}/>
        </div>
        <div>
          number: <input name='number' onChange={(e) => {
            props.handlenumberchange(e)
          }}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default Contactform
