import createUrl from "../libs/createUrl"
import createUrlArrayParameters from "../libs/createUrlArrayParameters"
import ServiceResponseHelper from '../models/ServiceResponseHelper'

export const getDepositsByFreights = async (freightIdList) => {
    const params = createUrlArrayParameters('freightId', freightIdList)
    try {
        const response = await fetch(createUrl('/outputs/op/getDepositsByFreights?' + params,))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, "API: Los Ids de los viajes enviados para obtener depositos son invalidos")
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener depositos por ids de viajes')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getOutputsByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/outputs', queryBody))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para consultar Egresos son invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'API: El Rango entre fecha de inicio y termino es maximo de 1 año')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Egresos')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getOutputById = async (id) => {
    try {
        const response = await fetch(createUrl(`/outputs/${id}`))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para obtener Egreso es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Egreso por Id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postOutput = async (output) => {
    try {
        const response = await fetch(createUrl('/outputs'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(output)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos del Egreso enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: Id del Egreso enviado esta en uso, refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putOutput = async (output) => {
    try {
        const response = await fetch(createUrl('/outputs'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(output)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para actualizar Egreso son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteOutput = async (id) => {
    try {
        const response = await fetch(createUrl(`/outputs/${id}`,), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El Id enviado para eliminar Egreso es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Egreso por Id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}