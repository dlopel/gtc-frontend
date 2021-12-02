import React, { useEffect, useRef, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import DropDownList from './DropDownList'
import { getDataForDropDownList as getDataForBankDropDownList } from '../services/bank'
import './Button.css'

export default function OutputSectionSearchBar({ onSubmit }) {
    const match = useRouteMatch()
    const [bankDropDownListData, setBankDropDownListData] = useState([])
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    const handleSubmit = (e) => {
        onSubmit(e)
    }

    useEffect(() => {
        getDataForBankDropDownList()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setBankDropDownListData(response.body)
                    } else {
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
        <form onSubmit={handleSubmit} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>
                Crear
            </Link>
            <button type='submit' className='button button_color_primary'>
                Buscar
            </button>

            <DropDownList
                name='selectBank'
                keyValueArray={bankDropDownListData}
                label='Banco'
                required='required'
                style={{ gridColumn: '1/2' }} />
            <DataInput
                type='date'
                title='Desde la fecha'
                label='Desde'
                required='required'
                name='dateFrom' />
            <DataInput
                type='date'
                title='Hasta la fecha'
                label='Hasta'
                required='required'
                name='dateTo' />
        </form>
    )
}