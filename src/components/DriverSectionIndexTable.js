import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import PropTypes from 'prop-types'

function DriverSectionIndexTable({ items }) {
    const match = useRouteMatch()
    const rows = items.map(driver => (
        <tr key={driver.id}>
            <td>{driver.name}</td>
            <td>{driver.lastname}</td>
            <td>
                <a href={driver.dniImagePath} rel='noreferrer' target='_blank'>
                    {driver.dni}
                </a>
            </td>
            <td>
                <a href={driver.licenseImagePath} rel='noreferrer' target='_blank'>
                    {driver.license}
                </a>
            </td>
            <td>
                {driver.contractImagePath &&
                    <a href={driver.contractImagePath} rel='noreferrer' target='_blank'>
                        <i className="far fa-file-image"></i>
                    </a>
                }
            </td>
            <td>{driver.cellphoneOne}</td>
            <td>{driver.transportName}</td>
            <td><Link to={`${match.path}/${driver.id}`}>Ver</Link></td>
        </tr>
    ))

    return (
        <table className='section__table'>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Apellido</th>
                    <th>DNI</th> 
                    <th>Licencia</th>
                    <th>Contrato</th>
                    <th>Celular</th>
                    <th>Transportista</th>
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
                                <span style={{ fontWeight: '600' }}>{items.length} Filas</span>
                            </div>
                        </td>
                    </tr> :
                    undefined}
            </tfoot>
        </table>
    )
}

DriverSectionIndexTable.propTypes = {
    items: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            lastname: PropTypes.string,
            dni: PropTypes.string,
            dniImagePath: PropTypes.string,
            license: PropTypes.string,
            licenseImagePath: PropTypes.string,
            contractImagePath: PropTypes.string,
            cellphoneOne: PropTypes.string,
            transportName: PropTypes.string
        }).isRequired
    )
}

export default DriverSectionIndexTable