import DropDownList from './DropDownList'
import DataInput from './DataInput'
import { useState, useRef, useEffect } from 'react'
import { getDataForDropDownListByClient } from '../services/product'
import * as productTransportedServices from '../services/productTransported'
import ProductTransported from '../models/ProductTransported'
import { v4 as uuid } from 'uuid'
import './Button.css'

export default function FreightSectionMaintenanceProductTransported({ clientId, freightId }) {

    const [productDropDownListData, setProductDropDownListData] = useState([])
    const [transportedProducts, setTransportedProducts] = useState([])
    const [value, setValue] = useState(undefined)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)
    const selectProductRef = useRef(null)

    const rows = transportedProducts.map(productTransported => {
        return (
            <tr key={productTransported.id}>
                <td>
                    {productTransported.productName}
                </td>
                <td>
                    {productTransported.sku}
                </td>
                <td>
                    {productTransported.quantity}
                </td>
                <td>
                    {productTransported.observation}
                </td>
                <td>
                    <span
                        onClick={e => handleDeleteProductTransportedById(productTransported.id, e)}
                        className="fas fa-trash"
                        style={{ padding: '0 .35rem', cursor: 'pointer' }}></span>
                </td>
            </tr>
        )
    })

    const resetForm = (e) => {
        e.target.reset()
        setValue('')
        selectProductRef.current.focus()
    }

    const handleDeleteProductTransportedById = (id, e) => {
        productTransportedServices.deleteProductTransportedById(id)
            .then(response => {
                if (isMounted.current) {
                    if (response.ok) {
                        setTransportedProducts(transportedProducts.filter(
                            productTransported => id !== productTransported.id
                        ))
                    } else {
                        setError(response.message)
                    }
                }
            })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const newProductTransported = new ProductTransported(
            uuid(),
            e.target.selectProduct.value,
            freightId,
            e.target.quantity.value,
            e.target.sku.value,
            e.target.observation.value
        )
        if (newProductTransported.isValid()) {
            await productTransportedServices.postProductTransported(newProductTransported)
                .then(response => {
                    if (isMounted.current) {
                        if (response.ok) {
                            resetForm(e)
                            getTransportedProducts(freightId)
                        } else {
                            setError(response.message)
                        }
                    }
                })
        } else {
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    const getTransportedProducts = (freightId) => {
        if (freightId) {
            productTransportedServices.getTransportedProductsByFreight(freightId)
                .then(response => {
                    if (isMounted.current) {
                        if (response.ok) {
                            setTransportedProducts(response.body)
                        } else {
                            setError(response.message)
                        }
                    }
                })
        }
    }

    useEffect(() => {
        if (clientId) {
            getDataForDropDownListByClient(clientId)
                .then(response => {
                    if (isMounted.current) {
                        if (response.ok) {
                            setProductDropDownListData(response.body)
                        } else {
                            setError(response.message)
                        }
                    }
                })
        }
    }, [clientId])

    useEffect(() => {
        getTransportedProducts(freightId)
    }, [freightId])

    useEffect(() => {
        if (error) alert(error)
    }, [error])

    useEffect(() => {
        if (value === '') setValue(undefined)
    }, [value])

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <table className='section__table'>
                    <thead>
                        <tr>
                            <th>Producto</th>
                            <th>SKU</th>
                            <th>Cantidad</th>
                            <th>Observacion</th>
                            <th></th>
                        </tr>
                        <tr>
                            <td>
                                <DropDownList
                                    ref={selectProductRef}
                                    name='selectProduct'
                                    required='required'
                                    keyValueArray={productDropDownListData} />
                            </td>
                            <td>
                                <DataInput
                                    type='text'
                                    pattern='^[a-zA-Z0-9- ]{3,40}$'
                                    title='Solo numeros, letras y espacios. Minimo 3 caracteres'
                                    placeholder='HYG151H6'
                                    name='sku'
                                    minLength='3'
                                    required='required'
                                    regExp={/^[a-zA-Z0-9- ]{1,40}$/}
                                    value={value} />
                            </td>
                            <td>
                                <DataInput
                                    type='text'
                                    pattern='^[0-9]{1,25}$'
                                    title='Solo numeros'
                                    placeholder='1000'
                                    name='quantity'
                                    minLength='1'
                                    required='required'
                                    regExp={/^[0-9]{1,25}$/}
                                    value={value} />
                            </td>
                            <td>
                                <DataInput
                                    type='text'
                                    pattern='^.{3,100}$'
                                    title='Minimo 3 caracteres'
                                    placeholder='...'
                                    name='observation'
                                    value={value} />
                            </td>
                            <td>
                                <button type='submit' className='button button_color_primary'>+</button>
                            </td>
                        </tr>
                    </thead>
                    <tbody>
                        {rows}
                    </tbody>
                </table>
            </form>
        </div>
    )
}