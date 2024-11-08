import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { Exercise, exerciseParams, QueryParams } from './types'
import { calculateExercise } from './exerciseCalculator'
import { Request, Response } from 'express'

const app = express()
app.use(express.json())

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
    const params = req.query as unknown as QueryParams
    console.log(isNaN(Number(params.weight)))
    if(isNaN(Number(params.height)) || isNaN(Number(params.weight))) {
        res.status(400)
        throw new Error('malformatted parameters')
    }
    const bmi = calculateBmi(params)
    res.send(`bmi is: ${bmi}`)
})

app.post('/exercises', (req: Request<unknown, unknown, exerciseParams>, res: Response) => {
    const { daily_exercises, target } = req.body
    if(daily_exercises.length == 0 || target == undefined) {
        res.status(400).send({ error: 'parameters missing' })
    }
    if(!(daily_exercises.every(day => typeof day === 'number'))) {
        res.status(400).send({ error: 'malformatted parameters' })
    }
    const result: Exercise = calculateExercise({ daily_exercises, target })
    res.json(result)
})

const PORT = 3000

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`))
