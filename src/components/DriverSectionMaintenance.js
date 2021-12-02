import DriverSectionInputs from './DriverSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import * as driverServices from '../services/driver'
import Driver from '../models/Driver'
import SectionHeader from './SectionHeader'
import './Section.css'

export default function DriverSectionMaintenance() {
    const { id } = useParams()
    const [driver, setDriver] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isOk = window.confirm('¿Esta seguro de eliminar?')
        if (isOk) {
            setIsLoading(true)
            const response = await driverServices.deleteDriverById(id)
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
        const newDriver = new Driver(
            id,
            e.target.dni.value.trim(),
            e.target.dniImage.files[0],
            e.target.dniDateStart.value,
            e.target.dniDateEnd.value,
            e.target.license.value.trim(),
            e.target.licenseImage.files[0],
            e.target.licenseDateStart.value,
            e.target.licenseDateEnd.value,
            e.target.name.value.trim(),
            e.target.lastname.value.trim(),
            e.target.cellphoneOne.value.trim(),
            e.target.cellphoneTwo.value.trim(),
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.contractImage.files[0],
            e.target.observation.value.trim(),
            e.target.selectTransport.value
        )
        if (newDriver.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await driverServices.putDriver(newDriver.getFormData())
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
            const response = await driverServices.getDriverById(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setDriver(response.body)
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
        return (<Redirect push to='/conductores' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Conductor ${driver ? '- ' + driver.name + ' ' + driver.lastname : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <DriverSectionInputs
                            disabled={disabled}
                            values={driver || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/conductores'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}