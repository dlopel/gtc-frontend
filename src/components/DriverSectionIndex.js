import React, { useEffect, useRef, useState } from 'react'
import SectionHeader from './SectionHeader'
import { getCompressedDriversByQuery } from '../services/driver'
import { DriverQueryBody } from '../models/Driver'
import DriverSectionIndexTable from './DriverSectionIndexTable'
import DriverSectionIndexSearchBar from './DriverSectionIndexSearchBar'
import './Section.css'

export default function DriverSectionIndex() {

    const [drivers, setDrivers] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const queryBody = new DriverQueryBody(
            e.target.name.value.trim(),
            e.target.lastname.value.trim(),
            e.target.selectTransport.value
        )

        if (queryBody.isValid()) {
           setIsLoading(true)

            const response = await getCompressedDriversByQuery(queryBody)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setDrivers(response.body)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        } else {
            alert(`Al menos un campo con 3 caracteres como minimo para buscar:
                   Nombres: Solo letras y espacios,
                   Apellidos: Solo letras y espacios,
                   O seleccione un transportista`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className="section">
            <SectionHeader title='Conductores' isLoaderActive={isLoading} />
            <div className='section__content'>
                <DriverSectionIndexSearchBar onSubmit={handleSubmit} />
                <DriverSectionIndexTable items={drivers} />
            </div>
        </section>
    )
}