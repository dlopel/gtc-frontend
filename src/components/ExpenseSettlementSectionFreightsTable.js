import { useState, useMemo } from "react"
import ExpenseSettlementSectionFreightsTableModal from "./ExpenseSettlementSectionFreightsTableModal"
import { useTable, useSortBy, usePagination } from "react-table"
import './Button.css'

export default function ExpenseSettlementSectionFreightsTable(
    { freights, AddFreights, deleteFreight, buttonAddActive }
) {
    const [isModalOpen, setIsModalOpen] = useState(false)

    // const handleDeleteFreight = (freightId, e) => {
    //     // console.log(freightId)
    //     deleteFreight(freightId)
    // }

    const handleClickAdd = e => {
        setIsModalOpen(true)
    }

    const handleAddFreights = (freights) => {
        AddFreights(freights)
    }

    const handleClose = (isOpen) => {
        setIsModalOpen(isOpen)
    }

    const data = useMemo(() => freights, [freights])
    const columns = useMemo(() =>
        [
            {
                Header: 'VIAJES SELECCIONADOS',
                columns: [
                    {
                        Header: 'Cod Viaje',
                        accessor: 'formattedId'
                    },
                    {
                        Header: 'Ruta',
                        accessor: 'routeName'
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
        state: { pageIndex }
    } = instance

    return (
        <div style={{ display: 'flex', flexDirection: 'column', rowGap: '.5rem' }}>
            <div>
                {buttonAddActive &&
                    <button
                        className='button button_color_primary'
                        onClick={handleClickAdd}>Seleccionar viajes</button>}
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
                <ExpenseSettlementSectionFreightsTableModal
                    onClose={handleClose}
                    AddFreights={handleAddFreights} />}
        </div>
    )
}