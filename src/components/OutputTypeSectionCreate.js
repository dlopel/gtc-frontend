import SectionHeader from "./SectionHeader"
import OutputTypeSectionInputs from "./OutputTypeSectionInputs"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import OutputType from '../models/OutputType'
import { v4 as uuid } from 'uuid'
import { postOutputType } from '../services/outputType'
import './Section.css'

export default function OutputTypeSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const outputType = new OutputType(
            uuid(),
            e.target.name.value.trim()
        )
        if (outputType.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postOutputType(outputType)
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
        return <Redirect push to='/tipos-de-egreso' />
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Tipos de Egreso - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <OutputTypeSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/tipos-de-egreso' />
                    </form>
                </div>
            </section>
        )
    }
}