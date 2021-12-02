import SectionHeader from "./SectionHeader"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Policy from '../models/Policy'
import { v4 as uuid } from 'uuid'
import { postPolicy } from '../services/policy'
import PolicySectionInputs from "./PolicySectionInputs"
import './Section.css'

export default function DriverSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const policy = new Policy(
            uuid(),
            e.target.endorsement.value.trim(),
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.insuranceCarrier.value.trim(),
            e.target.insuranceCompany.value.trim(),
            e.target.netPremium.value,
            e.target.telephone.value,
            e.target.image.files[0],
            e.target.observation.value.trim()
        )
        if (policy.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postPolicy(policy.getFormData())
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
        return (<Redirect push to='/polizas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Polizas - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <PolicySectionInputs
                            operation='create'
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/polizas' />
                    </form>
                </div>
            </section>
        )
    }
}