import DataInput from './DataInput'
import TextArea from './TextArea'
import FileInput from './FileInput'
import { validFileType } from '../config'
import React from 'react'

export default function SctrSectionInputs(
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
                label='Numero de Pension'
                placeholder='34123455'
                name='pensionNumber'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.pensionNumber}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9-]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                maxLength='15'
                minLength='3'
                pattern='^[a-zA-Z0-9-]{3,15}$'
                title='Solo letras, numeros y guiones(-). Minimo 3 y maximo 15 caracteres'
                label='Numero de Salud'
                placeholder='35436663'
                name='healthNumber'
                required='required'
                disabled={operation === 'maitenance' ? true : disabled}
                value={values.healthNumber}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9-]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />

            <DataInput
                type='text'
                maxLength='50'
                minLength='3'
                pattern='^[a-zA-Z ]{3,100}$'
                title='Solo letras y espacios. Minimo 3 y maximo 100 caracteres'
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