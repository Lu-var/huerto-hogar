import { Navigate, Outlet, useLocation } from 'react-router-dom'
import useSesion from '../hooks/usarSesion.js'

export default function ProteccionAdministracion() {
    const { sesion } = useSesion()
    const location = useLocation()

    if (!sesion) {
        return <Navigate to="/admin/iniciar-sesion" replace state={{ desde: location.pathname }} />
    }

    if (sesion.rol !== 'admin') {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}
