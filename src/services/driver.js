import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async (transportId) => {
    try {
        const response = await fetch(createUrl('/drivers/dropdownlist', { transportId }), )

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para obtener items del dropdownlist de los conductores es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de los conductores ')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postDriver = async (formData) => {
    try {
        const response = await fetch(createUrl('/drivers'), {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }
        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos enviados invalidos. Maximo 3 imagenes, 1MB por imagen')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: El Dni, la Licencia, el Nombre o el Apellido del conductor ya estan registrados, verifique los datos, refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'API: Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Conductor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }

}

export const getCompressedDriversByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/drivers/compressed', queryBody))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para obtener conductores comprimidos son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener conductores comprimidos')

    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putDriver = async (formData) => {
    try {
        const response = await fetch(createUrl('/drivers'), {
            method: 'PUT',
            body: formData
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }
        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos enviados invalidos. Maximo 3 imagenes, 1MB por imagen')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: El Dni, la Licencia, el Nombre o el Apellido del conductor ya estan registrados, verifique los datos, refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'API: Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Conductor')

    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getDriverById = async (id) => {
    try {
        const response = await fetch(createUrl(`/drivers/expanded/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El ID enviado para obtener conductor es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener conductor por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteDriverById = async (id) => {
    try {
        const response = await fetch(createUrl(`/drivers/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El ID enviado para eliminar conductor es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Conductor a eliminar esta en uso en este modulo o en otros, primero elimine sus dependientes')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar conductor por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}