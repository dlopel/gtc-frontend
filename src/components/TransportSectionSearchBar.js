import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import PropTypes from 'prop-types'
import './Button.css'

function TransportSectionSearchBar(props) {
    const match = useRouteMatch()

    const handleSubmit = (e) => {
        props.onSubmit(e)
    }

    return (
        <form onSubmit={handleSubmit} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
            <button type='submit' className='button button_color_primary'>Buscar</button>
            <DataInput
                name='transportName'
                type='text'
                pattern='[a-zA-Z0-9 ]{3,50}'
                title='Solo letras, numeros y espacios de 3 a 50 caracteres'
                style={{ gridColumn: '1/3', gridRow: '2 / 3' }}
                placeholder='Migama'
                required='required'
                label='Nombre de Transportista' />
        </form>
    )
}

TransportSectionSearchBar.propTypes = {
    onSubmit: PropTypes.func.isRequired
}

export default TransportSectionSearchBar
