import BankSectionIndexTable from './BankSectionIndexTable'
import { useState, useEffect, useRef } from 'react'
import SectionHeader from './SectionHeader'
import { getBanks } from '../services/bank'
import { Link, useRouteMatch } from 'react-router-dom'
import './Section.css'

export default function ProductSectionIndex() {
    const [banks, setBanks] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const match = useRouteMatch()

    useEffect(() => {
        setIsLoading(true)
        getBanks()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        setBanks(response.body)
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
            <SectionHeader title='Bancos' isLoaderActive={isLoading} />
            <div className='section__content'>
                <div>
                    <Link
                        className='button button_color_primary'
                        to={`${match.path}/nuevo`}>
                        Crear
                    </Link>
                </div>
                <BankSectionIndexTable
                    items={banks} />
            </div>
        </section>
    )
}