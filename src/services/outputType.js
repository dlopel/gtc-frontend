import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/outputTypes/dropdownlist'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener datos para la lista desplegable de Tipos de Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putOutputType = async (outputType) => {
    try {
        const response = await fetch(createUrl('/outputTypes'), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(outputType)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados del Tipo de Egreso son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El nombre del Tipo de Egreso ya existe, intente con otro')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al actualizar Tipo de Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getOutputTypeById = async (id) => {
    try {
        const response = await fetch(createUrl(`/outputTypes/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para obtener Tipo de Egreso  es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Tipo de Egreso por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteOutputTypeById = async (id) => {
    try {
        const response = await fetch(createUrl(`/outputTypes/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El id enviado para eliminar Tipo de Egreso es invalido')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Tipo de Egreso a eliminar esta en uso en este modulo o en otros. Primero elimine los registros que dependientes.')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al eliminar Tipo de Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postOutputType = async (outputType) => {
    try {
        const response = await fetch(createUrl('/outputTypes'), {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(outputType)
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados del Tipo de Egreso son invalidos')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El ID y el Nombre del Tipo de Egreso enviado ya esta registrado. Cambie el Nombre, refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al crear Tipo de Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getOutputTypes = async () => {
    
    try {
        const response = await fetch(createUrl('/outputTypes'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al obtener Tipos de Egreso')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}