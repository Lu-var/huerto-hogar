import { Link, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { usuariosRepositorio } from '../data/repositorios.js'

export default function AdminUsuarioDetalle() {
    const { id } = useParams()
    const usuario = usuariosRepositorio.obtenerPorId(id)

    if (!usuario) {
        return <ContenedorPagina><Alert variant="warning" role="alert">Usuario no encontrado.</Alert><Button as={Link} to="/admin/usuarios" variant="success">Volver a usuarios</Button></ContenedorPagina>
    }

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo={usuario.nombre} descripcion="Detalle administrativo de la cuenta." />
            <Card><Card.Body>
                <dl className="row mb-4">
                    <dt className="col-sm-3">Correo</dt><dd className="col-sm-9">{usuario.email}</dd>
                    <dt className="col-sm-3">Rol</dt><dd className="col-sm-9">{usuario.rol || 'cliente'}</dd>
                </dl>
                <Button as={Link} to={`/admin/usuarios/${id}/editar`} variant="success" className="me-2">Editar usuario</Button>
                <Button as={Link} to={`/admin/usuarios/${id}/historial`} variant="outline-info" className="me-2">Ver historial</Button>
                <Button as={Link} to="/admin/usuarios" variant="outline-secondary">Volver a usuarios</Button>
            </Card.Body></Card>
        </ContenedorPagina>
    )
}
