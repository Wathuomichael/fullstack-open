export const filter = (filterTerm) => {
  console.log('dispatched')
  return {
    type: 'FILTER',
    payload: { filterTerm }
  }
}

const reducer = (state = '', action) => {
  switch (action.type) {
    /* case 'FILTER': {
      const pattern = /`<${action.payload.filterTerm}>`/
      return state.filter(anecdote => Boolean(anecdote.match(pattern)))
    } */
    case 'FILTER': 
      return action.payload.filterTerm
    default: return state
  }
}

export default reducer
