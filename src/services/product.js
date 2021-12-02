import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownListByClient = async (clientId) => {
    try {
        const response = await fetch(createUrl('/products/dropdownlist', { clientId }))

        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener items del dropdownlist de Productos es invalido.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de Productos')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putProduct = async (product) => {
    try {
        const response = await fetch(createUrl('/products'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Producto enviado son invalidos')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Producto')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getProductById = async (id) => {
    try {
        const response = await fetch(createUrl(`/products/expanded/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Producto es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Producto por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteProductById = async (id) => {
    try {
        const response = await fetch(createUrl(`/products/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para eliminar Producto es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'La Producto a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependientes.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Producto')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postProduct = async (product) => {
    try {
        const response = await fetch(createUrl('/products'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Producto enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID enviado ya esta registrado. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Producto')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getPaginationOfCompressedProductsByQuery = async (queryBody, page) => {
    queryBody.page = page.toString()
    try {
        const response = await fetch(createUrl('/products/compressed', queryBody))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'API: Los datos enviados para obtener Productos comprimidos son invalidos. Refreque la pagina y vuela a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Productos comprimidos y filtrados')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}