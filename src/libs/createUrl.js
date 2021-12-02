import { API_URL } from '../config'

const createUrl = (path, queryFields = {}) => {
    const searchParams = new URLSearchParams()
    Object.entries(queryFields).forEach(([k, v]) => {
        searchParams.append(k, v)
    })
    const qs = searchParams.toString() && `?${searchParams.toString()}`
    return `${API_URL}${path}${qs}`
}

export default createUrl