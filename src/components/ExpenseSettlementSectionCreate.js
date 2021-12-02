import SectionCRUDButtons from './SectionCRUDButtons'
import SectionHeader from './SectionHeader'
import { useRef, useState, useEffect } from 'react'
import ExpenseSettlementSectionInputs from './ExpenseSettlementSectionInputs'
import ExpenseSettlementSectionFreightsTable from './ExpenseSettlementSectionFreightsTable'
import { postExpenseSettlement } from '../services/expenseSettlement'
import { patchFreightsExpenseSettlement } from '../services/freight'
import ExpenseSettlement from '../models/ExpenseSettlement'
import { v4 as uuid } from 'uuid'
import { Redirect } from 'react-router'
import './Section.css'

export default function ExpenseSettlementSectionCreate() {
    const [isLoading, setIsLoading] = useState(false)
    const [freights, setFreights] = useState([])
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const expenseSettlement = new ExpenseSettlement(
            uuid(),
            e.target.datePresentation.value,
            e.target.toll.value,
            e.target.viatic.value,
            e.target.load.value,
            e.target.unload.value,
            e.target.garage.value,
            e.target.washed.value,
            e.target.tire.value,
            e.target.mobility.value,
            e.target.other.value,
            e.target.otherDetail.value,
            e.target.total.value,
            e.target.deposits.value,
            e.target.favorsTheCompany.checked.toString(),
            e.target.residue.value,
            e.target.cancelled.checked.toString(),
            e.target.observation.value
        )

        if (expenseSettlement.isValid()) {
            setIsLoading(true)

            const postResponse = await postExpenseSettlement(expenseSettlement)
            if (isMounted.current) {
                if (!postResponse.ok)
                    return setError(postResponse.message)
            }

            const patchResponse = await patchFreightsExpenseSettlement(
                expenseSettlement.id,
                freights.map(freight => freight.id)
            )
            if (isMounted.current) {
                if (!patchResponse.ok)
                    return setError(patchResponse.message)

                alert('Apunta el CODIGO de LIQUIDACION: ' + postResponse.body.formattedId)
                setIsLoading(false)
                setActionExecuted(true)
            }
        } else {
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    const handleAddFreights = (freights) => {
        setFreights(freights)
    }

    const handleDeleteFreight = () => { }

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    if (actionExecuted) {
        return <Redirect push to='/liquidaciones-de-gastos' />
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Liquidaciones de Gastos - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <ExpenseSettlementSectionFreightsTable
                        buttonAddActive={true}
                        AddFreights={handleAddFreights}
                        deleteFreight={handleDeleteFreight}
                        freights={freights} />
                    <form className='section__form' onSubmit={handleSubmit}>
                        <ExpenseSettlementSectionInputs
                            freightIdList={freights.map(freight => freight.id)}
                            values={{}}
                            disabled={false} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/liquidaciones-de-gastos' />
                    </form>
                </div>
            </section>
        )
    }
}