import RouteSectionSearchBar from './RouteSectionSearchBar'
import RouteSectionTable from './RouteSectionTable'
import { useState, useEffect, useRef } from 'react'
import ReactPaginate from 'react-paginate'
import SectionHeader from '../components/SectionHeader'
import { CompressedRoutesQueryBody } from '../models/Route'
import { getPaginationOfCompressedRoutesByQuery } from '../services/route'
import './Section.css'

export default function RouteSectionIndex() {
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
        const newQueryBody = new CompressedRoutesQueryBody(
            e.target.routeName.value,
            e.target.selectClient.value
        )
        if (newQueryBody.areQueryFieldsValid()) {
            setQueryBody(newQueryBody)
            if (pageNumber > 0) setPageNumber(0)
        } else {
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    useEffect(() => {
        if (queryBody) {
            setIsLoading(true)
            getPaginationOfCompressedRoutesByQuery(queryBody, pageNumber + 1)
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
    }, [queryBody, pageNumber])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className='section'>
            <SectionHeader title='Rutas' isLoaderActive={isLoading} />
            <div className='section__content'>
                <RouteSectionSearchBar onSubmit={handleSubmit} />
                <RouteSectionTable
                    items={pagination ? pagination.rows : []}
                    totalRows={pagination ? pagination.totalRows : 0} />
                <div>
                    <ReactPaginate
                        previousLabel={<i className="fas fa-angle-left"></i>}
                        nextLabel={<i className="fas fa-angle-right"></i>}
                        breakLabel={<i className="fas fa-ellipsis-h"></i>}
                        pageCount={pagination ? pagination.totalPages : 0}
                        onPageChange={changePage}
                        forcePage={pageNumber}
                        containerClassName='section__react-paginate-container'
                        pageLinkClassName='section__react-paginate-page-link'
                        activeLinkClassName='section__react-paginate-active-link' />
                </div>
            </div>
        </section>
    )
}