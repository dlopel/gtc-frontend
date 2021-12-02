import SectionHeader from "./SectionHeader"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Sctr from '../models/Sctr'
import { v4 as uuid } from 'uuid'
import { postSctr } from '../services/sctr'
import SctrSectionInputs from "./SctrSectionInputs"
import './Section.css'

export default function SctrSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const sctr = new Sctr(
            uuid(),
            e.target.pensionNumber.value.trim(),
            e.target.healthNumber.value.trim(),
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.insuranceCompany.value.trim(),
            e.target.observation.value.trim(),
            e.target.image.files[0]
        )
        
        if (sctr.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postSctr(sctr.getFormData())
                if (isMounted.current)
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Guardado correctamente')
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
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
        return (<Redirect push to='/sctrs' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='SCTR - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <SctrSectionInputs
                            operation='create'
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/sctrs' />
                    </form>
                </div>
            </section>
        )
    }
}