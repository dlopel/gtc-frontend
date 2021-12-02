import React, { useEffect, useState, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { getCompressedUnitsByQuery } from '../services/unit'
import UnitSectionIndexSearchBar from './UnitSectionIndexSearchBar'
import { UnitQueryBody } from '../models/Unit'
import UnitSectionIndexTable from './UnitSectionIndexTable'
import './Section.css'

export default function UnitSectionIndex() {

    const [units, setUnits] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const queryBody = new UnitQueryBody(
            e.target.licensePlate.value.trim(),
            e.target.brand.value.trim(),
            e.target.bodyType.value.trim(),
            e.target.transportIdSelect.value
        )

        if (queryBody.isValid()) {
            setIsLoading(true)
            const response = await getCompressedUnitsByQuery(queryBody)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setUnits(response.body)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        } else {
            alert(`Al menos un campo, con 3 caracteres como minimo para buscar:
                   Placa: Numeros, letras y guión(-)
                   Marca: Solo letras
                   Carroceria: Solo letras`)
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
            <SectionHeader title='Unidades' isLoaderActive={isLoading} />
            <div className='section__content'>
                <UnitSectionIndexSearchBar onSubmit={handleSubmit} />
                <UnitSectionIndexTable items={units} />
            </div>
        </section>
    )
}