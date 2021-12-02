import React from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import { useTable, useSortBy } from 'react-table'

export default function PolicySectionIndexTable({ items }) {
    const match = useRouteMatch()

    const data = React.useMemo(() => items, [items])
    const columns = React.useMemo(() =>
        [
            {
                Header: 'Endoso',
                accessor: 'endorsement',
                Cell: ({ row, value }) => (
                    <Link to={`${match.path}/${row.original.id}`}>{value}</Link>
                )
            },
            {
                Header: 'Prima Neta',
                accessor: 'netPremium'
            },
            {
                Header: 'Corredor',
                accessor: 'insuranceCarrier'
            },
            {
                Header: 'Compañia',
                accessor: 'insuranceCompany'
            },
            {
                Header: 'Telefono',
                accessor: 'telephone'
            },
            {
                Header: 'Imagen',
                accessor: 'imagePath',
                Cell: ({ value }) => (
                    <a href={value} rel='noreferrer' target='_blank' style={{ padding: '0 .25rem' }}><i className="fas fa-file-pdf"></i></a>
                )
            },
            {
                Header: 'Desde',
                accessor: 'dateStart'
            },
            {
                Header: 'Hasta',
                accessor: 'dateEnd'
            },
            {
                Header: 'Observacion',
                accessor: 'observation',
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