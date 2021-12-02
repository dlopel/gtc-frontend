import SectionHeader from './SectionHeader'
import ProductSectionInputs from './ProductSectionInputs'
import SectionCRUDButtons from './SectionCRUDButtons'
import { useState, useEffect, useRef } from 'react'
import { Redirect, useParams } from 'react-router-dom'
import Product from '../models/Product'
import * as productServices from '../services/product'
import './Section.css'

export default function ProductSectionMaintenance() {
    const { id } = useParams()
    const [product, setProduct] = useState(null)
    const [disabled, setDisabled] = useState(true)
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(false)
    const [actionExecuted, setActionExecuted] = useState(false)
    const isMounted = useRef(true)

    async function handleClickDelete() {
        const response = window.confirm('¿Esta seguro de eliminar?')
        if (response) {
            setIsLoading(true)
            const response = await productServices.deleteProductById(id)
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
        const product = new Product(
            id,
            e.target.name.value.trim(),
            e.target.selectClient.value.trim(),
            e.target.observation.value.trim()
        )
        if (product.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await productServices.putProduct(product)
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
            alert('Datos Invalidos o Faltan Datos. Refresque la pagina y vuelva a intentarlo')
        }
    }

    useEffect(() => {
        return () => isMounted.current = false
    }, [])

    useEffect(() => {
        (async function () {
            setIsLoading(true)
            const response = await productServices.getProductById(id)
            
            if (isMounted.current) {
                if (response.ok) {
                    setIsLoading(false)
                    setProduct(response.body)
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
        return (<Redirect push to='/productos' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader
                    title={`Producto ${product ? '- ' + product.name : ''}`}
                    isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmitToUpdate}>
                        <ProductSectionInputs
                            disabled={disabled}
                            values={product || {}} />
                        <SectionCRUDButtons
                            redirectionPath='/productos'
                            operation='update-delete'
                            onDelete={handleClickDelete}
                            onEdit={handleClickEdit} />
                    </form>
                </div>
            </section>
        )
    }
}