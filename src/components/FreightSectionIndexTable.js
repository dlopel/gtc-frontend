import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'

function FreightSectionIndexTable({ items, totalRows }) {
    const match = useRouteMatch()
    const data = React.useMemo(() => items, [items])
    const columns = React.useMemo(() =>
        [
            {
                Header: 'Cod. Viaje',
                accessor: 'formattedId',
                Cell: ({ row, value }) => (
                    <Link to={`${match.path}/${row.original.id}`}>{value}</Link>
                )
            },
            {
                Header: 'F.I.',
                accessor: 'dateStart'
            },
            {
                Header: 'F.T.',
                accessor: 'dateEnd'
            },
            {
                Header: 'Ruta',
                accessor: 'routeName'
            },
            {
                Header: 'Ton.',
                accessor: 'ton'
            },
            {
                Header: 'Cliente',
                accessor: 'clientName'
            },
            {
                Header: 'Conductor',
                accessor: 'driverFullName'
            },
            {
                Header: 'Tracto',
                accessor: 'truckTractorLicensePlate'
            },
            {
                Header: 'Semi',
                accessor: 'semiTrailerLicensePlate'
            },
            {
                Header: 'Transportista',
                accessor: 'transportName'
            },
            {
                Header: 'Servicio',
                accessor: 'serviceName'
            },
            {
                Header: 'GRR',
                accessor: 'grr',
                Cell: ({ value }) => (
                    <input style={{ border: 'none' }} defaultValue={value} />
                )
            },
            {
                Header: 'GRT',
                accessor: 'grt',
                Cell: ({ value }) => (
                    <input style={{ border: 'none' }} defaultValue={value} />
                )
            }
        ], [match.path])

    const instance = useTable(
        {
            columns,
            data
        },
        useSortBy
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows
    } = instance

    return (
        <>
            <div style={{ overflowX: 'auto' }}>
                <table className='section__table' {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>
                                        <div {...column.getSortByToggleProps()}>
                                            <span style={{ userSelect: 'none' }}>{column.render('Header')}{' '}</span>
                                            {
                                                column.isSorted ?
                                                    column.isSortedDesc ?
                                                        <i className="fas fa-sort-up"></i> : <i className="fas fa-sort-down"></i>
                                                    : ''
                                            }
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return (
                                            <td {...cell.getCellProps({ className: 'section__table-cell_nowrap' })}>
                                                {cell.render('Cell')}
                                            </td>
                                        )
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </>
    )
}

export default FreightSectionIndexTable