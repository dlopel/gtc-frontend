import createUrl from "../libs/createUrl"
import ServiceResponseHelper from "../models/ServiceResponseHelper"

export const postSctr = async (formData) => {
    try {
        const response = await fetch(createUrl('/sctrs'), {
            method: 'POST',
            body: formData
        })

        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }
        if (response.status === 400) return new ServiceResponseHelper(false, 'Datos enviados invalidos y maximo 1 imagen (PDF) de 1MB. Refresque la pagina y vuelva a intentarlo')
        if (response.status === 405) return new ServiceResponseHelper(false, 'Metodo Http no permitido')
        if (response.status === 422) return new ServiceResponseHelper(false, 'No se envio la imagen de la poliza. Refresque la pagina y vuelva a intentar')
        if (response.status === 409) return new ServiceResponseHelper(false, 'El Id de la sctr ya esta en uso. Refresque la pagina y vuelva a intentar')
        if (response.status === 415) return new ServiceResponseHelper(false, 'Imagenes solo en formato PDF')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al crear Sctr')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getSctrs = async () => {
    try {
        const response = await fetch(createUrl('/sctrs'))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener sctrs')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const putSctrById = async ({ observation }, id) => {
    //only it update the observation field
    try {
        const response = await fetch(createUrl(`/sctrs/${id}`), {
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
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al actualizar Sctr')

    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const getSctrById = async (id) => {
    try {
        const response = await fetch(createUrl(`/sctrs/${id}`))
        if (response.ok) {
            const data = await response.json()
            return new ServiceResponseHelper(true, 'ok', data)
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para obtener Sctr es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al obtener Sctr por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}

export const deleteSctrById = async (id) => {
    try {
        const response = await fetch(createUrl(`/sctrs/${id}`), {
            method: 'DELETE'
        })
        if (response.ok) {
            return new ServiceResponseHelper(true, 'ok')
        }

        if (response.status === 400) return new ServiceResponseHelper(false, 'El ID enviado para eliminar Sctr es invalido')
        if (response.status === 500) return new ServiceResponseHelper(false, 'Error en el servidor al eliminar Sctr por id')
    } catch (error) {
        return new ServiceResponseHelper(false, 'Problemas en la red')
    }
}