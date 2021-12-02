import SctrSectionInputs from './SctrSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as sctrServices from '../services/sctr'
import Sctr from '../models/Sctr'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function SctrSectionMaintenance() {
    const { id } = useParams()
    const [sctr, setSctr] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await sctrServices.deleteSctrById(id)
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
        const observation = e.target.observation.value

        const areValid = Sctr.areObservationAndIdFieldValid(
            observation,
            id
        )
        if (areValid) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await sctrServices.putSctrById(
                    { observation }, id
                )

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
        setIsLoading(true)
        sctrServices.getSctrById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setSctr(response.body)
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
        return (<Redirect push to='/sctrs' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`SCTRS - ${sctr.pensionNumber}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form
                        className='section__form'
                        onSubmit={handleSubmitToUpdate}>
                        <SctrSectionInputs
                            operation='maitenance'
                            disabled={disabled}
                            values={sctr} />
                        <SectionCRUDButtons
                            redirectionPath='/sctrs'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}