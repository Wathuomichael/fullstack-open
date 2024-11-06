import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { QueryParams } from './types'

const app = express()

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

const PORT = 3000

app.listen(PORT, () =>  console.log(`Server running on port ${PORT}`))
