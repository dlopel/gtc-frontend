import React from 'react'
import SectionHeader from './SectionHeader'
import { getPolicies } from '../services/policy'
import PolicySectionIndexTable from './PolicySectionIndexTable'
import { Link, useRouteMatch } from 'react-router-dom'
import './Section.css'
import './Button.css'

export default function PolicySectionIndex() {

    const match = useRouteMatch()
    const [policies, setPolicies] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const isMounted = React.useRef(true)

    React.useEffect(() => {
        setIsLoading(true)
        getPolicies()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setPolicies(response.body)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            })
    }, [])

    React.useEffect(() => {
        return () => isMounted.current = false
    }, [])

    React.useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <section className="section">
            <SectionHeader title='Polizas' isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link
                        className='button button_color_primary'
                        to={`${match.path}/nuevo`}>
                        Crear
                    </Link>
                </div>
                <PolicySectionIndexTable items={policies} />
            </div>
        </section>
    )
}