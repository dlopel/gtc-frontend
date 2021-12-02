import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

function UnitSectionIndexTable({ items }) {
    const match = useRouteMatch()
    const rows = items.map(unit => (
        <tr key={unit.id}>
            <td>{unit.licensePlate}</td>
            <td>{unit.brand}</td>
            <td>{unit.color}</td>
            <td>{unit.length}</td>
            <td>{unit.height}</td>
            <td>{unit.width}</td>
            <td>{unit.dryWeight}</td>
            <td>{unit.grossWeight}</td>
            <td>{unit.usefulLoad}</td>
            <td>{unit.bodyType}</td>
            <td><a href={unit.policyImagePath} target="_blank" rel='noreferrer'>{unit.policyEndorsement}</a></td>
            <td>{unit.transportName}</td>
            <td><Link to={`${match.path}/${unit.id}`}>Ver</Link></td>
        </tr>
    ))

    return (
        <table className='section__table'>
            <thead>
                <tr>
                    <th>Placa</th>
                    <th>Marca</th>
                    <th>Color</th>
                    <th>Largo</th>
                    <th>Alto</th>
                    <th>Ancho</th>
                    <th>PS</th>
                    <th>PB</th>
                    <th>CU</th>
                    <th>Carroceria</th>
                    <th>Endoso</th>
                    <th>Transportista</th>
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
                                <span style={{ fontWeight: '600' }}>{items.length} Filas</span>
                            </div>
                        </td>
                    </tr> :
                    undefined}
            </tfoot>
        </table>
    )
}

UnitSectionIndexTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            licensePlate: PropTypes.string,
            brand: PropTypes.string,
            lenght: PropTypes.string,
            height: PropTypes.string,
            width: PropTypes.string,
            dryWeight: PropTypes.string,
            grossWeight: PropTypes.string,
            usefulLoad: PropTypes.string,
            bodyType: PropTypes.string,
            policyEndorsement: PropTypes.string,
            policyImagePath: PropTypes.string,
            transportName: PropTypes.string,
        }).isRequired
    )
}

export default UnitSectionIndexTable