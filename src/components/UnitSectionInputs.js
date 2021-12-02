import DropDownList from './DropDownList'
import DataInput from './DataInput'
import TextArea from './TextArea'
import { useEffect, useState } from 'react'
import { getDataForDropDownList as getTransportDataForDropDownList } from '../services/transport'
import { getDataForDropDownList as getPolicyDataForDropDownList } from '../services/policy'
import React from 'react'
import FileInput from './FileInput'
import { validFileType } from '../config'

export default function UnitSectionInputs({ values, disabled }) {
    const [transportDropDownListData, setTransportDropDownListData] = useState([])
    const [policyDropDownListData, setPolicyDropDownListData] = useState([])
    const [error, setError] = useState(null)

    useEffect(() => {
        let isMounted = true
        const loadDropDownLists = async () => {
            const transportResponse = await getTransportDataForDropDownList()
            const policyResponse = await getPolicyDataForDropDownList()

            if (isMounted) {
                if (transportResponse.ok) {
                    setTransportDropDownListData(transportResponse.body)
                } else {
                    setError(transportResponse.message)
                }

                if (policyResponse.ok) {
                    setPolicyDropDownListData(policyResponse.body)
                } else {
                    setError(policyResponse.message)
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
        <React.Fragment>
            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9]{3}-[a-zA-Z0-9]{3}$'
                title='Solo en formato placa (ejem: AXG-854)'
                label='Placa'
                placeholder='AXF-919'
                name='licensePlate'
                required='required'
                disabled={disabled}
                value={values.licensePlate}
                regExp={/^[a-zA-Z0-9]{1,3}(-[a-zA-Z0-9]{0,3})?$/} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z]{3,25}$'
                title='Solo letras, minimo 3 y maximo 25 caracteres'
                label='Marca'
                placeholder='VOLVO'
                name='brand'
                required='required'
                disabled={disabled}
                value={values.brand}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z ]{3,25}$'
                title='Solo letras y espacios, minimo 3 y maximo 25 caracteres'
                label='Color'
                placeholder='Azul'
                name='color'
                required='required'
                disabled={disabled}
                value={values.color}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z]{3,25}$'
                title='Solo letras, minimo 3 y maximo 25 caracteres'
                label='Carroceria'
                placeholder='Camabaja'
                name='bodyType'
                required='required'
                disabled={disabled}
                value={values.bodyType}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DropDownList
                label='Transportista'
                name='selectTransport'
                required='required'
                keyValueArray={transportDropDownListData}
                value={values.transportId}
                disabled={disabled} />

            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9- ]{3,25}$'
                title='Solo letras, numeros, guiones(-) y espacios, minimo 3 y maximo 25 caracteres'
                label='Modelo'
                placeholder='FH 6X4 T'
                name='model'
                disabled={disabled}
                value={values.model}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9- ]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DropDownList
                label='Poliza'
                name='selectPolicy'
                keyValueArray={policyDropDownListData}
                value={values.policyId}
                disabled={disabled} />
            <DataInput
                type='text'
                pattern='^[0-9]{4}$'
                title='Un numero como 2010'
                label='Año'
                placeholder='2010'
                name='year'
                disabled={disabled}
                value={values.year}
                regExp={/^\d{1,4}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,2})?$'
                title='Numero menor a 100 y dos decimales maximo (ejem: 14.25 o 13)'
                label='Largo'
                placeholder='14.25'
                name='length'
                disabled={disabled}
                value={values.length}
                regExp={/^\d{1,2}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,2})?$'
                title='Numero menor a 100 y dos decimales maximo (ejem. 3.25 o 3)'
                label='Alto'
                placeholder='3.15'
                name='height'
                disabled={disabled}
                value={values.height}
                regExp={/^\d{1,2}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,2})?$'
                title='Numero menor a 100 y dos decimales maximo (ejem. 2.25 o 2)'
                label='Ancho'
                placeholder='2.55'
                name='width'
                disabled={disabled}
                value={values.width}
                regExp={/^\d{1,2}(\.\d{0,2})?$/} />
            <DataInput
                type='text'
                title='Numero menor a 100 y tres decimales maximo (ejem. 19.254 o 19)'
                pattern='^[0-9]{1,2}(\.[0-9]{1,3})?$'
                label='Peso Seco'
                placeholder='8.155'
                name='dryWeight'
                disabled={disabled}
                value={values.dryWeight}
                regExp={/^\d{1,2}(\.\d{0,3})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,3})?$'
                title='Numero menor a 100 y tres decimales maximo (ejem. 33.254 o 33)'
                label='Peso Bruto'
                placeholder='33.155'
                name='grossWeight'
                disabled={disabled}
                value={values.grossWeight}
                regExp={/^\d{1,2}(\.\d{0,3})?$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}(\.[0-9]{1,3})?$'
                title='Numero menor a 100 y tres decimales maximo (ejem. 25.254 o 25)'
                label='Carga Util'
                placeholder='25.555'
                name='usefulLoad'
                disabled={disabled}
                value={values.usefulLoad}
                regExp={/^\d{1,2}(\.\d{0,3})?$/} />


            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9]{3,25}$'
                title='Solo letras y numeros de 3 hasta 25 caracteres'
                label='Numero de Motor'
                placeholder='D13456233'
                name='engineNumber'
                disabled={disabled}
                value={values.engineNumber}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[a-zA-Z0-9]{3,25}$'
                title='Solo letras y numeros de 3 hasta 25 caracteres'
                label='Numero de Chasis'
                placeholder='YV2AS02D7EB686117'
                name='chassisNumber'
                disabled={disabled}
                value={values.chassisNumber}
                onKeyPress={(e) => {
                    if (!/[a-zA-Z0-9]/.test(e.key)) {
                        e.preventDefault()
                    }
                }} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}$'
                title='Un numero de maximo dos digitos (ejem: 6)'
                label='N° Cilindros'
                placeholder='6'
                name='numberCylinders'
                disabled={disabled}
                value={values.numberCylinders}
                regExp={/^\d{1,2}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}$'
                title='Un numero maximo de 2 digistos (ejem. 12)'
                label='N° Ejes'
                placeholder='3'
                name='numberAxles'
                disabled={disabled}
                value={values.numberAxles}
                regExp={/^\d{1,2}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1,2}$'
                title='Un numero maximo de dos digitos (ejem. 12)'
                label='N° Neumaticos'
                placeholder='10'
                name='numberTires'
                disabled={disabled}
                value={values.numberTires}
                regExp={/^\d{1,2}$/} />
            <DataInput
                type='text'
                pattern='^[0-9]{1}$'
                title='Un numero maximo de un digito (ejem. 2)'
                label='N° Asientos'
                placeholder='2'
                name='numberSeats'
                disabled={disabled}
                value={values.numberSeats}
                regExp={/^\d{1}$/} />

            <FileInput
                path={values.technicalReviewImagePath || undefined}
                disabled={disabled}
                label='Revision Tec. Imagen'
                mime={validFileType.mime}
                name='technicalReviewImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision de la RT'
                label='Revision Tec. F.E.'
                name='technicalReviewDateStart'
                disabled={disabled}
                value={values.technicalReviewDateStart} />
            <DataInput
                type='date'
                title='Fecha de Vencimiento de la RT'
                label='Revision Tec. F.V.'
                name='technicalReviewDateEnd'
                disabled={disabled}
                value={values.technicalReviewDateEnd} />
            <FileInput
                path={values.mtcImagePath || undefined}
                disabled={disabled}
                label='MTC Imagen'
                mime={validFileType.mime}
                name='mtcImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision del MTC'
                label='MTC F.E.'
                name='mtcDateStart'
                disabled={disabled}
                value={values.mtcDateStart} />
            <DataInput
                type='date'
                title='Fecha de Vencimiento del MTC'
                label='MTC F.V.'
                name='mtcDateEnd'
                disabled={disabled}
                value={values.mtcDateEnd} />
            <FileInput
                path={values.propertyCardImagePath || undefined}
                disabled={disabled}
                label='Tarjeta Prop. Imagen'
                mime={validFileType.mime}
                name='propertyCardImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision de la Tarjeta Prop.'
                label='Tarjeta Prop. F.E.'
                name='propertyCardDateStart'
                disabled={disabled}
                value={values.propertyCardDateStart} />
            <DataInput
                type='date'
                title='Fecha de Vencimiento de la Tarjeta Prop.'
                label='Tarjeta Prop F.V.'
                name='propertyCardDateEnd'
                disabled={disabled}
                value={values.propertyCardDateEnd} />
            <FileInput
                path={values.soatImagePath || undefined}
                disabled={disabled}
                label='SOAT Imagen'
                mime={validFileType.mime}
                name='soatImage'
                tooltipMessage='Solo formato PDF y maximo 1MB'
                accept='.pdf'
                maxSize={validFileType.size} />
            <DataInput
                type='date'
                title='Fecha de Emision del SOAT'
                label='SOAT F.E.'
                name='soatDateStart'
                disabled={disabled}
                value={values.soatDateStart} />
            <DataInput
                type='date'
                title='Fecha de Vencimiento del SOAT'
                label='SOAT F.V.'
                name='soatDateEnd'
                disabled={disabled}
                value={values.soatDateEnd} />

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