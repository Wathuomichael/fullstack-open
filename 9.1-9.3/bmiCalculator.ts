import { helper } from "./helper"

const calculateBmi = (): string => {
    const desc = helper(process.argv)
    const bmi: number = desc[1] / ((desc[0] / 100) ^ 2)

    if(bmi < 18.5) {
        return 'Underweight'
    } else if(bmi > 25) {
        return 'Overweight'
    } else {
        return 'Normal'
    }
}

console.log(calculateBmi())
