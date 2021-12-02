import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'

export default function ProductSectionIndexTable({ items, totalRows }) {
    const match = useRouteMatch()
    const rows = items.map(product => (
        <tr key={product.id}>
            <td>{product.name}</td>
            <td>{product.clientName}</td>
            <td><Link to={`${match.path}/${product.id}`}>Ver</Link></td>
        </tr>
    ))
    return (
        <table className='section__table'>
            <thead>
                <tr>
                    <th>Producto</th>
                    <th>Cliente</th>
                    <th></th>
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