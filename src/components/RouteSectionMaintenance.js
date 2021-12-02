import SectionHeader from './SectionHeader'
import RouteSectionInputs from './RouteSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Route from '../models/Route'
import * as routeServices from '../services/route'
import './Section.css'

export default function RouteSectionMaintenance() {
    const { id } = useParams()
    const [route, setRoute] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actionExecuted, setActionExecuted] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const response = window.confirm('¿Esta seguro de eliminar?')
        if (response) {
            setIsLoading(true)
            const response = await routeServices.deleteRouteById(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    alert('Eliminado correctamente')
                    setActionExecuted(true)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        }
    }

    function handleClickEdit() {
        setDisabled(false)
    }

    async function handleSubmitToUpdate(e) {
        e.preventDefault()
        const route = new Route(
            id,
            e.target.name.value.trim(),
            e.target.addressStart.value.trim(),
            e.target.addressEnd.value.trim(),
            e.target.clientStart.value.trim(),
            e.target.clientEnd.value.trim(),
            e.target.observation.value.trim(),
            e.target.selectClient.value.trim(),
            e.target.value.value.trim()
        )
        if (route.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await routeServices.putRoute(route)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Actualizado correctamente')
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            }
        } else {
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            const response = await routeServices.getRouteById(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setRoute(response.body)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        }())
    }, [id])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/rutas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Ruta ${route ? '- ' + route.name : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <RouteSectionInputs
                            disabled={disabled}
                            values={route || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/rutas'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}