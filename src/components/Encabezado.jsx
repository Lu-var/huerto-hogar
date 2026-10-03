import { Link } from 'react-router-dom'

export default function Encabezado() {
    return (
        <header>
            <h1>HuertoHogar</h1>

            <nav>
                <Link to="/">Inicio</Link>
                <Link to="/productos">Productos</Link>
                <Link to="/nosotros">Nosotros</Link>
                <Link to="/contacto">Contacto</Link>
            </nav>
        </header>
    )
}