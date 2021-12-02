import SectionHeader from "./SectionHeader"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Driver from '../models/Driver'
import { v4 as uuid } from 'uuid'
import { postDriver } from '../services/driver'
import DriverSectionInputs from "./DriverSectionInputs"
import './Section.css'

export default function DriverSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const newDriver = new Driver(
            uuid(),
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
                const response = await postDriver(newDriver.getFormData())
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
        return (<Redirect push to='/conductores' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Conductores - Nuevo' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <DriverSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/conductores' />
                    </form>
                </div>
            </section>
        )
    }
}