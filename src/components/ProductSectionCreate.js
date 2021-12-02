import SectionHeader from "./SectionHeader"
import ProductSectionInputs from "./ProductSectionInputs"
import SectionCRUDButtons from "./SectionCRUDButtons"
import { useState, useEffect, useRef } from "react"
import { Redirect } from "react-router"
import Product from '../models/Product'
import { v4 as uuid } from 'uuid'
import { postProduct } from '../services/product'
import './Section.css'

export default function ProductSectionCreate() {
    const [actionExecuted, setActionExecuted] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
    const isMounted = useRef(true)

    async function handleSubmit(e) {
        e.preventDefault()
        const product = new Product(
            uuid(),
            e.target.name.value.trim(),
            e.target.selectClient.value.trim(),
            e.target.observation.value.trim()
        )
        if (product.isValid()) {
            const isOk = window.confirm('¿Esta seguro de guardar?')
            if (isOk) {
                setIsLoading(true)
                const response = await postProduct(product)
                if (isMounted.current) {
                    if (response.ok) {
                        setIsLoading(false)
                        alert('Guardado correctamente')
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
        if (error) alert(error)
    }, [error])

    if (actionExecuted) {
        return (<Redirect push to='/productos' />)
    } else {
        return (
            <section className='section'>
                <SectionHeader title='Productos - Nuevo' isLoaderActive={isLoading} />
                <div className='section__content'>
                    <form className='section__form' onSubmit={handleSubmit}>
                        <ProductSectionInputs
                            disabled={false}
                            values={{}} />
                        <SectionCRUDButtons
                            operation='create'
                            redirectionPath='/productos' />
                    </form>
                </div>
            </section>
        )
    }
}