import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

function RouteSectionTable({ items, totalRows }) {
    const match = useRouteMatch()
    const rows = items.map(route => (
        <tr key={route.id}>
            <td>{route.name}</td>
            <td>{route.addressStart}</td>
            <td>{route.addressEnd}</td>
            <td>{route.clientStart}</td>
            <td>{route.clientEnd}</td>
            <td>{route.value}</td>
            <td>{route.clientName}</td>
            <td><Link to={`${match.path}/${route.id}`}>Ver</Link></td>
        </tr>
    ))
    return (
        <table className='section__table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Dir. Origen</th>
                    <th>Dir. Destino</th>
                    <th>Cliente Origen</th>
                    <th>Cliente Destino</th>
                    <th>Valor</th>
                    <th>Cliente</th>
                    <th><i className="far fa-eye"></i></th>
                </tr>
            </thead>
            <tbody>
                {rows}
            </tbody>
            <tfoot>
                {items.length ?
                    <tr>
                        <td colSpan='13'>
                            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                                <span style={{ fontWeight: '600' }}>Mostrando {items.length} de {totalRows} filas</span>
                            </div>
                        </td>
                    </tr> :
                    undefined}
            </tfoot>
        </table>
    )
}

RouteSectionTable.propTypes = {
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

export default RouteSectionTable