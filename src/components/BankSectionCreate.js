import SectionHeader from "./SectionHeader"
import BankSectionInputs from "./BankSectionInputs"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Bank from '../models/Bank'
import { v4 as uuid } from 'uuid'
import { postBank } from '../services/bank'
import './Section.css'

export default function BankSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const bank = new Bank(
            uuid(),
            e.target.name.value.trim(),
            e.target.observation.value.trim()
        )
        if (bank.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postBank(bank)
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
        return <Redirect push to='/bancos' />
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Bancos - Nuevo' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <BankSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/bancos' />
                    </form>
                </div>
            </section>
        )
    }
}