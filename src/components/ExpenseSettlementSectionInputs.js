import React, { useEffect, useRef, useState } from 'react'
import { roundToOneDecimal } from '../libs/helperFunctions'
import CheckBoxInput from './CheckBoxInput'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { getDepositsByFreights } from '../services/output'

export default function ExpenseSettlementSectionInputs(
    { values, disabled, freightIdList }
) {

    const [calcValues, setCalcValues] = useState({
        total: values.total || '',
        deposits: values.deposits || '',
        residue: values.residue || '',
        favorsTheCompany: values.favorsTheCompany || false
    })
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const datePresentationRef = useRef(null)
    const tollRef = useRef(null)
    const viaticRef = useRef(null)
    const garageRef = useRef(null)
    const washedRef = useRef(null)
    const tireRef = useRef(null)
    const mobilityRef = useRef(null)
    const loadRef = useRef(null)
    const unloadRef = useRef(null)
    const otherRef = useRef(null)

    const getDeposits = async () => {
        let deposits = 0
        if (freightIdList.length > 0) {
            const response = await getDepositsByFreights(freightIdList)
            if (isMounted.current) {
                if (response.ok) {
                    deposits = parseFloat(response.body || 0)
                } else {
                    setError(response.message)
                }
            }
        }
        return deposits
    }

    const handleClickCalc = async () => {
        const toll = parseFloat(tollRef.current.value || '0')
        const viatic = parseFloat(viaticRef.current.value || '0')
        const garage = parseFloat(garageRef.current.value || '0')
        const washed = parseFloat(washedRef.current.value || '0')
        const tire = parseFloat(tireRef.current.value || '0')
        const mobility = parseFloat(mobilityRef.current.value || '0')
        const load = parseFloat(loadRef.current.value || '0')
        const unload = parseFloat(unloadRef.current.value || '0')
        const other = parseFloat(otherRef.current.value || '0')

        const total = roundToOneDecimal(toll + viatic + garage + washed + tire + mobility + load + unload + other)
        if (total <= 0) {
            alert('Para calcular, solo valores mayor o igual a cero.')
        } else {
            const deposits = roundToOneDecimal(await getDeposits()).toString()
            const residue = roundToOneDecimal(deposits - total).toString()
            const favorsTheCompany = residue < 0 ? false : true
            setCalcValues({ total: total.toString(), deposits, residue, favorsTheCompany })
        }
    }

    useEffect(() => {
        setCalcValues({
            total: values.total || '',
            deposits: values.deposits || '',
            residue: values.residue || '',
            favorsTheCompany: values.favorsTheCompany || false
        })
    }, [values.total, values.deposits, values.residue, values.favorsTheCompany])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <React.Fragment>
            <DataInput
                ref={datePresentationRef}
                type='date'
                title='Fecha de presentacion de la liquidacion'
                label='Fecha de liquidacion'
                name='datePresentation'
                required='required'
                disabled={disabled}
                value={values.datePresentation} />
            <DataInput
                ref={tollRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de peajes'
                label='Peajes'
                placeholder='86.52'
                name='toll'
                required='required'
                value={values.toll}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={viaticRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de viaticos'
                label='Viaticos'
                placeholder='20.00'
                name='viatic'
                required='required'
                value={values.viatic}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={garageRef}
                type='text'
                pattern='^[0-9]{1,3}(\.[0-9]{1,2})?$'
                title='Monto de cochera'
                label='Cochera'
                placeholder='20.00'
                name='garage'
                required='required'
                value={values.garage}
                disabled={disabled}
                regExp={/^\d{1,3}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={washedRef}
                type='text'
                pattern='^[0-9]{1,3}(\.[0-9]{1,2})?$'
                title='Monto de lavado'
                label='Lavado'
                placeholder='10.00'
                name='washed'
                required='required'
                value={values.washed}
                disabled={disabled}
                regExp={/^\d{1,3}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={tireRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de reparacion de llantas'
                label='LLantas'
                placeholder='30.00'
                name='tire'
                required='required'
                value={values.tire}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={mobilityRef}
                type='text'
                pattern='^[0-9]{1,3}(\.[0-9]{1,2})?$'
                title='Monto de movilidad'
                label='Movilidad'
                placeholder='0.00'
                name='mobility'
                required='required'
                value={values.mobility}
                disabled={disabled}
                regExp={/^\d{1,3}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={loadRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de carga'
                label='Carga'
                placeholder='150.00'
                name='load'
                required='required'
                value={values.load}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={unloadRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de descarga'
                label='Descarga'
                placeholder='0.00'
                name='unload'
                required='required'
                value={values.unload}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                ref={otherRef}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de otros gastos'
                label='Otros'
                placeholder='30.00'
                name='other'
                required='required'
                value={values.other}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <TextArea
                label='Detalles de otros gastos'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '3/5' }}
                placeholder='10 cortina/20 focos'
                name='otherDetail'
                rows='1'
                value={values.otherDetail}
                disabled={disabled} />
            <button
                type='button'
                onClick={handleClickCalc}
                className='button button_color_primary'>
                Calcular
            </button>
            <DataInput
                style={{ gridColumn: '1/2' }}
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto total depositado'
                label='Depositos por viajes'
                placeholder='500'
                name='deposits'
                required='required'
                readOnly={true}
                value={calcValues.deposits}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Monto de gasto total'
                label='Gasto total'
                placeholder='200.00'
                name='total'
                required='required'
                value={calcValues.total}
                disabled={disabled}
                readOnly={true}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,4}(\.[0-9]{1,2})?$'
                title='Mono de diferencia'
                label='Diferencia'
                placeholder='300.00'
                name='residue'
                required='required'
                readOnly={true}
                value={calcValues.residue}
                disabled={disabled}
                regExp={/^\d{1,4}(\.[0-9]{0,2})?$/} />
            <CheckBoxInput
                label='¿A favor de la Empresa?'
                name='favorsTheCompany'
                disabled={disabled}
                checked={calcValues.favorsTheCompany}
                readOnly={true} />
            <CheckBoxInput
                label='¿Liquidacion cancelada?'
                name='cancelled'
                disabled={disabled}
                checked={values.cancelled === undefined ? false : values.cancelled}
                readOnly={false} />
            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/5' }}
                placeholder='Falta entregar comprobante lavado'
                name='observation'
                rows='3'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}