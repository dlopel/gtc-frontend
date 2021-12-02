import SectionHeader from "./SectionHeader"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router-dom"
import Freight from '../models/Freight'
import { v4 as uuid } from 'uuid'
import { postFreight } from '../services/freight'
import FreightSectionInputs from "./FreightSectionInputs"
import './Section.css'

export default function FreightSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const newFreight = new Freight(
            uuid(),
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.grt.value,
            e.target.grr.value,
            e.target.ton.value,
            e.target.pallet.value,
            e.target.selectRoute.value,
            e.target.selectTruckTractor.value,
            e.target.selectSemiTrailer.value,
            e.target.selectDriver.value,
            e.target.selectTransport.value,
            e.target.selectClient.value,
            e.target.selectService.value,
            e.target.observation.value)
        if (newFreight.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postFreight(newFreight)
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
        return (<Redirect push to='/fletes' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Viajes - Nuevo' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <FreightSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/fletes' />
                    </form>
                </div>
            </section>
        )
    }

}