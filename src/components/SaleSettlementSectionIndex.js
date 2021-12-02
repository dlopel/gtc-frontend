import SectionHeader from './SectionHeader'
import SaleSettlementSectionIndexSearchBar from './SaleSettlementSectionIndexSearchBar'
import SaleSettlementSectionIndexTable from './SaleSettlementSectionIndexTable'
import { getSaleSettlementsByQuery } from '../services/saleSettlement'
import { useState, useEffect, useRef } from 'react'
import { SaleSettlementsQueryBody } from '../models/SaleSettlement'
import './Section.css'

export default function SaleSettlementSectionIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const isMounted = useRef(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = new SaleSettlementsQueryBody(
            e.target.dateStart.value,
            e.target.dateEnd.value
        )
        if (query.isValid()) {
            if (query.isMaximumDateRangeOneYear()) {
                setIsLoading(true)
                const response = await getSaleSettlementsByQuery(query)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setData(response.body)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            } else {
                alert('El intervalo entre fechas es maximo de 1 año. Cambie las fechas y vuelta a intentarlo')
            }
        } else {
            alert('Datos de consulta invalidos. Refresque la pagina y vuelva a intentarlo')
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
                title='Liquidaciones de Clientes'
                isLoaderActive={isLoading} />
            <div className='section__content'>
                <SaleSettlementSectionIndexSearchBar
                    onSubmit={handleSubmit} />
                <SaleSettlementSectionIndexTable
                    items={data} />
            </div>
        </section>
    )
}