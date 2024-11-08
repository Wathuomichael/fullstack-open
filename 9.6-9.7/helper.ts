export const helper = (args: string[]): number[] => {
    return args.splice(2, Infinity).map(arg => {
        if(!isNaN(Number(arg))) {
            return Number(arg)
        } else {
            throw new Error('Parameters provided should be numbers')
        }
    })    
}
