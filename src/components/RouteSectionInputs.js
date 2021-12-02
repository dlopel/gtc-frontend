import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { useEffect, useState } from 'react'
import { getDataForDropDownList } from '../services/client'
import React from 'react'

function RouteSectionInputs({ values, disabled }) {
    const [clientDropDownListData, setClientDropDownListData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true
        getDataForDropDownList().then(response => {
            if (isMounted) {
                if (response.ok) {
                    setClientDropDownListData(response.body)
                } else {
                    setError(response.message)
                }
            }
        })
        return () => isMounted = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <React.Fragment>
            <DataInput
                type='text'
                pattern='^[a-zA-Z -]{3,100}$'
                title='Solo letras, espacios y guiones(-). Minimo 3 y maximo 100 caracteres'
                label='Nombre'
                placeholder='Ate - Ventanilla'
                name='name'
                required='required'
                style={{ gridColumn: '1/3' }}
                value={values.name}
                disabled={disabled}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z -]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,5}(\.[0-9]{1,2})?$'
                title='Numero menor a 100 000, maximo dos decimales (ejem: 1500 o 800.55)'
                label='Valor (Sin IGV)'
                placeholder='1400'
                name='value'
                required='required'
                value={values.value}
                disabled={disabled}
                regExp={/^\d{1,5}(\.[0-9]{0,2})?$/} />
            <DropDownList
                label='Cliente'
                name='selectClient'
                required='required'
                keyValueArray={clientDropDownListData}
                value={values.clientId}
                disabled={disabled}
                style={{ gridColumn: '4/6' }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z /]{3,100}$'
                title='Solo letras, numeros, espacios y barras(/) minimo 3 y maximo 100 caracteres'
                label='Almacen Origen'
                placeholder='Almacenes Peruanos'
                name='clientStart'
                required='required'
                value={values.clientStart}
                disabled={disabled}
                style={{ gridColumn: '1/3' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z -/]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9 -/]{6,300}$'
                title='Solo letras, numeros, espacios, guiones(-) y barras(/) minimo 6 y maximo 300 caracteres'
                label='Direcion Origen'
                placeholder='Av Mexico 1521 San Luis'
                name='addressStart'
                required='required'
                value={values.addressStart}
                disabled={disabled}
                style={{ gridColumn: '3/6' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9 -/]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z /]{3,100}$'
                title='Solo letras, numeros, espacios y barras(/) minimo 3 y maximo 100 caracteres'
                label='Almacen Destino'
                placeholder='Guarda Todo'
                name='clientEnd'
                required='required'
                value={values.clientEnd}
                disabled={disabled}
                style={{ gridColumn: '1/3' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z /]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9 -/]{6,300}$'
                title='Solo letras, numeros, espacios, guiones(-) y barras(/) minimo 6 y maximo 300 caracteres'
                label='Direccion Destino'
                placeholder='Calle Pachacutec 154 Ventanilla'
                name='addressEnd'
                required='required'
                value={values.addressEnd}
                disabled={disabled}
                style={{ gridColumn: '3/6' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9 -/]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/6' }}
                placeholder='Cel Javier: 957859987'
                name='observation'
                rows='10'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}

export default RouteSectionInputs

