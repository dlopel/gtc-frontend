import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import DropDownList from './DropDownList'
import { getDataForDropDownList } from '../services/transport'
import './Button.css'

export default function DriverSectionIndexSearchBar({ onSubmit }) {
    const match = useRouteMatch()
    const [dropDownListData, setDropdownListData] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        onSubmit(e)
    }

    useEffect(() => {
        let isMounted = true
        getDataForDropDownList()
            .then((response) => {
                if (isMounted)
                    if (response.ok) {
                        setDropdownListData(response.body)
                    } else {
                        setError(response.message)
                    }
            })
        return () => isMounted = false
    }, [])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <form onSubmit={handleSubmit} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
            <button type='submit' className='button button_color_primary'>Buscar</button>
            {/* <input style={{gridColumn: '1/2'}}/> */}
            <DataInput
                name='name'
                type='text'
                title='Minimo 3 caracteres, solo letras y espacios'
                placeholder='Diego'
                label='Nombre'
                style={{ gridColumn: '1/2' }}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                name='lastname'
                type='text'
                title='Minimo 3 caracteres, solo letras y espacios'
                placeholder='Lope'
                label='Apellidos'
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DropDownList
                name='selectTransport'
                keyValueArray={dropDownListData}
                label='Transportista' />
        </form>
    )
}