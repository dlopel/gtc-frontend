import React from 'react'
import DataInput from './DataInput'
import TextArea from './TextArea'

export default function TransportSectionInputs({ values, disabled }) {
    return (
        <React.Fragment>
            <DataInput
                type='text'
                pattern='^\d{11}$'
                title='RUC, 11 numeros'
                label='RUC'
                placeholder='20568745985'
                name='ruc'
                required='required'
                value={values.ruc}
                disabled={disabled}
                regExp={/^\d{1,11}$/} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9 ]{3,50}$'
                title='Solo letras, numeros y espacios'
                label='Razon Social'
                placeholder='Migama SAC'
                name='name'
                required='required'
                value={values.name}
                disabled={disabled}
                regExp={/^[a-zA-Z0-9 ]{1,50}$/} />
            <DataInput
                type='text'
                pattern='^(\d{2}-)?\d{3}-\d{4}$'
                title='Cumpla con el formato. Solo numeros y guiones (ejem: 01-411-5599)'
                label='Teléfono Fijo'
                placeholder='01-154-4586'
                name='telephone'
                required='required'
                value={values.telephone}
                disabled={disabled}
                regExp={/^(\d{0,2}-)?\d{1,3}(-\d{0,4})?$/} />
            <DataInput
                type='text'
                pattern='^.{3,100}$'
                title='Solo de 3 hasta 100 caracteres'
                label='Dirección'
                style={{ gridColumn: '4/6' }}
                placeholder='Av Javier Prado 1224 La Molina'
                name='address'
                required='required'
                value={values.address}
                disabled={disabled} />
            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/6' }}
                placeholder='Cel Coordinador Javier: 957859987'
                name='observation'
                rows='10'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}