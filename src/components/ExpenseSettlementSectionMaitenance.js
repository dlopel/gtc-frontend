import SectionCRUDButtons from './SectionCRUDButtons'
import SectionHeader from './SectionHeader'
import { useRef, useState, useEffect } from 'react'
import ExpenseSettlementSectionInputs from './ExpenseSettlementSectionInputs'
import ExpenseSettlementSectionFreightsTable from './ExpenseSettlementSectionFreightsTable'
import * as expenseSettlementServices from '../services/expenseSettlement'
import { getFreightsByExpenseSettlement, patchFreightsExpenseSettlement } from '../services/freight'
import ExpenseSettlement from '../models/ExpenseSettlement'
import { Redirect, useParams } from 'react-router-dom'
import './Section.css'

export default function ExpenseSettlementSectionMaintenance() {
    const { id } = useParams()
    const [expenseSettlement, setExpenseSettlement] = useState({})
    const [disabled, setDisabled] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const [freights, setFreights] = useState([])
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const isOk = window.confirm('¿Esta seguro de actualizar la liquidacion de gastos?')
        if (!isOk) return

        const expenseSettlement = new ExpenseSettlement(
            id,
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

            const putResponse = await expenseSettlementServices.putExpenseSettlement(expenseSettlement)
            if (isMounted.current) {
                if (putResponse.ok) {
                    alert('Actualizado correctamente')
                    setIsLoading(false)
                    setActionExecuted(true)
                } else {
                    setIsLoading(false)
                    setError(putResponse.message)
                }
            }

            // if it update freights expense settlement
            //
            // const patchResponse = await patchFreightsExpenseSettlement(
            //     expenseSettlement.id,
            //     freights.map(freight => freight.id)
            // )
            // if (isMounted.current) {
            //     if (!patchResponse.ok)
            //         return setError(patchResponse.message)
            // }
        } else {
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    const handleDelete = async () => {
        const isOk = window.confirm('¿Esta seguro de eliminar la liquidacion de gastos?')
        if (!isOk) return

        setIsLoading(true)
        const patchResponse = await patchFreightsExpenseSettlement(
            null,
            freights.map(freight => freight.id)
        )
        if (isMounted.current)
            if (!patchResponse.ok) {
                setIsLoading(false)
                return setError(patchResponse.message)
            }

        const deleteResponse = await expenseSettlementServices.deleteExpenseSettlement(id)
        if (isMounted.current) {
            if (!deleteResponse.ok) {
                setIsLoading(false)
                return setError(deleteResponse.message)
            }

            alert('Eliminado correctamente')
            setIsLoading(false)
            setActionExecuted(true)
        }

    }

    const handleAddFreights = (freights) => {
        setFreights(freights)
    }

    const handleDeleteFreight = () => { }

    const handleClickEdit = () => {
        setDisabled(false)
    }

    useEffect(() => {
        const get = async () => {
            setIsLoading(true)
            const expenseSettlementResponse = await expenseSettlementServices.getExpenseSettlementById(id)
            if (isMounted.current)
                if (expenseSettlementResponse.ok) {
                    setExpenseSettlement(expenseSettlementResponse.body)
                } else {
                    return setError(expenseSettlementResponse.message)
                }

            const freightResponse = await getFreightsByExpenseSettlement(id)
            if (isMounted.current)
                if (freightResponse.ok) {
                    setIsLoading(false)
                    setFreights(freightResponse.body)
                } else {
                    setIsLoading(false)
                    return setError(freightResponse.message)
                }
        }
        get()
    }, [id])

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
                    title={`Liquidaciones de Gastos - ${expenseSettlement.formattedId}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <ExpenseSettlementSectionFreightsTable
                        buttonAddActive={false}
                        AddFreights={handleAddFreights}
                        deleteFreight={handleDeleteFreight}
                        freights={freights} />
                    <form className='section__form' onSubmit={handleSubmit}>
                        <ExpenseSettlementSectionInputs
                            freightIdList={freights.map(freight => freight.id)}
                            values={expenseSettlement}
                            disabled={disabled} />
                        <SectionCRUDButtons
                            operation='update-delete'
                            onEdit={handleClickEdit}
                            onDelete={handleDelete}
                            redirectionPath='/liquidaciones-de-gastos' />
                    </form>
                </div>
            </section>
        )
    }
}