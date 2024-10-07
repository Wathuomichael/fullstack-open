import { useSelector, useDispatch } from 'react-redux'
import { addVote, initializeAnecdotes, newAnecdote } from './reducers/anecdoteReducer'
import { setNotification } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    dispatch(initializeAnecdotes())
  }, [])

  const anecdotes = useSelector(state => state.anecdotes.filter((anecdote) => {
    const pattern = new RegExp(`${state.filter}`, 'gi')
    return Boolean(anecdote.content.match(pattern))
  }))

  const vote = (anecdote) => {
    dispatch(addVote(anecdote.id))
    dispatch(setNotification(`You voted '${anecdote.content}'`, 5))
  }

  const addAnecdote = async(event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(newAnecdote(anecdote))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <AnecdoteList anecdotes={anecdotes} vote={vote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
