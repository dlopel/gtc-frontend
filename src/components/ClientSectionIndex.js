import React, { useEffect, useState } from 'react'
import { getClients } from '../services/client'
import ClientSectionTable from './ClientSectionTable'
import SectionHeader from './SectionHeader'
import { useRouteMatch, Link } from 'react-router-dom'
import './Section.css'

export default function ClientSectionIndex() {
    const [clients, setClients] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const match = useRouteMatch()

    useEffect(() => {
        let isMounted = true
        setIsLoading(true)
        getClients()
            .then(response => {
                if (isMounted) {
                    if (response.ok) {
                        setIsLoading(false)
                        setClients(response.body)
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
            <SectionHeader
                title='Clientes'
                isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link
                        to={`${match.path}/nuevo`}
                        className='button button_color_primary'>Crear</Link>
                </div>
                <ClientSectionTable items={clients} />
            </div>
        </section>
    )
}