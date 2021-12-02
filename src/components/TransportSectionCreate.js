import SectionHeader from "./SectionHeader"
import TransportSectionInputs from './TransportSectionInputs'
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useEffect, useState, useRef } from "react"
import Transport from "../models/Transport"
import { v4 as uuid } from "uuid"
import { postTransport } from '../services/transport'
import { Redirect } from "react-router-dom"
import './Section.css'

export default function TransportSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const transport = new Transport(
            uuid(),
            e.target.ruc.value.trim(),
            e.target.name.value.trim(),
            e.target.address.value.trim(),
            e.target.telephone.value.trim(),
            e.target.observation.value.trim()
        )
        if (transport.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postTransport(transport)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Registrado correctamente')
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        alert(response.message)
                    }
                }
            }
        } else {
            alert(`Datos Invalidos para Crear Transportista. Refresque la pagina y vuelva a ingresar los datos correctamente.`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    if (actionExecuted) {
        return (<Redirect push to='/transportistas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Transportista - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <TransportSectionInputs values={{}} disabled={false} />
                        <SectionCRUDButtons operation='create' redirectionPath='/transportistas' />
                    </form>
                </div>
            </section>
        )
    }
}