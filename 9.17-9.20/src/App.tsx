import { useEffect, useState } from "react"
import { DiaryEntry, NewDiaryEntry } from "./types"
import axios from "axios"

const App = () => {
  const [diaries, setDiaries] = useState<DiaryEntry[]>([])
  const [date, setDate] = useState('')
  const [weather, setWeather] = useState('')
  const [visibility, setVisibility] = useState('')
  const [comment, setComment] = useState('')
  const [notification, setNotification] = useState('')

  const baseUrl = 'http://localhost:3000/api/diaries'

  useEffect(() => {
    axios.get<DiaryEntry[]>(baseUrl)
      .then(response => setDiaries(response.data))
  },[])

  const handleSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()
    const newDiary: NewDiaryEntry = {
      date,
      weather,
      visibility,
      comment
    } 

    try {
      await axios.post(baseUrl, newDiary)
      .then(response => {
        setDiaries(diaries.concat(response.data))
      })
    } catch (error: unknown) {
      if(axios.isAxiosError(error)) {
        setNotification(error.response?.data)
        console.log(error.response?.data)
      }
    }


    setDate('')
    setWeather('')
    setVisibility('')
    setComment('')
  }

  return (
    <div>
      <h1>Add new entry</h1>
      <p className="error">{notification}</p>
      <form onSubmit={handleSubmit}>
        Date: <input className="full" type="date" value={date} onChange={(event) => setDate(event.target.value)} />
        <br />
        <div className="radio-group">
        Weather:
        {['sunny', 'rainy', 'cloudy', 'stormy', 'windy'].map((option) => (
            <label htmlFor={option} key={option}>{option}
            <input
              name="weather"
              type="radio"
              id={option}
              value={option}
              checked={weather === option}
              onChange={(event) => setWeather(event.target.value)}
            />
            </label>
        ))}
        </div>
        <br />
        <div className="radio-group">
        Visibility:
        {['great', 'good', 'ok', 'poor'].map((option) => (
            <label htmlFor={option} key={option}>{option}
            <input
              name="visibility"
              type="radio"
              id={option}
              value={option}
              checked={visibility === option}
              onChange={(event) => setVisibility(event.target.value)}
            />
            </label>
        ))}
        </div>
        Comment: <input className="full" value={comment} onChange={(event) => setComment(event.target.value)} />
        <button type="submit">Add</button>
      </form>
      <h1>Diary Entries</h1>
      {diaries.map(diary => {
        return (
          <div>
            <h3>{diary.date}</h3>
            <p>Visibility: {diary.visibility}</p>
            <p>Weather: {diary.weather}</p>
          </div>
        )
      })}
    </div>
  )
}

export default App  
