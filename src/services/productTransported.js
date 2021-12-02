import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getProductTransportedById = async (id) => {
    try {
        const response = await fetch(createUrl(`/transportedProducts/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Producto Transportado es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Producto Transportado por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getTransportedProductsByFreight = async (freightId) => {
    try {
        const response = await fetch(createUrl(`/transportedProducts`, { freightId }))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id del Flete enviado para obtener Productos Transportados es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Productos Transportados por id del Flete')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteProductTransportedById = async (id) => {
    try {
        const response = await fetch(createUrl(`/transportedProducts/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para eliminar Producto Transportado es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Producto Transportado')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postProductTransported = async (productTransported) => {
    try {
        const response = await fetch(createUrl('/transportedProducts'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productTransported)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Producto Transportado enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID enviado ya esta registrado. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Producto')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}