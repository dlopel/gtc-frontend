import SectionHeader from "./SectionHeader"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Output from '../models/Output'
import { v4 as uuid } from 'uuid'
import { postOutput } from '../services/output'
import OutputSectionInputs from "./OutputSectionInputs"
import './Section.css'

export default function OutputSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const output = new Output(
            uuid(),
            e.target.selectBank.value,
            e.target.freightId.value,
            e.target.selectOutputType.value,
            e.target.date.value,
            e.target.value.value,
            e.target.operation.value,
            e.target.observation.value
        )
        if (output.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postOutput(output)
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
        return (<Redirect push to='/egresos' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Egresos - Nuevo' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <OutputSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/egresos' />
                    </form>
                </div>
            </section>
        )
    }

}