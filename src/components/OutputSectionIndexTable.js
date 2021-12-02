import React, { useMemo } from 'react'
import { useTable, useSortBy, useFilters, usePagination } from 'react-table'
import { Link, useRouteMatch } from 'react-router-dom'

export default function OutputSectionIndexTable({ items }) {
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
                Header: 'Fecha',
                accessor: 'date'
            },
            {
                Header: 'Banco',
                accessor: 'bankName'
            },
            {
                Header: 'Tipo Egreso',
                accessor: 'outputTypeName'
            },
            {
                Header: 'Monto',
                accessor: 'value'
            },
            {
                Header: 'N° Operacion',
                accessor: 'operation'
            },
            {
                Header: 'Cod. Viaje',
                accessor: 'freightFormattedId'
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
            data,
            initialState: { pageSize: 50 }
        },
        useFilters,
        useSortBy,
        usePagination
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        rows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
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
                        {page.map((row, i) => {
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
            <div>
                <button style={{ padding: '0 .35rem' }} onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button style={{ padding: '0 .35rem' }} onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button style={{ padding: '0 .35rem' }} onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button style={{ padding: '0 .35rem' }} onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    {rows.length}{' '}Registros
                </span>{' '}
                <span>
                    | Pagina{' '}
                    <strong>
                        {pageOptions.length && pageIndex + 1} de {pageOptions.length}
                    </strong>
                </span>{' '}
                <span>
                    | Ir a pagina:{' '}
                    <input
                        type='number'
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }} />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}>
                    {
                        [10, 20, 30, 40, 50].map(pageSize => (
                            <option key={pageSize} value={pageSize}>
                                Mostrar {pageSize}
                            </option>
                        ))
                    }
                </select>
            </div>
        </>
    )
}