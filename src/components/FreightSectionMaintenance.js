import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Freight from '../models/Freight'
import * as freightServices from '../services/freight'
import SectionHeader from './SectionHeader'
import FreightSectionInputs from './FreightSectionInputs'
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs'
import FreightSectionMaintenanceProductTransported from './FreightSectionMaintenanceProductTransported'
import 'react-tabs/style/react-tabs.css'
import './Section.css'

export default function FreightSectionMaintenance() {
    const { id } = useParams()
    const [freight, setFreight] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const isok = window.confirm('¿Esta seguro de eliminar?')
        if (isok) {
            setIsLoading(true)
            const response = await freightServices.deleteFreight(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    alert('Eliminado correctamente')
                    setActionExecuted(true)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        }
    }

    function handleClickEdit() {
        setDisabled(false)
    }

    async function handleSubmitToUpdate(e) {
        e.preventDefault()
        const newFreight = new Freight(
            id,
            e.target.dateStart.value,
            e.target.dateEnd.value,
            e.target.grt.value,
            e.target.grr.value,
            e.target.ton.value,
            e.target.pallet.value,
            e.target.selectRoute.value,
            e.target.selectUnit.value,
            e.target.selectDriver.value,
            e.target.selectTransport.value,
            e.target.selectClient.value,
            e.target.selectService.value,
            e.target.observation.value)
        if (newFreight.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await freightServices.putFreight(newFreight)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Actualizado correctamente')
                        setActionExecuted(true)
                    } else {
                        setIsLoading(false)
                        setError(response.message)
                    }
                }
            }
        } else {
            alert(`Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo`)
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            const response = await freightServices.getFreightById(id)
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setFreight(response.body)
                } else {
                    setIsLoading(false)
                    setError(response.message)
                }
            }
        }())
    }, [id])


    useEffect(() => {
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/fletes' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Viaje ${freight ? '- ' + freight.formattedId : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>

                    <Tabs>
                        <TabList>
                            <Tab>
                                <h3>Principal</h3>
                            </Tab>
                            <Tab>
                                <h3>Productos</h3>
                            </Tab>
                        </TabList>

                        <TabPanel>
                            <form className='section__form' onSubmit={handleSubmitToUpdate}>
                                <FreightSectionInputs
                                    disabled={disabled}
                                    values={freight || {}} />
                                <SectionCRUDButtons
                                    redirectionPath='/fletes'
                                    operation='update-delete'
                                    onDelete={handleClickDelete}
                                    onEdit={handleClickEdit} />
                            </form>
                        </TabPanel>
                        <TabPanel>
                            <FreightSectionMaintenanceProductTransported
                                freightId={freight && freight.id}
                                clientId={freight && freight.clientId} />
                        </TabPanel>
                    </Tabs>

                </div>
            </section>
        )
    }
}