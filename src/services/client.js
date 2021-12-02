import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/clients/dropdownlist'))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putClient = async (client) => {
    try {
        const response = await fetch(createUrl('/clients'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados del Cliente son invalidos. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El RUC enviado ya esta registrado, cambielo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al actualizar Cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getClientById = async (id) => {
    try {
        const response = await fetch(createUrl(`/clients/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Cliente es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener Cliente por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteClientById = async (id) => {
    try {
        const response = await fetch(createUrl(`/clients/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id para eliminar Cliente es invalido. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Cliente a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependen de este Cliente.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al eliminar Cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postClient = async (client) => {
    try {
        const response = await fetch(createUrl('/clients'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados del Cliente son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El RUC enviado ya esta registrado, cambielo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al crear Cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getClients = async () => {
    try {
        const response = await fetch(createUrl('/clients'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener Clientes')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getClientFreightsByQuery = async (query) => {
    const clientId = query.clientId
    delete query.clientId
    try {
        const response = await fetch(createUrl(`/clients/${clientId}/freights`, query))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos de consulta son invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'El intervalo maximo para buscar viajes no liquidados es de 1 año, corrija las fechas')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener viajes no liquidados')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}