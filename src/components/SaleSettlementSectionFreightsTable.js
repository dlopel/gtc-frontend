import { useState, useMemo, useEffect, useRef } from "react"
import SaleSettlementSectionFreightsTableModal from "./SaleSettlementSectionFreightsTableModal"
import { useTable, useSortBy, usePagination, useRowState } from "react-table"
import './Button.css'
import { roundToOneDecimal } from "../libs/helperFunctions"

export default function SaleSettlementSectionFreightsTable(
    {
        freights,
        AddFreights,
        deleteFreight,
        buttonAddActive,
        setCalculatedValues,
        calculatedValues
    }
) {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const wasClickCalculatePressed = useRef(false)

    // const handleDeleteFreight = (freightId, e) => {
    //     // console.log(freightId)
    //     deleteFreight(freightId)
    // }

    const handleClickCalc = () => {
        if (freights.length > 0) {
            //primero actualiza los valores en base al estado
            AddFreights((prevState) => (
                prevState.map(freight => {
                    rows.forEach(row => {
                        if (row.original.id === freight.id) {
                            const valueWithoutIgv = row.state.cellState.valueWithoutIgv
                            if (valueWithoutIgv) {
                                if (valueWithoutIgv !== freight.valueWithoutIgv) {
                                    freight.valueWithoutIgv = valueWithoutIgv
                                }
                            }

                            const valueAdditionalWithoutIgv = row.state.cellState.valueAdditionalWithoutIgv
                            if (valueAdditionalWithoutIgv) {
                                if (valueAdditionalWithoutIgv !== freight.valueAdditionalWithoutIgv) {
                                    freight.valueAdditionalWithoutIgv = valueAdditionalWithoutIgv
                                }
                            }

                            const valueAdditionalDetail = row.state.cellState.valueAdditionalDetail
                            if (valueAdditionalDetail) {
                                if (valueAdditionalDetail !== freight.valueAdditionalDetail) {
                                    freight.valueAdditionalDetail = valueAdditionalDetail
                                }
                            }

                            const observation = row.state.cellState.observation
                            if (observation) {
                                if (observation !== freight.observation) {
                                    freight.observation = observation
                                }
                            }
                        }
                    })
                    return freight
                })
            ))
            wasClickCalculatePressed.current = true
        }
    }

    useEffect(() => {
        //usa los valores para calcular totales
        if (wasClickCalculatePressed.current) {
            let subtotal = 0
            freights.forEach(freight => {
                const val = parseFloat(freight.valueWithoutIgv.toString())
                const add = parseFloat(freight.valueAdditionalWithoutIgv.toString())
                subtotal += roundToOneDecimal(val + add)
            })
            const igv = roundToOneDecimal(subtotal * 0.18)
            const total = roundToOneDecimal(subtotal + igv)
            setCalculatedValues({
                subtotal: subtotal.toString(),
                igv: igv.toString(),
                total: total.toString()
            })
            wasClickCalculatePressed.current = false
        }
    }, [freights, setCalculatedValues])

    const handleClickAdd = e => {
        setIsModalOpen(true)
    }

    const handleAddFreights = (freights) => {
        AddFreights(freights)
    }

    const handleClose = (isOpen) => {
        setIsModalOpen(isOpen)
    }

    const EditableCell = (row, value, cellIndex, title, regExp) => {
        const [enteredValue, setValue] = useState(value || '')
        useEffect(() => {
            setValue(value || '')
        }, [value])

        const handleBlur = (e) => {
            row.cells[cellIndex].setState(e.target.value)
        }

        const handleChange = (e) => {
            const v = e.target.value
            if (!v || v.match(regExp)) {
                setValue(v)
            }
        }

        return <input
            style={{ border: 'none' }}
            onChange={handleChange}
            title={title}
            onBlur={handleBlur}
            value={enteredValue} />
    }

    const data = useMemo(() => freights, [freights])
    const columns = useMemo(() =>
        [
            {
                Header: 'VIAJES A LIQUIDAR',
                columns: [
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
                        Header: 'Semiremolque',
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
                        Cell: ({ row, value }) => EditableCell(
                            row,
                            value,
                            16,
                            'Observaciones del viaje a liquidar',
                            /.{1,100}/
                        )
                    },
                    {
                        Header: 'Valor S/IGV',
                        accessor: 'valueWithoutIgv',
                        Cell: ({ row, value }) => EditableCell(
                            row,
                            value,
                            13,
                            'Costo del viaje sin igv',
                            /^\d{1,5}(\.\d{0,2})?$/
                        )
                    },
                    {
                        Header: 'Adicional',
                        accessor: 'valueAdditionalWithoutIgv',
                        Cell: ({ row, value }) => EditableCell(
                            row,
                            value,
                            14,
                            'Valor adicional sin igv',
                            /^\d{1,5}(\.\d{0,2})?$/
                        )
                    },
                    {
                        Header: 'Detalle',
                        accessor: 'valueAdditionalDetail',
                        Cell: ({ row, value }) => EditableCell(
                            row,
                            value,
                            15,
                            'Detalle del valor adicional',
                            /.{1,100}/
                        )
                    }

                ]
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
        useRowState
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
        state: { pageIndex }
    } = instance

    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '.5rem' }}>
            <div>
                {buttonAddActive &&
                    <button
                        className='button button_color_primary'
                        onClick={handleClickAdd}>Buscar viajes</button>}
            </div>
            <div style={{ overflowX: 'auto' }}>
                <table className='section__table section__table_font-size_normal' {...getTableProps()}>
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
                {buttonAddActive &&
                    <button onClick={handleClickCalc} className="button button_color_primary">Calcular</button>}
                {buttonAddActive && ' '}
                <label>Subtotal <input readOnly defaultValue={calculatedValues.subtotal} /></label>{'  '}
                <label>IGV <input readOnly defaultValue={calculatedValues.igv} /></label>{'  '}
                <label>Total <input readOnly defaultValue={calculatedValues.total} /></label>
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
            {isModalOpen &&
                <SaleSettlementSectionFreightsTableModal
                    onClose={handleClose}
                    AddFreights={handleAddFreights} />}
        </div>
    )
}