export default function createUrlArrayParameters(parameterName, array) {
    const params = array.map(item => {
        return `${parameterName.toString()}[]=${encodeURIComponent(item.toString())}`
    }).join('&')
    return params
}