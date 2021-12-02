import createUrl from "../libs/createUrl"
import ServiceResponseHelper from '../models/ServiceResponseHelper'

export const getExpenseSettlementsByQuery = async (queryBody) => {
    try {
        const response = await fetch(createUrl('/expenseSettlements', queryBody))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para consultar liquidaciones de gastos son invalidos')
        if (response.status === 422) return new ServiceResponseHelper(false, 'API: El Rango entre fecha de inicio y termino es maximo de 1 año')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getExpenseSettlementById = async (id) => {
    try {
        const response = await fetch(createUrl(`/expenseSettlements/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para obtener liquidacion de gasto es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}


export const postExpenseSettlement = async (expenseSettlement) => {
    try {
        const response = await fetch(createUrl('/expenseSettlements'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseSettlement)
        })

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para crear liquidacion de gasto son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'API: Id para crear liquidacion de gasto esta en uso')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putExpenseSettlement = async (expenseSettlement) => {
    try {
        const response = await fetch(createUrl('/expenseSettlements'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(expenseSettlement)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Datos para actualizar liquidacion de gasto son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteExpenseSettlement = async (id) => {
    try {
        const response = await fetch(createUrl(`/expenseSettlements/${id}`,), {
            method: 'DELETE'
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: El id enviado para eliminar liquidacion de gasto es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'La liquidacion de gasto a eliminar esta en uso en este modulo o en otros, primero elimine sus dependientes')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}