import { useSelector, useDispatch } from 'react-redux'
import { addVote, createAnecdote, setAnecdotes } from './reducers/anecdoteReducer'
import { notify, remove } from './reducers/notificationReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import Notification from './components/Notification'
import { useEffect } from 'react'
import anecdoteService from './services/anecdotes'

const App = () => {
  const dispatch = useDispatch()
  
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))       
  }, [])

  const anecdotes = useSelector(state => state.anecdotes.filter((anecdote) => {
    const pattern = new RegExp(`${state.filter}`, 'gi')
    return Boolean(anecdote.content.match(pattern))
  }))

  const vote = (id) => {
    dispatch(addVote(id))
    dispatch(notify(id))
    setTimeout(() => {
      dispatch(remove(''))
    }, 5000)
  }

  const addAnecdote = async(event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    const newAnecdote = await anecdoteService.addAnecdote(anecdote) 
    dispatch(createAnecdote(newAnecdote))
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
