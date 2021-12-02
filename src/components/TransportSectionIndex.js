import React, { useEffect, useState } from 'react'
import { getCompressedTransports } from '../services/transport'
import TransportSectionTable from './TransportSectionTable'
import SectionHeader from './SectionHeader'
import { useRouteMatch, Link } from 'react-router-dom'
import './Section.css'

export default function TransportSectionIndex() {
    const [compressedTransports, setCompressedTransports] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const match = useRouteMatch()

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)
        getCompressedTransports().then(response => {
            if (isMounted) {
                if (response.ok) {
                    setIsLoading(false)
                    setCompressedTransports(response.body)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        })
        return () => isMounted = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className="section">
            <SectionHeader title='Transportistas' isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
                </div>
                <TransportSectionTable items={compressedTransports} />
            </div>
        </section>
    )
}