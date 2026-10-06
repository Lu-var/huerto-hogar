import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { ordenesRepositorio, usuariosRepositorio } from '../data/repositorios.js'

export default function AdminUsuarioHistorial() {
    const { id } = useParams()
    const [historial, setHistorial] = useState([])
    const [usuario, setUsuario] = useState(null)
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                const usuarioEncontrado = usuariosRepositorio.obtenerPorId(id)
                if (!usuarioEncontrado) {
                    setEstado('no-encontrado')
                    return
                }
                setUsuario(usuarioEncontrado)
                setHistorial(ordenesRepositorio.obtenerTodos().filter((orden) => orden.usuarioId === id || orden.email === usuarioEncontrado.email))
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }, 0)
        return () => window.clearTimeout(temporizador)
    }, [id])

    if (estado === 'cargando') return <ContenedorPagina><Alert variant="info" role="status">Cargando historial...</Alert></ContenedorPagina>
    if (estado === 'error') return <ContenedorPagina><Alert variant="danger" role="alert">{error}</Alert></ContenedorPagina>
    if (estado === 'no-encontrado') return <ContenedorPagina><Alert variant="warning" role="alert">Usuario no encontrado.</Alert><Button as={Link} to="/admin/usuarios" variant="success">Volver a usuarios</Button></ContenedorPagina>

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo={`Historial de ${usuario.nombre}`} descripcion="Órdenes asociadas a la cuenta cuando la información está disponible." />
            {historial.length === 0 && <Alert variant="info" role="status">Este usuario todavía no tiene órdenes asociadas.</Alert>}
            {historial.length > 0 && <Table responsive striped bordered><thead><tr><th>Orden</th><th>Total</th><th>Estado</th></tr></thead><tbody>{historial.map((orden) => <tr key={orden.id}><td>{orden.id}</td><td>${Number(orden.total || 0).toLocaleString('es-CL')}</td><td>{orden.estado || 'Sin estado'}</td></tr>)}</tbody></Table>}
            <Button as={Link} to={`/admin/usuarios/${id}`} variant="outline-secondary">Volver al usuario</Button>
        </ContenedorPagina>
    )
}
