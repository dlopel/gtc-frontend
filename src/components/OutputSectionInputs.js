import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import { getDataForDropDownList as getDataForBankDropDownList } from '../services/bank'
import { getDataForDropDownList as getDataForOutputTypeDropDownList } from '../services/outputType'
import { getFreightByFormattedId } from '../services/freight'

export default function OutputSectionInputs({ values, disabled }) {

    const [bankDropDownListData, setBankDropDownListData] = useState([])
    const [outputTypeDropDownListData, setOutputTypeDropDownListData] = useState([])
    const [error, setError] = useState(null)
    const [freightId, setFreightId] = useState(null)
    const isMounted = useRef(true)
    const timeout = useRef(null)

    useEffect(() => {
        if (values.freightId)
            setFreightId(values.freightId || '')
    }, [values.freightId])

    useEffect(() => {
        getDataForBankDropDownList()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setBankDropDownListData(response.body)
                    } else {
                        setError(response.message)
                    }
                }
            })

        getDataForOutputTypeDropDownList()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setOutputTypeDropDownListData(response.body)
                    } else {
                        setError(response.message)
                    }
                }
            })
    }, [])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <React.Fragment>
            <DropDownList
                label='Banco'
                name='selectBank'
                required='required'
                keyValueArray={bankDropDownListData}
                value={values.bankId}
                disabled={disabled} />
            <DropDownList
                label='Tipo de Egreso'
                name='selectOutputType'
                required='required'
                keyValueArray={outputTypeDropDownListData}
                value={values.outputTypeId}
                disabled={disabled} />
            <DataInput
                type='date'
                title='Fecha de salida de dinero'
                label='Fecha'
                name='date'
                required='required'
                disabled={disabled}
                value={values.date} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,5}(\.[0-9]{1,2})?$'
                title='Numero menor a 10 000 y maximo dos decimales (ejem: 2500.50)'
                label='Monto'
                placeholder='2050.50'
                name='value'
                disabled={disabled}
                value={values.value}
                regExp={/^\d{1,5}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{3,25}$'
                title='Solo numeros. Minimo 3 caracteres y maximo 25'
                label='N° operacion'
                placeholder='65984832'
                name='operation'
                disabled={disabled}
                value={values.operation}
                minLength='3'
                regExp={/^[0-9]{1,25}$/} />
            <input name='freightId' hidden defaultValue={freightId} />
            <DataInput
                type='text'
                pattern='^[fF]\d{6}$'
                title='Formato codigo: F000569'
                label='Codigo de Viaje'
                placeholder='F010511'
                name='freightFormattedId'
                disabled={disabled}
                value={values.freightFormattedId}
                regExp={/^[fF]\d{0,6}$/}
                onChange={e => {
                    clearTimeout(timeout.current)
                    timeout.current = setTimeout(() => {
                        getFreightByFormattedId(e.target.value)
                            .then(response => {
                                if (response.ok) {
                                    if (response.body !== null) {
                                        setFreightId(response.body.id)
                                    } else {
                                        alert('No existe el CODIGO DEL VIAJE INGRESADO, borrelo o vuelva a ingresar el codigo del viaje correctamente')
                                    }
                                } else {
                                    alert(response.message)
                                }
                            })
                    }, 1500)
                }} />
            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/5' }}
                placeholder='Solicitar documentos'
                name='observation'
                rows='10'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}