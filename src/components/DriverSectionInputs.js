import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import FileInput from './FileInput'
import { validFileType } from '../config'
import { useEffect, useState } from 'react'
import { getDataForDropDownList } from '../services/transport'
import React from 'react'

export default function DriverSectionInputs({ values, disabled }) {
    const [transportDropDownListData, setTransportDropDownListData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true
        getDataForDropDownList().then(response => {
            if (isMounted) {
                if (response.ok) {
                    setTransportDropDownListData(response.body)
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
        <React.Fragment>
            <DataInput
                type='text'
                pattern='^[a-zA-Z ]{3,50}$'
                title='Solo letras y espacios. Minimo 3 y maximo 50 caracteres'
                label='Nombres'
                placeholder='Diego'
                name='name'
                required='required'
                disabled={disabled}
                value={values.name}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z ]{3,50}$'
                title='Solo letras y espacios. Minimo 3 y maximo 50 caracteres'
                label='Apellidos'
                placeholder='Lope Loyola'
                name='lastname'
                required='required'
                disabled={disabled}
                value={values.lastname}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[0-9]{8}$'
                title='Solo numeros, 8 digitos'
                label='DNI'
                placeholder='05965489'
                name='dni'
                required='required'
                disabled={disabled}
                value={values.dni}
                regExp={/^\d{1,8}$/} />
            <FileInput
                path={values.dniImagePath || undefined}
                disabled={disabled}
                label='DNI Imagen'
                mime={validFileType.mime}
                name='dniImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision del DNI'
                label='DNI F.E.'
                name='dniDateStart'
                disabled={disabled}
                value={values.dniDateStart} />
            <DataInput
                type='date'
                title='Fecha de Vencimiento del DNI'
                label='DNI F.V.'
                name='dniDateEnd'
                disabled={disabled}
                value={values.dniDateEnd} />
            <DataInput
                type='text'
                pattern='^[qQ][0-9]{8}$'
                title='Letra Q y 8 numeros (ejem. Q25469875)'
                label='Licencia'
                placeholder='Q56854789'
                name='license'
                required='required'
                disabled={disabled}
                value={values.license}
                regExp={/^[qQ]\d{0,8}$/} />
            <FileInput
                path={values.licenseImagePath || undefined}
                disabled={disabled}
                label='Licencia Imagen'
                mime={validFileType.mime}
                name='licenseImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision de la licencia'
                label='Licencia F.E.'
                name='licenseDateStart'
                disabled={disabled}
                value={values.licenseDateStart} />
            <DataInput
                type='date'
                title='Fecha de vencimiento de la licencia'
                label='Licencia F.V.'
                name='licenseDateEnd'
                disabled={disabled}
                value={values.licenseDateEnd} />
            <FileInput
                path={values.contractImagePath || undefined}
                disabled={disabled}
                label='Contrato Imagen'
                mime={validFileType.mime}
                name='contractImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Ingreso en la empresa'
                label='Fecha Ingreso'
                name='dateStart'
                required='required'
                disabled={disabled}
                value={values.dateStart} />
            <DataInput
                type='date'
                title='Fecha de Salida de la empresa'
                label='Fecha Salida'
                name='dateEnd'
                disabled={disabled}
                value={values.dateEnd} />
            <DataInput
                type='text'
                pattern='^[0-9]{9}$'
                title='Solo numeros, 9 digitos'
                label='Celular'
                placeholder='985698258'
                name='cellphoneOne'
                required='required'
                disabled={disabled}
                value={values.cellphoneOne}
                regExp={/^\d{1,9}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{9}$'
                title='Solo numeros, 9 digitos'
                label='Celular Aux.'
                placeholder='958691251'
                name='cellphoneTwo'
                disabled={disabled}
                value={values.cellphoneTwo}
                regExp={/^\d{1,9}$/} />
            <DropDownList
                label='Transportista'
                name='selectTransport'
                required='required'
                keyValueArray={transportDropDownListData}
                value={values.transportId}
                disabled={disabled} />
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