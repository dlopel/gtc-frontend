import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import DropDownList from './DropDownList'
import { getDataForDropDownList } from '../services/transport'
import './Button.css'

function UnitSectionIndexSearchBar({ onSubmit }) {
    const match = useRouteMatch()
    const [dropDownListData, setDropdownListData] = useState([])
    const [error, setError] = useState(null)

    const handleSubmit = (e) => {
        onSubmit(e)
    }

    useEffect(() => {
        let isMounted = true
        getDataForDropDownList().then(response => {
            if (isMounted) {
                if (response.ok) {
                    setDropdownListData(response.body)
                } else {
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
        <form onSubmit={handleSubmit} className='section__form'>
            <Link to={`${match.path}/nuevo`} className='button button_color_primary'>Crear</Link>
            <button type='submit' className='button button_color_primary'>Buscar</button>
            <DataInput
                name='licensePlate'
                type='text'
                title='Minimo 3 caracteres (ejem: AXG o 544 o AFQ-341)'
                style={{ gridColumn: '1/2', gridRow: '2 / 3' }}
                placeholder='AXG-865'
                label='Placa'
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9-]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                name='brand'
                type='text'
                title='Minimo 3 caracteres, solo letras (ejem: VOLVO o SCANNIA)'
                style={{ gridRow: '2 / 3' }}
                placeholder='VOLVO'
                label='Marca'
                onKeyPress={(e) => {
                    if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                name='bodyType'
                type='text'
                title='Minimo 3 caracteres, solo letras (ejem: Remolcador o Camabaja)'
                style={{ gridRow: '2 / 3' }}
                placeholder='Camabaja'
                label='Carroceria'
                onKeyPress={(e) => {
                    if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DropDownList
                name='transportIdSelect'
                keyValueArray={dropDownListData}
                label='Transportista'
                style={{ gridColumn: '4 / 6', gridRow: '2 / 3' }} />
        </form>
    )
}

export default UnitSectionIndexSearchBar
