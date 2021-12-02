import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async (transportId) => {
    try {
        const response = await fetch(createUrl('/units/dropdownlist', { transportId }))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El ID enviado para optener items del dropdownlist de unidades es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al optener items del dropdownlist de unidades')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getBodyTypeDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/units/dropdownlist/bodyTypes'))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de carrocerias')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postUnit = async (formData) => {
    try {
        const response = await fetch(createUrl('/units'), {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos enviados invalidos. Maximo 4 imagenes, 1MB por imagen')
        if (response.status === 405) return new ServiceResponseHelper(false, 'API: Metodo no permitido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: El numero de Chasis, de Motor o la Placa de la Unidad ya estan registrados, verifique los datos, refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'API: Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Unidad')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getCompressedUnitsByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/units/compressed', queryBody))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para obtener unidades comprimidas son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener unidades comprimidas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putUnit = async (formData) => {
    try {
        const response = await fetch(createUrl('/units'), {
            method: 'PUT',
            body: formData
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }
        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos enviados invalidos. Maximo 4 imagenes, 1MB por imagen')
        if (response.status === 405) return new ServiceResponseHelper(false, 'API: Metodo no permitido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: El numero de Chasis, de Motor o la Placa de la Unidad ya estan registrados, verifique los datos, refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'API: Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Unidad')

    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getUnitById = async (id) => {
    try {
        const response = await fetch(createUrl(`/units/expanded/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El ID enviado para obtener Unidad es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Unidad por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteUnitById = async (id) => {
    try {
        const response = await fetch(createUrl(`/units/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El ID enviado para eliminar Unidad es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'La Unidad a eliminar esta en uso en este modulo o en otros. Primero elimine sus dependientes')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Unidad por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}