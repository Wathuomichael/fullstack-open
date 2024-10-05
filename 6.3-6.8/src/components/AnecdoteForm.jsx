const AnecdoteForm = ({ addAnecdote }) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={(event) => {
        addAnecdote(event)
      }}>
        <div><input name='anecdote'/></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm 
