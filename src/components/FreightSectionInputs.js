import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { useEffect, useState, useRef } from 'react'
import React from 'react'
import { getDataForDropDownList as getDataForTransportDropDownList } from '../services/transport'
import { getDataForDropDownList as getDataForClientDropDownList } from '../services/client'
import { getDataForDropDownList as getDataForServiceDropDownList } from '../services/service'
import { getDataForDropDownList as getDataForUnitDropDownList } from '../services/unit'
import { getDataForDropDownList as getDataForDriverDropDownList } from '../services/driver'
import { getDataForDropDownList as getDataForRouteDropDownList } from '../services/route'

function FreightSectionInputs({ values, disabled }) {

    const [clientDropDownListData, setClientDropDownListData] = useState([])
    const [serviceDropDownListData, setServiceDropDownListData] = useState([])
    const [transportDropDownListData, setTransportDropDownListData] = useState([])
    const [unitDropDownListData, setUnitDropDownListData] = useState([])
    const [driverDropDownListData, setDriverDropDownListData] = useState([])
    const [routeDropDownListData, setRouteDropDownListData] = useState([])
    const [selectUnitDisabled, setSelectUnitDisabled] = useState(true)
    const [selectDriverDisabled, setSelectDriverDisabled] = useState(true)
    const [selectRouteDisabled, setSelectRouteDisabled] = useState(true)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleClientChange(e) {
        const clientId = e.target.value
        if (selectRouteDisabled) setSelectRouteDisabled(false)
        await loadDataFromRouteDropdownlist(clientId)
    }

    async function loadDataFromRouteDropdownlist(clientId) {
        const response = await getDataForRouteDropDownList(clientId)
        if (isMounted.current) {
            if (response.ok) {
                setRouteDropDownListData(response.body)
            } else {
                setError(response.message)
            }
        }
    }

    async function handleTransportChange(e) {
        const transportId = e.target.value
        if (selectUnitDisabled) setSelectUnitDisabled(false)
        if (selectDriverDisabled) setSelectDriverDisabled(false)
        await loadDataFromDriversAndUnitsDropDownList(transportId)
    }

    async function loadDataFromDriversAndUnitsDropDownList(transportId) {

        const responseForDriver = await getDataForDriverDropDownList(transportId)
        const responseForUnit = await getDataForUnitDropDownList(transportId)

        if (isMounted.current) {
            if (responseForDriver.ok) {
                setDriverDropDownListData(responseForDriver.body)
            } else {
                setError(responseForDriver.message)
            }

            if (responseForUnit.ok) {
                setUnitDropDownListData(responseForUnit.body)
            } else {
                setError(responseForUnit.message)
            }
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        const loadDropDownLists = async () => {
            const responseForClient = await getDataForClientDropDownList()
            const responseForService = await getDataForServiceDropDownList()
            const responseForTransport = await getDataForTransportDropDownList()

            if (isMounted.current) {
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
    }, [])

    useEffect(() => {
        //when an real object is sent (freight), child dropdownlists are loaded
        (async function () {
            if (values.id) {
                await loadDataFromRouteDropdownlist(values.clientId)
                await loadDataFromDriversAndUnitsDropDownList(values.transportId)
            }
        }())
    }, [values])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    return (
        <React.Fragment>
            <DataInput
                type='date'
                title='Fecha de inicio del Flete'
                label='Fecha Inicio'
                name='dateStart'
                required='required'
                disabled={disabled}
                value={values.dateStart} />
            <DataInput
                type='date'
                title='Fecha de termino del Flete'
                label='Fecha Termino'
                name='dateEnd'
                disabled={disabled}
                value={values.dateEnd} />
            <DropDownList
                label='Cliente'
                name='selectClient'
                required='required'
                keyValueArray={clientDropDownListData}
                value={values.clientId}
                disabled={disabled}
                onChange={handleClientChange} />
            <DropDownList
                label='Ruta'
                name='selectRoute'
                required='required'
                keyValueArray={routeDropDownListData}
                value={values.routeId}
                disabled={values.id ? disabled : selectRouteDisabled} />
            <DropDownList
                label='Transportista'
                name='selectTransport'
                required='required'
                keyValueArray={transportDropDownListData}
                value={values.transportId}
                disabled={disabled}
                onChange={handleTransportChange} />
            <DropDownList
                label='Conductor'
                name='selectDriver'
                required='required'
                keyValueArray={driverDropDownListData}
                value={values.driverId}
                disabled={values.id ? disabled : selectDriverDisabled} />
            <DropDownList
                label='Tracto'
                name='selectTruckTractor'
                required='required'
                keyValueArray={unitDropDownListData}
                value={values.truckTractorId}
                disabled={values.id ? disabled : selectUnitDisabled} />
            <DropDownList
                label='Semiremolque'
                name='selectSemiTrailer'
                required='required'
                keyValueArray={unitDropDownListData}
                value={values.semiTrailerId}
                disabled={values.id ? disabled : selectUnitDisabled} />
            <DropDownList
                label='Servicio'
                name='selectService'
                required='required'
                keyValueArray={serviceDropDownListData}
                value={values.serviceId}
                disabled={disabled} />
            <DataInput
                type='text'
                pattern='^[0-9-/]{3,1000}$'
                title='Solo numeros, guiones(-) y barras(/). Minimo 3 caracteres'
                label='GRT'
                placeholder='001-0234151'
                name='grt'
                disabled={disabled}
                value={values.grt}
                minLength='3'
                regExp={/^[0-9-/]{1,1000}$/} />
            <DataInput
                type='text'
                pattern='^[0-9-/]{3,1000}$'
                title='Solo numeros, guiones(-) y barras(/). Minimo 3 caracteres'
                label='GRR'
                placeholder='001-0234151'
                name='grr'
                disabled={disabled}
                value={values.grr}
                minLength='3'
                regExp={/^[0-9-/]{1,1000}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,2})?$'
                title='Numero menor a 100 y maximo dos decimales (ejem: 25 o 25.44)'
                label='Toneladas'
                placeholder='25.55'
                name='ton'
                disabled={disabled}
                value={values.ton}
                regExp={/^\d{1,2}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}$'
                title='Numero menor a 100'
                label='Pallets'
                placeholder='33'
                name='pallet'
                disabled={disabled}
                value={values.pallet}
                regExp={/^\d{1,2}$/} />

            <TextArea
                label='Observaciones'
                maxLength='1000'
                minLength='3'
                style={{ gridColumn: '1/5' }}
                placeholder='Solicitar documentos'
                name='observation'
                rows='10'
                value={values.observation}
                disabled={disabled} />

        </React.Fragment>
    )
}

export default FreightSectionInputs