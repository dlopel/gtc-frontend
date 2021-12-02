import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

function TransportSectionTable({ items }) {
    const match = useRouteMatch()
    const rows = items.map(transport => (
        <tr key={transport.id}>
            <td>{transport.ruc}</td>
            <td>{transport.name}</td>
            <td>{transport.address}</td>
            <td>{transport.telephone}</td>
            <td><Link to={`${match.path}/${transport.id}`}>Ver</Link></td>
        </tr>
    ))
    return (
        <table className='section__table'>
            <thead>
                <tr>
                    <th>RUC</th>
                    <th>Nombre</th>
                    <th>Direccion</th>
                    <th>Telefono</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
        </table>
    )
}

TransportSectionTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            ruc: PropTypes.string,
            name: PropTypes.string,
            address: PropTypes.string,
            telephone: PropTypes.string
        }).isRequired
    )
}

export default TransportSectionTable