import SectionCRUDButtons from './SectionCRUDButtons'
import SectionHeader from './SectionHeader'
import { useRef, useState, useEffect } from 'react'
import SaleSettlementSectionInputs from './SaleSettlementSectionInputs'
import SaleSettlementSectionFreightsTable from './SaleSettlementSectionFreightsTable'
import * as saleSettlementServices from '../services/saleSettlement'
import SaleSettlement from '../models/SaleSettlement'
import { Redirect, useParams } from 'react-router-dom'
import isIdValid from '../libs/isIdValid'
import './Section.css'

export default function SaleSettlementSectionMaintenance() {
    const { id } = useParams()
    const [saleSettlement, setSaleSettlement] = useState({})
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

        const saleSettlement = new SaleSettlement(
            id,
            e.target.date.value,
            '',
            '',
            '',
            '',
            e.target.invoiceNumber.value,
            e.target.invoiceDate.value,
            e.target.observation.value
        )

        const isIDOk = isIdValid(saleSettlement.id)
        const isDateValid = saleSettlement.isDateValid()
        const isInvoiceDateValid = saleSettlement.isInvoiceDateValid()
        const isInvoiceNumberValid = saleSettlement.isInvoiceNumberValid()
        const isObservationValid = saleSettlement.isObservationValid()

        if (!isIDOk || !isDateValid || !isInvoiceDateValid || !isInvoiceNumberValid || !isObservationValid)
            return alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')

        setIsLoading(true)
        const putResponse = await saleSettlementServices.putSaleSettlementById(saleSettlement)
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
    }

    const handleDelete = async () => {
        const isOk = window.confirm('¿Esta seguro de eliminar la liquidacion del cliente?')
        if (!isOk) return

        setIsLoading(true)
        const delDetailtBatchResponse = await saleSettlementServices.deleteDetailBatchBySaleSettlementId(id)
        if (isMounted.current) {
            if (!delDetailtBatchResponse.ok) {
                setIsLoading(false)
                return setError(delDetailtBatchResponse.message)
            }
        }

        const delSaleSettlementResponse = await saleSettlementServices.deleteSaleSettlement(id)
        if (isMounted.current) {
            if (!delSaleSettlementResponse.ok) {
                setIsLoading(false)
                return setError(delSaleSettlementResponse.message)
            }

            alert('Eliminado correctamente')
            setIsLoading(false)
            setActionExecuted(true)
        }
    }

    const handleAddFreights = (freights) => {
        setFreights(freights)
    }

    const handleSetCalculatedValues = () => { }

    const handleDeleteFreight = () => { }

    const handleClickEdit = () => {
        setDisabled(false)
    }

    useEffect(() => {
        const get = async () => {
            setIsLoading(true)
            const saleSettlementResponse = await saleSettlementServices.getSaleSettlementById(id)
            if (isMounted.current)
                if (saleSettlementResponse.ok) {
                    setSaleSettlement(saleSettlementResponse.body)
                } else {
                    return setError(saleSettlementResponse.message)
                }

            const getDetailBatchResponse = await saleSettlementServices.getDetailBatchBySaleSettlementId(id)
            if (isMounted.current)
                if (getDetailBatchResponse.ok) {
                    setIsLoading(false)
                    setFreights(getDetailBatchResponse.body)
                } else {
                    setIsLoading(false)
                    return setError(getDetailBatchResponse.message)
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
        return <Redirect push to='/liquidaciones-de-clientes' />
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Liquidaciones de Cliente - ${saleSettlement.formattedId}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <SaleSettlementSectionFreightsTable
                        calculatedValues={{
                            subtotal: saleSettlement.valueWithoutIgv,
                            igv: saleSettlement.valueIgv,
                            total: saleSettlement.valueWithIgv
                        }}
                        setCalculatedValues={handleSetCalculatedValues}
                        buttonAddActive={false}
                        AddFreights={handleAddFreights}
                        deleteFreight={handleDeleteFreight}
                        freights={freights} />
                    <form className='section__form' onSubmit={handleSubmit}>
                        <SaleSettlementSectionInputs
                            values={saleSettlement}
                            disabled={disabled} />
                        <SectionCRUDButtons
                            operation='update-delete'
                            onEdit={handleClickEdit}
                            onDelete={handleDelete}
                            redirectionPath='/liquidaciones-de-clientes' />
                    </form>
                </div>
            </section>
        )
    }
}