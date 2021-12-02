import React from 'react'
import { Link } from 'react-router-dom'
import ErrorImage from '../error.svg'
import './ErrorBoundary.css'

export default class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)
        this.state = { hasError: false }
    }

    static getDerivedStateFromError(error) {
        return { hasError: true }
    }

    render() {
        if (this.state.hasError) {
            return (
                <div className="error-boundary">
                    <div>
                        <img src={ErrorImage} width='256' height='256' alt='Ha ocurrido un error' />
                    </div>
                    <h2>Error</h2>
                    <p>Uuups! Algo salio mal. Vuelva a refrescar la pagina <Link to='/fletes'>o vuelva al modulo de inicio.</Link></p>
                    <p>Si el problema persiste contactate con el programador del sistema.</p>
                </div>
            )
        } else {
            return this.props.children
        }
    }
}