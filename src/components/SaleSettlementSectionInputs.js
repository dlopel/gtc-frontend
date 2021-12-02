import React from 'react'
import DataInput from './DataInput'
import TextArea from './TextArea'

export default function SaleSettlementSectionInputs(
    { values, disabled }
) {
    return (
        <React.Fragment>
            <DataInput
                type='date'
                title='Fecha de Liquidacion'
                label='Fecha de Liquidacion'
                name='date'
                required='required'
                disabled={disabled}
                value={values.date} />
            <DataInput
                type='text'
                pattern='^[fF0-9]{1}\d{3}-\d{1,8}$'
                title='Numero de Factura'
                label='N° Factura'
                placeholder='F051-15174'
                name='invoiceNumber'
                value={values.invoiceNumber}
                disabled={disabled}
                regExp={/^[fF0-9]{1}\d{0,3}(-\d{0,8})?$/} />
            <DataInput
                type='date'
                title='Fecha de Facturacion'
                label='Fecha de Facturacion'
                name='invoiceDate'
                disabled={disabled}
                value={values.invoiceDate} />

            <TextArea
                label='Observaciones'
                maxLength='100'
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