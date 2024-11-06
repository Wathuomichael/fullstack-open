import { helper } from "./helper"

interface Exercise {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercise = (): Exercise => {
    const details: number[] = helper(process.argv)
    const exercises: number[] = details.splice(1, Infinity)
    const target: number = details[0]
    const periodLength: number = exercises.length
    const trainingDays: number = exercises.filter((hours: number) => hours !== 0).length
    console.log(exercises.reduce((counter, currentValue) => currentValue !== 0 && counter + 1, 0))
    const success: boolean = exercises.find((hours: number) => hours < target) === undefined ? true : false
    const average: number = (exercises.reduce((acc, curr) => acc + curr)) / exercises.length
    const rating: number = average > 2 ? 3 : average > 1 ? 2 : 1
    const ratingDescription: string = rating == 3 ? 'Good' : rating == 2 ? 'Average' : 'Bad' 

    return {
        periodLength,
        trainingDays,
        success,
        rating,
        ratingDescription,
        target,
        average
    }
} 

console.log(calculateExercise())
