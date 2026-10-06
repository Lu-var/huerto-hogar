import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { ordenesRepositorio } from '../data/repositorios.js'

const variantesEstado = {
    pagada: 'success',
    preparada: 'info',
    enviada: 'primary',
    entregada: 'secondary',
    cancelada: 'danger',
}

function formatearEstado(estado) {
    return estado ? estado.charAt(0).toUpperCase() + estado.slice(1) : 'Sin estado'
}

export default function AdminOrdenes() {
    const [ordenes, setOrdenes] = useState([])
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                setOrdenes(ordenesRepositorio.obtenerTodos())
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }, 0)

        return () => window.clearTimeout(temporizador)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Órdenes y boletas"
                descripcion="Consulta las órdenes creadas desde el checkout y revisa su resumen."
            />
            {estado === 'cargando' && <Alert variant="info" role="status">Cargando órdenes...</Alert>}
            {estado === 'error' && <Alert variant="danger" role="alert">{error}</Alert>}
            {estado === 'listo' && ordenes.length === 0 && (
                <Alert variant="info" role="status">Todavía no hay órdenes registradas.</Alert>
            )}
            {estado === 'listo' && ordenes.length > 0 && (
                <Table responsive striped bordered hover>
                    <thead>
                        <tr>
                            <th>Orden</th>
                            <th>Entrega</th>
                            <th>Total</th>
                            <th>Estado</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {ordenes.map((orden) => (
                            <tr key={orden.id}>
                                <td>{orden.id}</td>
                                <td>{orden.entrega || 'No informada'}</td>
                                <td>${Number(orden.total || 0).toLocaleString('es-CL')}</td>
                                <td>
                                    <Badge bg={variantesEstado[orden.estado] || 'dark'}>
                                        {formatearEstado(orden.estado)}
                                    </Badge>
                                </td>
                                <td>
                                    <Button as={Link} to={`/admin/ordenes/${orden.id}`} variant="outline-success" size="sm">
                                        Revisar orden
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </ContenedorPagina>
    )
}
