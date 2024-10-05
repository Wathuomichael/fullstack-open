import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote } from './reducers/anecdoteReducer'
import { notify, remove } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'

const App = () => {
  const anecdotes = useSelector(state => state.anecdotes.filter((anecdote) => {
    const pattern = new RegExp(`${state.filter}`, 'gi')
    return Boolean(anecdote.content.match(pattern))
  }))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(notify(id))
    setTimeout(() => {
      dispatch(remove(''))
    }, 5000)
  }

  const addAnecdote = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    dispatch(createAnecdote(anecdote))
    event.target.anecdote.value = ''
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification anecdotes={anecdotes}/>
      <AnecdoteList anecdotes={anecdotes} vote={vote}/>
      <AnecdoteForm addAnecdote={addAnecdote}/>
    </div>
  )
}

export default App
