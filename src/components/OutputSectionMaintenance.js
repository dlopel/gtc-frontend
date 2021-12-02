import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Output from '../models/Output'
import * as outputServices from '../services/output'
import SectionHeader from './SectionHeader'
import OutputSectionInputs from './OutputSectionInputs'
import './Section.css'

export default function OutputSectionMaintenance() {
    const { id } = useParams()
    const [output, setOutput] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await outputServices.deleteOutput(id)
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

        const output = new Output(
            id,
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
                const response = await outputServices.putOutput(output)
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
            alert(`Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        setIsLoading(true)
        outputServices.getOutputById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setOutput(response.body)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            })
    }, [id])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/egresos' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Egresos ${output ? '- ' + output.bankName + ' | ' + (output.operation || 'S/N') : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <OutputSectionInputs
                            disabled={disabled}
                            values={output || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/egresos'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}