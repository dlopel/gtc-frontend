import React, { useEffect, useState } from 'react'
import { Link, useRouteMatch } from 'react-router-dom'
import DataInput from './DataInput'
import DropDownList from './DropDownList'
import { getDataForDropDownList as getDataForTransportDropDownList } from '../services/transport'
import { getDataForDropDownList as getDataForClientDropDownList } from '../services/client'
import { getDataForDropDownList as getDataForServiceDropDownList } from '../services/service'
import './Button.css'

function FreightSectionSearchBar({ onSubmit }) {
    const match = useRouteMatch()
    const [clientDropDownListData, setClientDropDownListData] = useState([])
    const [serviceDropDownListData, setServiceDropDownListData] = useState([])
    const [transportDropDownListData, setTransportDropDownListData] = useState([])
    const [error, setError] = useState(null)
    const [value, setValue] = useState(undefined)

    const handleSubmit = (e) => {
        onSubmit(e)
    }

    const handleReset = () => { setValue('') }
    useEffect(() => { if (value === '') setValue(undefined) }, [value])

    useEffect(() => {
        let isMounted = true
        const loadDropDownLists = async () => {
            const responseForClient = await getDataForClientDropDownList()
            const responseForService = await getDataForServiceDropDownList()
            const responseForTransport = await getDataForTransportDropDownList()

            if (isMounted) {
                if (responseForClient.ok) {
                    setClientDropDownListData(responseForClient.body)
                } else {
                    setError(responseForClient.message)
                }

                if (responseForService.ok) {
                    setServiceDropDownListData(responseForService.body)
                } else {
                    setError(responseForService.message)
                }

                if (responseForTransport.ok) {
                    setTransportDropDownListData(responseForTransport.body)
                } else {
                    setError(responseForTransport.message)
                }
            }
        }
        loadDropDownLists()
        return () => isMounted = false
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
                name='formattedId'
                type='text'
                pattern='[0-9]{3,6}'
                title='Minimo 3 digitos, solo numeros (ejem: 00514 o 009)'
                placeholder='095'
                label='Codigo'
                style={{ gridColumn: '1/2' }}
                minLength='3'
                regExp={/^\d{1,6}$/} />
            <DataInput
                value={value}
                name='routeName'
                type='text'
                pattern='[a-zA-Z -]{3,100}'
                title='Solo letras, espacios y guiones(-). Minimo 3 caracteres'
                placeholder='Piura'
                label='Ruta'
                minLength='3'
                regExp={/[a-zA-Z -]{1,100}/} />
            <DataInput
                value={value}
                name='driverFullName'
                type='text'
                pattern='[a-zA-Z ]{3,50}'
                title='Solo letras y espacios. Minimo 3 caracteres'
                placeholder='Lope'
                label='Conductor'
                minLength='3'
                regExp={/^[a-zA-Z ]{1,50}$/} />
            <DataInput
                value={value}
                name='truckTractorLicensePlate'
                type='text'
                pattern='[a-zA-Z0-9-]{3,7}'
                title='Solo numeros, letras y un guion(-). Minimo 3 caracteres'
                placeholder='AFX-124'
                label='Tracto'
                minLength='3'
                regExp={/^[a-zA-Z0-9]{0,3}(-[a-zA-Z0-9]{0,3})?$/} />
            <DataInput
                value={value}
                name='semiTrailerLicensePlate'
                type='text'
                pattern='[a-zA-Z0-9-]{3,7}'
                title='Solo numeros, letras y un guion(-). Minimo 3 caracteres'
                placeholder='FGT-511'
                label='Semiremolque'
                minLength='3'
                regExp={/^[a-zA-Z0-9]{0,3}(-[a-zA-Z0-9]{0,3})?$/} />
            <DropDownList
                name='selectClient'
                keyValueArray={clientDropDownListData}
                label='Cliente' />

            <DropDownList
                name='selectService'
                keyValueArray={serviceDropDownListData}
                label='Servicio' />
            <DropDownList
                name='selectTransport'
                keyValueArray={transportDropDownListData}
                label='Transportista' />
            <DataInput
                value={value}
                name='grt'
                type='text'
                title='Minimo 3 caracteres, solo numeros, guiones(-) y barras(/)'
                pattern='[0-9-/]{3,1000}'
                placeholder='010568'
                label='GRT'
                minLength='3'
                regExp={/^[0-9-/]{1,1000}$/} />
            <DataInput
                value={value}
                name='grr'
                type='text'
                title='Minimo 3 caracteres, solo numeros, guiones(-) y barras(/)'
                pattern='[0-9-/]{3,1000}'
                placeholder='0055154'
                label='GRR'
                minLength='3'
                regExp={/^[0-9-/]{1,1000}$/} />
            <DataInput
                value={value}
                type='date'
                title='Desde la fecha'
                label='Desde'
                name='dateFrom' />
            <DataInput
                value={value}
                type='date'
                title='Hasta la fecha'
                label='Hasta'
                name='dateTo' />
        </form>
    )
}

export default FreightSectionSearchBar