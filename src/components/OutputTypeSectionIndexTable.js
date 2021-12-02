import React, { useMemo } from 'react'
import { useTable, useSortBy } from 'react-table'
import { Link, useRouteMatch } from 'react-router-dom'

export default function OutputTypeSectionIndexTable({ items }) {
    const match = useRouteMatch()
    const data = useMemo(() => items, [items])
    const columns = useMemo(() =>
        [
            {
                Header: 'Ver',
                id: 'see',
                Cell: ({ row }) => (
                    <Link to={`${match.path}/${row.original.id}`}>Ver</Link>
                )
            },
            {
                Header: 'Nombre',
                accessor: 'name'
            }
        ], [match.path])

    const instance = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
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