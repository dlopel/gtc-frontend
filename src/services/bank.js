import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/banks/dropdownlist'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener items del dropdownlist de Bancos')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putBank = async (bank) => {
    try {
        const response = await fetch(createUrl('/banks'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bank)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Banco enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El nombre del Banco enviado ya esta en uso')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Banco')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getBankById = async (id) => {
    try {
        const response = await fetch(createUrl(`/banks/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Banco es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Banco por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getBanks = async () => {
    try {
        const response = await fetch(createUrl(`/banks`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Bancos')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteBankById = async (id) => {
    try {
        const response = await fetch(createUrl(`/banks/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para eliminar Banco es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Banco a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependientes.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Banco')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postBank = async (bank) => {
    try {
        const response = await fetch(createUrl('/banks'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(bank)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos del Banco enviado son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID y el Nombre enviado del Banco ya estan registrados. Cambie el Nombre, refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Banco')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}