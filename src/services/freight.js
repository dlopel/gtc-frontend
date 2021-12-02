import createUrl from "../libs/createUrl"
import createUrlArrayParameters from "../libs/createUrlArrayParameters"
import ServiceResponseHelper from '../models/ServiceResponseHelper'

export const getFreightsByExpenseSettlement = async (expenseSettlementId) => {
    try {
        const response = await fetch(createUrl('/freights/compressed', { expenseSettlementId }))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Id de liquidacion de gasto para consultar fletes es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getFreightsNotLiquidatedByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/freights/notLiquidated/compressed', queryBody))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para consultar fletes no liquidados son invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'API: El Rango entre fecha de inicio y termino es maximo de 3 meses')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getPaginationOfCompressedFreightsByQuery = async (queryBody, page) => {
    queryBody.page = page.toString()
    try {
        const response = await fetch(createUrl('/freights/paginated/compressed', queryBody))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos de consulta invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'API: El Rango entre fecha de desde y hasta es maximo de 1 año')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getFreightById = async (id) => {
    try {
        const response = await fetch(createUrl(`/freights/expanded/id/${id}`))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para obtener el flete es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getFreightByFormattedId = async (formattedId) => {
    try {
        const response = await fetch(createUrl(`/freights/expanded/formattedId/${formattedId}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El CODIGO DEL VIAJE no existe, borrelo o vuelva a ingresarlo correctamente')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Viaje por codigo')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postFreight = async (freight) => {
    try {
        const response = await fetch(createUrl('/freights'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(freight)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para crear flete son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: Id para crear flete esta en uso')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putFreight = async (freight) => {
    try {
        const response = await fetch(createUrl('/freights'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(freight)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para actualizar flete son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}
//argumento de lista de id's de fletes para PATCH
//puedes pasar null para desvincular los fletes de la liquidacion
export const patchFreightsExpenseSettlement = async (expenseSettlementId, freightIdList) => {
   
    const params = createUrlArrayParameters('freightId', freightIdList)
    try {
        const response = await fetch(createUrl(`/freights?${params}`), {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ expenseSettlementId })
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para actualizar liquidacion de gastos de fletes son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteFreight = async (id) => {
    try {
        const response = await fetch(createUrl(`/freights/${id}`,), {
            method: 'DELETE'
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para eliminar flete es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Flete a eliminar esta en uso en este modulo o en otros, primero elimine sus dependientes')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}