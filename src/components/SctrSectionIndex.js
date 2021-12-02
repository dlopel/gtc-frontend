import React from 'react'
import SectionHeader from './SectionHeader'
import { getSctrs } from '../services/sctr'
import SctrSectionIndexTable from './SctrSectionIndexTable'
import { Link, useRouteMatch } from 'react-router-dom'
import './Section.css'
import './Button.css'

export default function SctrSectionIndex() {

    const match = useRouteMatch()
    const [sctr, setSctr] = React.useState([])
    const [isLoading, setIsLoading] = React.useState(false)
    const [error, setError] = React.useState(null)
    const isMounted = React.useRef(true)

    React.useEffect(() => {
        setIsLoading(true)
        getSctrs()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setSctr(response.body)
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
            <SectionHeader title='SCTR' isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link
                        className='button button_color_primary'
                        to={`${match.path}/nuevo`}>
                        Crear
                    </Link>
                </div>
                <SctrSectionIndexTable items={sctr} />
            </div>
        </section>
    )
}