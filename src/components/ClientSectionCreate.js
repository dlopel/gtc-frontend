import SectionHeader from "./SectionHeader"
import ClientSectionInputs from './ClientSectionInputs'
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useEffect, useState, useRef } from "react"
import Client from "../models/Client"
import { v4 as uuid } from "uuid"
import { postClient } from '../services/client'
import { Redirect } from "react-router-dom"
import './Section.css'

export default function TransportSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const client = new Client(
            uuid(),
            e.target.ruc.value.trim(),
            e.target.name.value.trim(),
            e.target.address.value.trim(),
            e.target.observation.value.trim()
        )
        if (client.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postClient(client)
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
            alert(`Datos Invalidos para crear Cliente. Refresque la pagina y vuelva a ingresar los datos correctamente.`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    if (actionExecuted) {
        return (<Redirect push to='/clientes' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Clientes - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <ClientSectionInputs
                            values={{}}
                            disabled={false} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/clientes' />
                    </form>
                </div>
            </section>
        )
    }
}