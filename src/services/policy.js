import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const getDataForDropDownList = async () => {
    try {
        const response = await fetch(createUrl('/policies/dropdownlist'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }
        if (response.status === 500) return new ServiceResponseHelper(false, 'API: Error en el servidor al optener items del dropdownlist de polizas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const postPolicy = async (formData) => {
    try {
        const response = await fetch(createUrl('/policies'), {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }
        if (response.status === 400) return new ServiceResponseHelper(false, 'Datos enviados invalidos y maximo 1 imagen (PDF) de 1MB. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 405) return new ServiceResponseHelper(false, 'Metodo Http no permitido')
        if (response.status === 422) return new ServiceResponseHelper(false, 'No se envio la imagen de la poliza. Refresque la pagina y vuelva a intentar')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Id de la poliza ya esta en uso. Refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al crear Poliza')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getPolicies = async () => {
    try {
        const response = await fetch(createUrl('/policies'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener polizas')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putPolicyById = async ({ observation }, id) => {
    //only it update the observation field
    console.log(JSON.stringify({ observation }))
    try {
        const response = await fetch(createUrl(`/policies/${id}`), {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ observation })
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'Los datos enviados son invalidos. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al actualizar Poliza')

    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getPolicyById = async (id) => {
    try {
        const response = await fetch(createUrl(`/policies/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para obtener Poliza es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener Poliza por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deletePolicyById = async (id) => {
    try {
        const response = await fetch(createUrl(`/policies/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para eliminar Poliza es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al eliminar Poliza por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}