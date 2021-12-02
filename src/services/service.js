import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/services/dropdownlist'))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}