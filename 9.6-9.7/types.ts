export interface QueryParams {
    height: string,
    weight: string
}

export interface exerciseParams {
    daily_exercises: number[],
    target: number
}

export interface Exercise {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

