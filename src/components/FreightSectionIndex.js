import SectionHeader from './SectionHeader'
import FreightSectionIndexSearchBar from './FreightSectionIndexSearchBar'
import FreightSectionIndexTable from './FreightSectionIndexTable'
import { CompressedFreightsQueryBody } from '../models/Freight'
import { getPaginationOfCompressedFreightsByQuery } from '../services/freight'
import { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import './Section.css'

export default function FreightSectionIndex() {
    const [pagination, setPagination] = useState(null)
    const [queryBody, setQueryBody] = useState(null)
    const [pageNumber, setPageNumber] = useState(0)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    const changePage = ({ selected }) => {
        setPageNumber(selected)
    }

    async function handleSubmit(e) {
        e.preventDefault()

        const newQueryBody = new CompressedFreightsQueryBody(
            e.target.formattedId.value,
            e.target.dateFrom.value,
            e.target.dateTo.value,
            e.target.grt.value,
            e.target.grr.value,
            e.target.routeName.value,
            e.target.truckTractorLicensePlate.value,
            e.target.semiTrailerLicensePlate.value,
            e.target.driverFullName.value,
            e.target.selectTransport.value,
            e.target.selectClient.value,
            e.target.selectService.value
        )
        //batch rendering
        if (newQueryBody.areQueryFieldsValid()) {

            if (newQueryBody.isMaximumDateRangeOneYear()) {
                setQueryBody(newQueryBody)
                //reset pageNumber to zero
                if (pageNumber > 0) setPageNumber(0)
            } else {
                alert("El intervalo maximo entre FECHA DESDE y FECHA HASTA es de 1 año")
            }
        } else {
            alert(
                `Al menos un campo con 3 caracteres como minimo para buscar:
Codigo: solo numeros,
Ruta/Conductor: solo letras y espacios,
Unidad: solo letras, numeros y guion(-),
Desde/Hasta: los dos obligatorios o ninguno,
GRT/GRR: solo numeros, guiones(-) y barras(/)`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (queryBody) {
            setIsLoading(true)
            getPaginationOfCompressedFreightsByQuery(queryBody, pageNumber + 1)
                .then(response => {
                    if (isMounted.current) {
                        if (response.ok) {
                            setIsLoading(false)
                            setPagination(response.body)
                        } else {
                            setIsLoading(false)
                            setError(response.message)
                        }
                    }
                })
        }
    }, [pageNumber, queryBody])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className='section'>
            <SectionHeader title='Viajes' isLoaderActive={isLoading} />
            <div className='section__content'>
                <FreightSectionIndexSearchBar
                    onSubmit={handleSubmit} />

                <FreightSectionIndexTable
                    totalRows={pagination ? pagination.totalRows : 0}
                    items={pagination ? pagination.rows : []} />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <div>
                        <ReactPaginate
                            pageCount={pagination ? pagination.totalPages : 0}
                            onPageChange={changePage}
                            forcePage={pageNumber}
                            previousLabel={<i className="fas fa-angle-left"></i>}
                            nextLabel={<i className="fas fa-angle-right"></i>}
                            breakLabel={<i className="fas fa-ellipsis-h"></i>}
                            containerClassName='section__react-paginate-container'
                            pageLinkClassName='section__react-paginate-page-link'
                            activeLinkClassName='section__react-paginate-active-link' />
                    </div>
                    <div>
                        <span><strong>{pagination ? pagination.totalPages : 0} Registros</strong></span>
                    </div>
                </div>
            </div>
        </section>
    )
}