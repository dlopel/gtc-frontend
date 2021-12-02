import React from 'react'
import './Logo.css'
import FrontalTruck from '../frontal-truck.png'

export default function Logo() {
    return (
        <h1 className="logo">
            <div>
                <img src={FrontalTruck} width='48' height='48' alt="GTC" />
            </div>
            <div className="logo__text">
                <span className="logo__abbr">GTC</span>
                <span className="logo__definition">Gestor del Transporte de Carga</span>
            </div>
        </h1>
    )
}