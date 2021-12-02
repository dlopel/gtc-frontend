import SectionCRUDButtons from './SectionCRUDButtons'
import SectionHeader from './SectionHeader'
import { useRef, useState, useEffect } from 'react'
import SaleSettlementSectionInputs from './SaleSettlementSectionInputs'
import SaleSettlementSectionFreightsTable from './SaleSettlementSectionFreightsTable'
import * as saleSettlementServices from '../services/saleSettlement'
import SaleSettlement from '../models/SaleSettlement'
import SaleSettlementDetail, { SaleSettlementDetailList } from '../models/SaleSettlementDetail'
import { v4 as uuid } from 'uuid'
import { Redirect } from 'react-router'
import './Section.css'

export default function SaleSettlementSectionCreate() {
    const [isLoading, setIsLoading] = useState(false)
    const [freights, setFreights] = useState([])
    const [actionExecuted, setActionExecuted] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const [calculatedValues, setCalculatedValues] = useState({})

    const handleSetCalculatedValues = (obj) => {
        setCalculatedValues(obj)
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
//validar antes de enviar, que haya viajes seleccionados, y que haya valores calculados
        if (freights.length < 1)
            return alert('Primero seleccione los viajes a liquidar')

        if (Object.entries(calculatedValues).length < 1)
            return alert('Primero haga clic en Calcular, para calcular los subtotales')

        const saleSettlement = new SaleSettlement(
            uuid(),
            e.target.date.value,
            freights[0].clientId,
            calculatedValues.subtotal,
            calculatedValues.igv,
            calculatedValues.total,
            e.target.invoiceNumber.value,
            e.target.invoiceDate.value,
            e.target.observation.value
        )

        if (saleSettlement.isValid()) {

            const detailList = new SaleSettlementDetailList(freights.map(freight => {
                return new SaleSettlementDetail(
                    uuid(),
                    freight.id,
                    freight.valueWithoutIgv,
                    freight.valueAdditionalWithoutIgv,
                    freight.valueAdditionalDetail || '',
                    freight.observation || ''
                )
            }))
            if (!detailList.isValid())
                return alert('Los datos de los viajes a liquidar son invalidos, refresque la pagina y vuelva a intentarlo')

            setIsLoading(true)
            const postResponse = await saleSettlementServices.postSaleSettlement(saleSettlement)
            if (isMounted.current) {
                if (!postResponse.ok)
                    return setError(postResponse.message)
            }

            const postListResponse = await saleSettlementServices.postSaleSettlementDetailBatch(
                saleSettlement.id,
                detailList.SaleSettlementDetailList
            )
            if (isMounted.current) {
                if (!postListResponse.ok)
                    return setError(postListResponse.message)

                alert('Apunta el CODIGO de LIQUIDACION DEL CLIENTE: ' + postResponse.body.formattedId)
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
        return <Redirect push to='/liquidaciones-de-clientes' />
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title='Liquidaciones de Clientes - Nuevo'
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <SaleSettlementSectionFreightsTable
                        setCalculatedValues={handleSetCalculatedValues}
                        calculatedValues={calculatedValues}
                        buttonAddActive={true}
                        AddFreights={handleAddFreights}
                        deleteFreight={handleDeleteFreight}
                        freights={freights} />
                    <form className='section__form' onSubmit={handleSubmit}>
                        <SaleSettlementSectionInputs
                            values={{}}
                            disabled={false} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/liquidaciones-de-clientes' />
                    </form>
                </div>
            </section>
        )
    }
}