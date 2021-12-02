import { forwardRef, useEffect, useMemo, useRef, useState } from "react"
import { useTable, useSortBy, usePagination, useRowSelect } from "react-table"
import { getDataForDropDownList as getClientDataForDropDownList, getClientFreightsByQuery } from '../services/client'
import { ClientFreightsQueryBody } from "../models/Freight"
import DataInput from "./DataInput"
import DropDownList from './DropDownList'
import './ExpenseSettlementSectionFreightsTableModal.css'

export default function SaleSettlementSectionFreightsTableModal(
    { AddFreights, onClose }
) {
    const [freights, setFreights] = useState([])
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const [clientDropDownListData, setClientDropDownListData] = useState([])

    const handleClickAdd = () => {
        if (selectedFlatRows.length > 0) {
            const selectedFreights = selectedFlatRows.map(flatRow => {
                return flatRow.original
            })
            onClose(false)
            AddFreights(selectedFreights)
        } else {
            alert('Para agregar viajes, seleccione al menos uno')
        }
    }

    const handleSubmit = e => {
        e.preventDefault()
        const query = new ClientFreightsQueryBody(
            e.target.selectClient.value,
            'false',
            e.target.dateStart.value,
            e.target.dateEnd.value
        )
        if (query.isValid()) {
            if (query.isMaximumDateRangeOneYear()) {
                getClientFreightsByQuery(query)
                    .then(response => {
                        if (isMounted.current) {
                            if (response.ok) {
                                setFreights(response.body)
                            } else {
                                setError(response.message)
                            }
                        }
                    })
            } else {
                alert('Intervalo de fechas maximo de 1 año, corrija las fechas y vuelva a intentarlo')
            }
        } else {
            alert('Datos invalidos para consultar viajes no liquidados. Refresque la pagina y vuelva a intentarlo')
        }
    }

    const handleClose = () => {
        onClose(false)
    }

    useEffect(() => {
        getClientDataForDropDownList()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setClientDropDownListData(response.body)
                    } else {
                        setError(response.message)
                    }
                }
            })
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    const IndeterminateCheckbox = forwardRef(
        ({ indeterminate, ...rest }, ref) => {
            const defaultRef = useRef()
            const resolvedRef = ref || defaultRef

            useEffect(() => {
                resolvedRef.current.indeterminate = indeterminate
            }, [resolvedRef, indeterminate])

            return (
                <>
                    <input type="checkbox" ref={resolvedRef} {...rest} />
                </>
            )
        }
    )

    const data = useMemo(() => freights, [freights])
    const columns = useMemo(() =>
        [
            {
                Header: 'Codigo',
                accessor: 'freightFormattedId'
            },
            {
                Header: 'Ruta',
                accessor: 'routeName'
            },
            {
                Header: 'TN',
                accessor: 'ton'
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
                Header: 'F.I.',
                accessor: 'dateStart'
            },
            {
                Header: 'F.T.',
                accessor: 'dateEnd'
            },
            {
                Header: 'GRT',
                accessor: 'grt',
                Cell: ({ value }) => (
                    <input style={{ border: 'none' }} defaultValue={value} />
                )
            },
            {
                Header: 'GRR',
                accessor: 'grr',
                Cell: ({ value }) => (
                    <input style={{ border: 'none' }} defaultValue={value} />
                )
            },
            {
                Header: 'Observaciones',
                accessor: 'observation',
                Cell: ({ value }) => (
                    <input style={{ border: 'none' }} defaultValue={value} />
                )
            }
        ], [])

    const instance = useTable(
        {
            columns,
            data,
            initialState: { pageSize: 10 }
        },
        useSortBy,
        usePagination,
        useRowSelect,
        hooks => {
            hooks.visibleColumns.push(columns => [
                {
                    id: 'selection',
                    Header: ({ getToggleAllRowsSelectedProps }) => (
                        <div>
                            <IndeterminateCheckbox {...getToggleAllRowsSelectedProps()} />
                        </div>
                    ),
                    Cell: ({ row }) => (
                        <div>
                            <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />
                        </div>
                    ),
                },
                ...columns,
            ])
        }
    )

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        prepareRow,
        selectedFlatRows,
        rows,
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        state: { pageIndex }
    } = instance

    return (
        <div className='modal'>
            <div className='modal__content'>
                <div className='modal__content-header'>
                    <h3>Seleccionar viajes a liquidar</h3>
                    <div><i onClick={handleClose} className="fas fa-times"></i></div>
                </div>
                <div className='modal__content-body'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <DropDownList
                            label='Cliente'
                            name='selectClient'
                            required='required'
                            keyValueArray={clientDropDownListData} />
                        <DataInput
                            type='date'
                            title='Desde la fecha'
                            label='Desde'
                            name='dateStart'
                            required='required' />
                        <DataInput
                            type='date'
                            title='Hasta la fecha'
                            label='Hasta'
                            name='dateEnd'
                            required='required' />
                        <button
                            style={{ gridColumn: '1/2' }}
                            type='submit'
                            className='button button_color_primary'>Buscar</button>
                        <span
                            className='button button_color_primary'
                            onClick={handleClickAdd}>Agregar</span>
                    </form>
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
                            <strong>{rows.length}{' '}Registros</strong>
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
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}