import { helper } from "./helper"
import { QueryParams } from "./types"

export const calculateBmi = (params?: QueryParams): string => {
    let bmi: number = 0
    if(require.main === module) {
        const desc: number[] = helper(process.argv)
        bmi = desc[1] / ((desc[0] / 100) ^ 2)
    } else {
        const height: number = Number(params?.height)
        const weight: number = Number(params?.weight)
        bmi = weight / ((height / 100) ^ 2)
    }

    console.log(bmi)
    if(bmi < 18.5) {
        return 'Underweight'
    } else if(bmi > 25) {
        return 'Overweight'
    } else {
        return 'Normal'
    }
}

console.log(calculateBmi())
