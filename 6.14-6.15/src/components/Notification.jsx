import { useSelector } from "react-redux"

const Notification = ({ anecdotes }) => {
  const notification = useSelector(state => state.notification)
  const style = notification ? 
    {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
  : 
    {
      display: 'none'
    }
  return (
    <div style={style}>
      {anecdotes.map(anecdote => anecdote.id == notification ? anecdote.content : '')}
    </div>
  )
}

export default Notification
