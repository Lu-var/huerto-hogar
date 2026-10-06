import { Outlet } from 'react-router-dom'
import Encabezado from './Encabezado.jsx'
import PiePagina from './PiePagina.jsx'

export default function DiseñoAplicacion() {
    return (
        <div className="d-flex min-vh-100 flex-column">
            <Encabezado />
            <main className="flex-grow-1">
                <Outlet />
            </main>
            <PiePagina />
        </div>
    )
}
