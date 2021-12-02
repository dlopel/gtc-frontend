import PolicySectionInputs from './PolicySectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as policyServices from '../services/policy'
import Policy from '../models/Policy'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function PolicySectionMaintenance() {
    const { id } = useParams()
    const [policy, setPolicy] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await policyServices.deletePolicyById(id)
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
  
        const areValid = Policy.areIdAndObservationValid(
            id,
            observation
        )
        if (areValid) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await policyServices.putPolicyById(
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
        policyServices.getPolicyById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setPolicy(response.body)
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
        return (<Redirect push to='/polizas' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Polizas - ${policy.endorsement}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form
                        className='section__form'
                        onSubmit={handleSubmitToUpdate}>
                        <PolicySectionInputs
                            operation='maitenance'
                            disabled={disabled}
                            values={policy} />
                        <SectionCRUDButtons
                            redirectionPath='/polizas'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}