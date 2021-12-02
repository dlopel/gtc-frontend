import createUrl from "../libs/createUrl"
import ServiceResponseHelper from '../models/ServiceResponseHelper'

export const getSaleSettlementsByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/saleSettlements', queryBody))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Datos de consulta invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'El intervalo de fecha para buscar es maximo 1 año')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener liquidaciones de viajes clientes')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getSaleSettlementById = async (id) => {
    try {
        const response = await fetch(createUrl(`/saleSettlements/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para obtener liquidacion de viaje cliente es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postSaleSettlement = async (saleSettlement) => {
    try {
        const response = await fetch(createUrl('/saleSettlements'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleSettlement)
        })

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados para crear liquidacion de viaje cliente son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID para crear liquidacion de viaje cliente esta en uso. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al crear liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putSaleSettlementById = async (saleSettlement) => {
    const id = saleSettlement.id
    delete saleSettlement.id
    try {
        const response = await fetch(createUrl(`/saleSettlements/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleSettlement)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados para actualizar Liquidacion de viaje cliente son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al actualizar Liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteSaleSettlement = async (id) => {
    try {
        const response = await fetch(createUrl(`/saleSettlements/${id}`,), {
            method: 'DELETE'
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para eliminar liquidacion de viaje cliente es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'La liquidacion de viaje a eliminar esta en uso en este modulo o en otros, primero elimine sus dependientes')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al eliminar liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}


/** SUB RESOURCE DETAILS*/

export const getDetailBatchBySaleSettlementId = async (id) => {
    try {
        const response = await fetch(createUrl(`/saleSettlements/${id}/details`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Datos de consulta invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener detalle de la liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postSaleSettlementDetailBatch = async (
    saleSettlementId,
    saleSettlementDetailList
) => {
    try {
        const response = await fetch(createUrl(`/saleSettlements/${saleSettlementId}/details`), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(saleSettlementDetailList)
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los Datos enviados para crear detalles de liquidacion de viaje cliente son invalidos. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 404) return new ServiceResponseHelper(false, 'La liquidacion de viaje cliente no existe')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID de algunos de los detalles de la liquidacion de viaje cliente esta en uso. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al crear detalles liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteDetailBatchBySaleSettlementId = async (id) => {
    try {
        const response = await fetch(createUrl(`/saleSettlements/${id}/details`,), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID de la liquidacion de viaje cliente es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al eliminar detalles de la liquidacion de viaje cliente')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}