import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import ClientSectionInputs from './ClientSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import Client from '../models/Client'
import * as clientServices from '../services/client'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function ClientSectionMaintenance() {
    const { id } = useParams()
    const [client, setClient] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete(e) {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await clientServices.deleteClientById(id)
            if (isMounted.current) {
                if (response.ok) {
                    alert('Eliminado correctamente')
                    setIsLoading(false)
                    setActionExecuted(true)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        }
    }

    function handleClickEdit(e) {
        setDisabled(false)
    }

    async function handleSubmitToUpdate(e) {
        e.preventDefault()
        const client = new Client(
            id,
            e.target.ruc.value.trim(),
            e.target.name.value.trim(),
            e.target.address.value.trim(),
            e.target.observation.value.trim()
        )
        if (client.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await clientServices.putClient(client)
                if (isMounted.current) {
                    if (response.ok) {
                        alert('Actualizado correctamente')
                        setIsLoading(false)
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            }
        } else {
            alert(`Datos invalidos para actualizar cliente. Refresque la pagina y vuelva a ingresar los datos correctamente.`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        setIsLoading(true)
        clientServices.getClientById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setClient(response.body)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            })
    }, [id])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/clientes' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Clientes - ${client.name}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <ClientSectionInputs
                            disabled={disabled}
                            values={client} />
                        <SectionCRUDButtons
                            redirectionPath='/clientes'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}