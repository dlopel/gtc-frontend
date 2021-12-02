import SectionHeader from './SectionHeader'
import ExpenseSettlementSectionIndexSearchBar from './ExpenseSettlementSectionIndexSearchBar'
import ExpenseSettlementSectionIndexTable from './ExpenseSettlementSectionIndexTable'
import { getExpenseSettlementsByQuery } from '../services/expenseSettlement'
import { useState, useEffect, useRef } from 'react'
import { ExpenseSettlementsQueryBody } from '../models/ExpenseSettlement'
import './Section.css'

export default function ExpenseSettlementSectionIndex() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const [data, setData] = useState([])
    const isMounted = useRef(true)

    const handleSubmit = async (e) => {
        e.preventDefault()
        const query = new ExpenseSettlementsQueryBody(
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.liquidated.value
        )
        if (query.areQueryFieldsValid()) {
            if (query.isMaximumDateRangeOneYear()) {
                setIsLoading(true)
                const response = await getExpenseSettlementsByQuery(query)
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
            alert('Datos para consultar invalidos. Refresque la pagina y vuelva a intentarlo')
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
            <SectionHeader title='Liquidaciones de Gastos' isLoaderActive={isLoading} />
            <div className='section__content'>
                <ExpenseSettlementSectionIndexSearchBar onSubmit={handleSubmit} />
                <ExpenseSettlementSectionIndexTable
                    items={data} />
            </div>
        </section>
    )
}