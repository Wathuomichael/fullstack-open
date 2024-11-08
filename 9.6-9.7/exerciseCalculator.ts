import { Exercise, exerciseParams } from "./types"

export const calculateExercise = (params: exerciseParams): Exercise => {
    const exercises: number[] = params.daily_exercises
    const target: number = params.target
    const periodLength: number = exercises.length
    const trainingDays: number = exercises.filter((hours: number) => hours !== 0).length
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

