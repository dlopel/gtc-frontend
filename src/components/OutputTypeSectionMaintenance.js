import SectionHeader from './SectionHeader'
import OutputTypeSectionInputs from './OutputTypeSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import OutputType from '../models/OutputType'
import * as outputTypeServices from '../services/outputType'
import './Section.css'

export default function OutputTypeSectionMaintenance() {
    const { id } = useParams()
    const [outputType, setOutputType] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actionExecuted, setActionExecuted] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const response = window.confirm('¿Esta seguro de eliminar?')
        if (response) {
            setIsLoading(true)
            const response = await outputTypeServices.deleteOutputTypeById(id)
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
        const outputType = new OutputType(
            id,
            e.target.name.value.trim()
        )
        if (outputType.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await outputTypeServices.putOutputType(outputType)
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
            const response = await outputTypeServices.getOutputTypeById(id)
            
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setOutputType(response.body)
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
        return (<Redirect push to='/tipos-de-egreso' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Tipos de Egreso ${outputType ? '- ' + outputType.name : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <OutputTypeSectionInputs
                            disabled={disabled}
                            values={outputType || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/tipos-de-egreso'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}