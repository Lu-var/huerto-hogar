import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { usuariosRepositorio } from '../data/repositorios.js'

export default function AdminUsuarios() {
    const [usuarios, setUsuarios] = useState([])
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    function cargar() {
        try {
            setUsuarios(usuariosRepositorio.obtenerTodos())
            setEstado('listo')
        } catch (errorLectura) {
            setError(errorLectura.message)
            setEstado('error')
        }
    }

    useEffect(() => {
        const temporizador = window.setTimeout(cargar, 0)
        return () => window.clearTimeout(temporizador)
    }, [])

    function eliminar(usuario) {
        if (!window.confirm(`¿Eliminar la cuenta de ${usuario.nombre}?`)) return
        try {
            usuariosRepositorio.eliminar(usuario.id)
            cargar()
        } catch (errorEliminacion) {
            setError(errorEliminacion.message)
            setEstado('error')
        }
    }

    return (
        <ContenedorPagina>
            <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
                <EncabezadoSeccion titulo="Usuarios" descripcion="Gestiona cuentas y roles de la persistencia local." />
                <Button as={Link} to="/admin/usuarios/nuevo" variant="success">Nuevo usuario</Button>
            </div>
            {estado === 'cargando' && <Alert variant="info" role="status">Cargando usuarios...</Alert>}
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            {estado === 'listo' && usuarios.length === 0 && <Alert variant="info" role="status">No hay usuarios registrados.</Alert>}
            {estado === 'listo' && usuarios.length > 0 && (
                <Table responsive striped bordered hover>
                    <thead><tr><th>Nombre</th><th>Correo</th><th>Rol</th><th>Acciones</th></tr></thead>
                    <tbody>{usuarios.map((usuario) => (
                        <tr key={usuario.id}>
                            <td>{usuario.nombre}</td><td>{usuario.email}</td><td>{usuario.rol || 'cliente'}</td>
                            <td><div className="d-flex flex-wrap gap-2">
                                <Button as={Link} to={`/admin/usuarios/${usuario.id}`} variant="outline-success" size="sm">Ver</Button>
                                <Button as={Link} to={`/admin/usuarios/${usuario.id}/editar`} variant="outline-secondary" size="sm">Editar</Button>
                                <Button as={Link} to={`/admin/usuarios/${usuario.id}/historial`} variant="outline-info" size="sm">Historial</Button>
                                <Button variant="outline-danger" size="sm" onClick={() => eliminar(usuario)}>Eliminar</Button>
                            </div></td>
                        </tr>
                    ))}</tbody>
                </Table>
            )}
        </ContenedorPagina>
    )
}
