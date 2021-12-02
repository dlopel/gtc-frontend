export const roundToOneDecimal = (number) => {
    return Math.round((number + Number.EPSILON) * 10) / 10
}