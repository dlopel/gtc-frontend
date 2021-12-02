import SectionHeader from "./SectionHeader"
import RouteSectionInputs from "./RouteSectionInputs"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router"
import Route from '../models/Route'
import { v4 as uuid } from 'uuid'
import { postRoute } from '../services/route'
import './Section.css'

export default function RouteSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const route = new Route(
            uuid(),
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
                const response = await postRoute(route)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Guardado correctamente')
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            }
        } else {
            alert(`Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/rutas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Rutas - Nueva' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <RouteSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/rutas' />
                    </form>
                </div>
            </section>
        )
    }
}