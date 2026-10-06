import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import useSesion from '../hooks/usarSesion.js'

export default function AdminPerfil() {
    const { sesion } = useSesion()
    if (!sesion) return <ContenedorPagina><Alert variant="warning" role="alert">No hay una sesión administrativa activa.</Alert></ContenedorPagina>
    return <ContenedorPagina><EncabezadoSeccion titulo="Perfil administrativo" descripcion="Información de la sesión activa en este navegador." /><Card><Card.Body><dl className="row mb-4"><dt className="col-sm-3">Nombre</dt><dd className="col-sm-9">{sesion.nombre}</dd><dt className="col-sm-3">Correo</dt><dd className="col-sm-9">{sesion.email}</dd><dt className="col-sm-3">Rol</dt><dd className="col-sm-9">{sesion.rol || 'admin'}</dd></dl><Button as={Link} to="/admin" variant="outline-secondary">Volver al dashboard</Button></Card.Body></Card></ContenedorPagina>
}
