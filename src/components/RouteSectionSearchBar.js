import React, { useEffect, useState, useRef } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import DropDownList from './DropDownList'
import { getDataForDropDownList } from '../services/client'
import './Button.css'

export default function RouteSectionSearchBar({ onSubmit }) {
    const match = useRouteMatch()
    const [clientDropDownListData, setclientDropDownListData] = useState([])
    const [value, setValue] = useState(undefined)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    const handleSubmit = (e) => { onSubmit(e) }

    const handleReset = () => { setValue('') }

    useEffect(() => {
        setValue(undefined)
    }, [value])

    useEffect(() => {
        getDataForDropDownList()
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setclientDropDownListData(response.body)
                    } else {
                        setError(response.message)
                    }
                }
            })
    }, [])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <form onSubmit={handleSubmit} onReset={handleReset} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
            <button type='submit' className='button button_color_primary'>Buscar</button>
            <button type='reset' className='button button_color_primary'>Limpiar</button>
            <DataInput
                value={value}
                minLength='3'
                maxLength='100'
                name='routeName'
                type='text'
                pattern='[a-zA-Z -]{3,100}'
                title='Minimo 3 caracteres, solo letras y espacios (ejem: Piura)'
                placeholder='Callao'
                label='Ruta'
                style={{ gridColumn: '1/2' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z -]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DropDownList
                label='Cliente'
                name='selectClient'
                value={value}
                keyValueArray={clientDropDownListData} />
        </form>
    )
}