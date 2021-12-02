import createUrl from "../libs/createUrl"
import ServiceResponseHelper from '../models/ServiceResponseHelper'

export const putTransport = async (transport) => {
    try {
        const response = await fetch(createUrl('/transports'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(transport)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Transportista enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El RUC enviado ya esta registrado, cambielo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Transportista')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getTransportById = async (id) => {
    try {
        const response = await fetch(createUrl(`/transports/expanded/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Transportista es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Transportista por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteTransportById = async (id) => {
    try {
        const response = await fetch(createUrl(`/transports/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id para eliminar Transportista es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Transportista a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependen de este Transportista.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Transportista')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postTransport = async (tranport) => {
    try {
        const response = await fetch(createUrl('/transports'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(tranport)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Transportista enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El RUC enviado ya esta registrado, cambielo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Transportista')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getCompressedTransports = async () => {
    try {
        const response = await fetch(createUrl('/transports/compressed'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Transportistas comprimidos')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/transports/dropdownlist'))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de Transportistas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}