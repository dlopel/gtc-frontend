import React, { useEffect, useState, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import TransportSectionInputs from './TransportSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import Transport from '../models/Transport'
import * as transportServices from '../services/transport'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function TransportSectionMaintenance() {
    const { id } = useParams()
    const [transport, setTransport] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete(e) {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await transportServices.deleteTransportById(id)
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
        const newTransport = new Transport(
            id,
            e.target.ruc.value.trim(),
            e.target.name.value.trim(),
            e.target.address.value.trim(),
            e.target.telephone.value.trim(),
            e.target.observation.value.trim()
        )
        if (newTransport.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await transportServices.putTransport(newTransport)
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
            alert(`Datos invalidos para actualizar transportista. Refresque la pagina y vuelva a ingresar los datos correctamente.`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        setIsLoading(true)
        transportServices.getTransportById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setTransport(response.body)
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
        return (<Redirect push to='/transportistas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Transportista - ${transport ? transport.name : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <TransportSectionInputs
                            disabled={disabled}
                            values={transport || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/transportistas'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}