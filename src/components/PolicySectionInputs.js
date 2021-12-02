import DataInput from './DataInput'
import TextArea from './TextArea'
import FileInput from './FileInput'
import { validFileType } from '../config'
import React from 'react'

export default function PolicySectionInputs(
    { values, disabled, operation }
) {

    return (
        <React.Fragment>
            <DataInput
                type='text'
                maxLength='15'
                minLength='3'
                pattern='^[a-zA-Z0-9-]{3,15}$'
                title='Solo letras, numeros y guiones(-). Minimo 3 y maximo 15 caracteres'
                label='Endoso'
                placeholder='0340-123455'
                name='endorsement'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.endorsement}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9-]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                maxLength='50'
                minLength='3'
                pattern='^[a-zA-Z ]{3,50}$'
                title='Solo letras y espacios. Minimo 3 y maximo 50 caracteres'
                label='Corredor'
                placeholder='America Brokers Corredor'
                name='insuranceCarrier'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.insuranceCarrier}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                maxLength='50'
                minLength='3'
                pattern='^[a-zA-Z ]{3,50}$'
                title='Solo letras y espacios. Minimo 3 y maximo 50 caracteres'
                label='Compañia'
                placeholder='Rimac Seguros'
                name='insuranceCompany'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.insuranceCompany}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^\d{1,7}(\.\d{1,2})$'
                title='Solo numeros, 9 digitos'
                label='Prima Neta'
                placeholder='1751.00'
                name='netPremium'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.netPremium}
                regExp={/^\d{1,7}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^\d{2}-\d{3}-\d{4}$'
                title='Un numero como: 01-411-4054'
                label='Telefono'
                placeholder='01-411-5554'
                name='telephone'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.telephone}
                regExp={/^\d{1,2}(-\d{0,3})?(-\d{0,4})?$/} />

            <FileInput
                required='required'
                path={values.imagePath || undefined}
                disabled={operation === 'maitenance' ? true : disabled}
                label='Imagen'
                mime={validFileType.mime}
                name='image'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de vigencia'
                label='Fecha Vigencia'
                name='dateStart'
                disabled={operation === 'maitenance' ? true : disabled}
                required='required'
                value={values.dateStart} />
            <DataInput
                type='date'
                title='Fecha de vencimiento'
                label='Fecha Vencimiento'
                name='dateEnd'
                disabled={operation === 'maitenance' ? true : disabled}
                required='required'
                value={values.dateEnd} />
            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/5' }}
                placeholder='Alguna observacion...'
                name='observation'
                rows='3'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}