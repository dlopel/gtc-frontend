import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import RadioButtonInput from './RadioButtonInput'
import './Button.css'

export default function ExpenseSettlementSectionIndexSearchBar({ onSubmit }) {
    const match = useRouteMatch()

    const handleSubmit = (e) => {
        onSubmit(e)
    }

    return (
        <form onSubmit={handleSubmit} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
            <button type='submit' className='button button_color_primary'>Buscar</button>

            <DataInput
                style={{ gridColumn: '1/2' }}
                type='date'
                title='Desde la fecha'
                label='Desde'
                name='dateStart'
                required='required' />
            <DataInput
                type='date'
                title='Hasta la fecha'
                label='Hasta'
                name='dateEnd'
                required='required' />
            <RadioButtonInput
                label='Liquidado'
                name='liquidated'
                buttons={[{ label: 'Si', value: 'true' }, { label: 'No', value: 'false' }]} />

        </form>
    )
}