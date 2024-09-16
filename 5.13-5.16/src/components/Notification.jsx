const Notification = ({ message }) => {
  if(message === null) {
    return null
  }
  return (
    <div className={message.type}>
      <h2>{message.content}</h2>
    </div>
  )
}

export default Notification
