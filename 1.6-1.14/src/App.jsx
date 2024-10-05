import { useState } from 'react'

const Statistics = ({ good, neutral, bad, total }) => {
  if(total == 0) {
    return (
      <div>
        <h1>Statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
  return (
    <div>
      <h1>Statistics</h1>
      <tbody>
        <tr>
          <StatisticsLine text='good' value={good} />
        </tr>
        <tr>
          <StatisticsLine text='neutral' value={neutral} />
        </tr>
        <tr>
          <StatisticsLine text='bad' value={bad} />
        </tr>
        <tr>
          <StatisticsLine text='all' value={total} />
        </tr>
        <tr>
          <StatisticsLine text='average' value={(good - bad) / total} />
        </tr>
        <tr>
          <StatisticsLine text='positive' value={(good / total) * 100} />
        </tr>
      </tbody>
    </div>
  )
}

const StatisticsLine = ({ text, value }) => {
  return (
    <p>{text} {value}</p>
  )
}


const Button = ({ handleClick, text }) => {
  return (
    <button onClick={handleClick}>{text}</button>
  )
}


const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState([0,0,0,0,0,0,0,0])
  const [maxVoteCountIndex, setMaxVoteCountIndex] =useState(0)

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   

  const handleGood = () => {
    setGood(good + 1);
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1);
  }

  const handleBad = () => {
    setBad(bad + 1);
  }

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random() * 8)); 
  }

  const voteAnecdote = () => {
    const copy = [...votes];
    copy[selected] += 1;
    setVotes(copy); 
    const max = Math.max(...copy);
    const index = copy.indexOf(max);
    setMaxVoteCountIndex(index);
  }

  const total = good + neutral + bad;
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={handleGood} text='good' />
      <Button handleClick={handleNeutral} text='neutral' />
      <Button handleClick={handleBad} text='bad' />
      <Statistics good={good} neutral={neutral} bad={bad} total={total} />
      {anecdotes[selected]}<br />
      <p>has {votes[selected]}</p><br />
      <Button handleClick={voteAnecdote} text='vote' />
      <Button handleClick={randomAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      {anecdotes[maxVoteCountIndex]}<br />
      <p>has {votes[maxVoteCountIndex]}</p>
    </div>
  )
}

export default App
