import SectionHeader from './SectionHeader'
import BankSectionInputs from './BankSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Bank from '../models/Bank'
import * as bankServices from '../services/bank'
import './Section.css'

export default function BankSectionMaintenance() {
    const { id } = useParams()
    const [bank, setBank] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actionExecuted, setActionExecuted] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const response = window.confirm('¿Esta seguro de eliminar?')
        if (response) {
            setIsLoading(true)
            const response = await bankServices.deleteBankById(id)
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
        const bank = new Bank(
            id,
            e.target.name.value.trim(),
            e.target.observation.value.trim()
        )
        if (bank.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await bankServices.putBank(bank)
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
            const response = await bankServices.getBankById(id)
            
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setBank(response.body)
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
        return (<Redirect push to='/bancos' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Bancos ${bank ? '- ' + bank.name : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <BankSectionInputs
                            disabled={disabled}
                            values={bank || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/bancos'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}