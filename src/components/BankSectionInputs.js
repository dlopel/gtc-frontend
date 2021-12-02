import DataInput from './DataInput'
import TextArea from './TextArea'
import React from 'react'

export default function ProductSectionInputs({ values, disabled }) {

    return (
        <React.Fragment>
            <DataInput
                type='text'
                maxLength='25'
                pattern='^[a-zA-Z ]{3,25}$'
                title='Solo letras y espacios. Minimo 3 caracteres maximo 25'
                label='Nombre'
                placeholder='Interbank'
                name='name'
                required='required'
                value={values.name}
                disabled={disabled}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />

            <TextArea
                label='Observaciones'
                maxLength='100'
                minLength='3'
                style={{ gridColumn: '1/5' }}
                placeholder='...'
                name='observation'
                rows='2'
                value={values.observation}
                disabled={disabled} />
        </React.Fragment>
    )
}