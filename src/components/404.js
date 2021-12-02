import { Link } from 'react-router-dom'
import NotFoundImg from '../not-found.png'
import './404.css'
export default function NotFound() {
    return (
        <div className="not-found">
            <div className="not-found__content">
                <div>
                    <img src={NotFoundImg} width='256' height='256' alt='not found' />
                </div>
                <p>Recurso no encontrado, vuelva a ingresar al <Link to='/fletes'>modulo de inicio</Link> </p>
            </div>
        </div>
    )
}