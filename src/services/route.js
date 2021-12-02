import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async (clientId) => {
    try {
        const response = await fetch(createUrl('/routes/dropdownlist', { clientId }))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener items del dropdownlist de Rutas es invalido.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de Rutas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putRoute = async (route) => {
    try {
        const response = await fetch(createUrl('/routes'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos de la Ruta enviada son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Ruta')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getRouteById = async (id) => {
    try {
        const response = await fetch(createUrl(`/routes/expanded/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Ruta es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Ruta por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteRouteById = async (id) => {
    try {
        const response = await fetch(createUrl(`/routes/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para eliminar Ruta es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'La Ruta a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependen de esta Ruta.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Ruta')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postRoute = async (route) => {
    try {
        const response = await fetch(createUrl('/routes'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(route)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos de la Ruta enviada son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID enviado ya esta registrado. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Ruta')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getPaginationOfCompressedRoutesByQuery = async (queryBody, page) => {
    queryBody.page = page.toString()
    try {
        const response = await fetch(createUrl('/routes/compressed', queryBody))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para obtener Rutas comprimidas son invalidos. Refreque la pagina y vuela a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Rutas comprimidas y filtradas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}