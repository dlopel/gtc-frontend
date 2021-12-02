import DataInput from './DataInput'
import React from 'react'

export default function OutputTypeSectionInputs({ values, disabled }) {

    return (
        <React.Fragment>
            <DataInput
                type='text'
                maxLength='25'
                pattern='^[a-zA-Z ]{3,25}$'
                title='Solo letras y espacios. Minimo 3 caracteres maximo 25'
                label='Nombre'
                placeholder='Transferencia'
                name='name'
                required='required'
                value={values.name}
                disabled={disabled}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
        </React.Fragment>
    )
}