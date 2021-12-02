import SectionHeader from './SectionHeader'
import OutputSectionIndexSearchBar from './OutputSectionIndexSearchBar'
import OutputSectionIndexTable from './OutputSectionIndexTable'
import { OutputsQueryBody } from '../models/Output'
import { getOutputsByQuery } from '../services/output'
import { useState, useEffect, useRef } from 'react'
import './Section.css'

export default function FreightSectionIndex() {
    const [outputs, setOutputs] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()

        const query = new OutputsQueryBody(
            e.target.selectBank.value,
            e.target.dateFrom.value,
            e.target.dateTo.value
        )

        if (!query.isValid())
            return alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')

        if (!query.isMaximumDateRangeOneYear())
            return alert('El intervalo de fechas maximo es de 1 año, vualva a escoger las fechas')

        const response = await getOutputsByQuery(query)
        setIsLoading(true)
        if (isMounted.current) {
            if (response.ok) {
                setIsLoading(false)
                setOutputs(response.body)
            } else {
                setIsLoading(false)
                setError(response.message)
            }
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className='section'>
            <SectionHeader
                title='Egresos'
                isLoaderActive={isLoading} />
            <div className='section__content'>
                <OutputSectionIndexSearchBar
                    onSubmit={handleSubmit} />
                <OutputSectionIndexTable
                    items={outputs} />
            </div>
        </section>
    )
}