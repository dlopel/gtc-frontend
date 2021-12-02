import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { useEffect, useState } from 'react'
import { getDataForDropDownList } from '../services/client'
import React from 'react'

export default function ProductSectionInputs({ values, disabled }) {
    const [clientDropDownListData, setClientDropDownListData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true
        getDataForDropDownList()
            .then(response => {
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
                maxLength='100'
                pattern='^[a-zA-Z0-9 ]{3,100}$'
                title='Solo letras, numeros y espacios. Minimo 3 caracteres'
                label='Nombre'
                placeholder='Toyota Corolla'
                name='name'
                required='required'
                value={values.name}
                disabled={disabled}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9 ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />

            <DropDownList
                label='Cliente'
                name='selectClient'
                required='required'
                keyValueArray={clientDropDownListData}
                value={values.clientId}
                disabled={disabled} />

            <TextArea
                label='Observaciones'
                maxLength='100'
                minLength='3'
                style={{ gridColumn: '1/6' }}
                placeholder='Año 2021'
                name='observation'
                rows='2'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}