import OutputTypeSectionIndexTable from './OutputTypeSectionIndexTable'
import { useState, useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { getOutputTypes } from '../services/outputType'
import { Link, useRouteMatch } from 'react-router-dom'
import './Section.css'

export default function OutputTypeSectionIndex() {
    const [outputTypes, setOutputTypes] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const match = useRouteMatch()

    useEffect(() => {
        setIsLoading(true)
        getOutputTypes()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setOutputTypes(response.body)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            })
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className='section'>
            <SectionHeader
                title='Tipos de Egreso'
                isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link
                        className='button button_color_primary'
                        to={`${match.path}/nuevo`}>
                        Crear
                    </Link>
                </div>
                <OutputTypeSectionIndexTable
                    items={outputTypes} />
            </div>
        </section>
    )
}