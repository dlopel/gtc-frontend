import UnitSectionInputs from './UnitSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Unit from '../models/Unit'
import * as unitServices from '../services/unit'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function UnitSectionMaintenance() {
    const { id } = useParams()
    const [unit, setUnit] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await unitServices.deleteUnitById(id)
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
        const newUnit = new Unit(
            id,
            e.target.licensePlate.value.trim(),
            e.target.brand.value.trim(),
            e.target.model.value.trim(),
            e.target.engineNumber.value.trim(),
            e.target.chassisNumber.value.trim(),
            e.target.color.value.trim(),
            e.target.numberCylinders.value.trim(),
            e.target.numberAxles.value.trim(),
            e.target.numberTires.value.trim(),
            e.target.dryWeight.value.trim(),
            e.target.grossWeight.value.trim(),
            e.target.length.value.trim(),
            e.target.height.value.trim(),
            e.target.width.value.trim(),
            e.target.usefulLoad.value.trim(),
            e.target.numberTires.value.trim(),
            e.target.bodyType.value.trim(),
            e.target.selectPolicy.value,
            e.target.technicalReviewImage.files[0],
            e.target.technicalReviewDateStart.value,
            e.target.technicalReviewDateEnd.value.trim(),
            e.target.mtcImage.files[0],
            e.target.mtcDateStart.value.trim(),
            e.target.mtcDateEnd.value.trim(),
            e.target.propertyCardImage.files[0],
            e.target.propertyCardDateStart.value.trim(),
            e.target.propertyCardDateEnd.value.trim(),
            e.target.soatImage.files[0],
            e.target.soatDateStart.value.trim(),
            e.target.soatDateEnd.value.trim(),
            e.target.observation.value.trim(),
            e.target.selectTransport.value,
            e.target.year.value.trim()
        )
        if (newUnit.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await unitServices.putUnit(newUnit.getFormData())
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
        (async function () {
            setIsLoading(true)
            const response = await unitServices.getUnitById(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setUnit(response.body)
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
        return (<Redirect push to='/unidades' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Unidades ${unit ? '- ' + unit.licensePlate : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <UnitSectionInputs
                            disabled={disabled}
                            values={unit || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/unidades'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}