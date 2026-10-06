import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ListGroup from 'react-bootstrap/ListGroup'
import Stack from 'react-bootstrap/Stack'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { ordenesRepositorio } from '../data/repositorios.js'

const estadosPermitidos = ['pagada', 'preparada', 'enviada', 'entregada', 'cancelada']

function totalProducto(producto) {
    return (Number(producto.precio) || 0) * (Number(producto.cantidad) || 0)
}

export default function AdminDetalleOrden() {
    const { id } = useParams()
    const [orden, setOrden] = useState(null)
    const [estado, setEstado] = useState('cargando')
    const [nuevoEstado, setNuevoEstado] = useState('')
    const [error, setError] = useState('')
    const [mensaje, setMensaje] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                const ordenEncontrada = ordenesRepositorio.obtenerPorId(id)
                if (!ordenEncontrada) {
                    setEstado('no-encontrada')
                    return
                }
                setOrden(ordenEncontrada)
                setNuevoEstado(ordenEncontrada.estado || 'pagada')
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }, 0)

        return () => window.clearTimeout(temporizador)
    }, [id])

    function actualizarEstado(evento) {
        setNuevoEstado(evento.target.value)
        setMensaje('')
    }

    function guardarEstado(evento) {
        evento.preventDefault()
        try {
            const ordenActualizada = ordenesRepositorio.actualizar(id, { estado: nuevoEstado })
            setOrden(ordenActualizada)
            setMensaje('El estado de la orden fue actualizado.')
            setError('')
        } catch (errorActualizacion) {
            setError(errorActualizacion.message)
        }
    }

    function imprimirBoleta() {
        window.print()
    }

    if (estado === 'cargando') {
        return <ContenedorPagina><Alert variant="info" role="status">Cargando orden...</Alert></ContenedorPagina>
    }

    if (estado === 'error') {
        return <ContenedorPagina><Alert variant="danger" role="alert">{error}</Alert></ContenedorPagina>
    }

    if (estado === 'no-encontrada') {
        return (
            <ContenedorPagina>
                <Alert variant="warning" role="alert">
                    <Alert.Heading>Orden no encontrada</Alert.Heading>
                    No existe una orden con el identificador solicitado.
                </Alert>
                <Button as={Link} to="/admin/ordenes" variant="success">Volver a órdenes</Button>
            </ContenedorPagina>
        )
    }

    return (
        <ContenedorPagina>
            <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
                <EncabezadoSeccion
                    titulo={`Orden ${orden.id}`}
                    descripcion="Detalle de productos, entrega y estado de la orden."
                />
                <Button variant="outline-secondary" onClick={imprimirBoleta}>Imprimir boleta</Button>
            </div>
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            {mensaje && <Alert variant="success" role="status">{mensaje}</Alert>}
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Datos de la orden</Card.Title>
                    <dl className="row mb-0">
                        <dt className="col-sm-3">Dirección</dt>
                        <dd className="col-sm-9">{orden.direccion || 'No informada'}</dd>
                        <dt className="col-sm-3">Entrega</dt>
                        <dd className="col-sm-9">{orden.entrega || 'No informada'}</dd>
                        <dt className="col-sm-3">Total</dt>
                        <dd className="col-sm-9">${Number(orden.total || 0).toLocaleString('es-CL')}</dd>
                    </dl>
                </Card.Body>
            </Card>
            <Card className="mb-4">
                <Card.Body>
                    <Card.Title>Productos</Card.Title>
                    <ListGroup variant="flush">
                        {(orden.productos || []).map((producto) => (
                            <ListGroup.Item key={producto.id} className="d-flex justify-content-between px-0">
                                <span>{producto.nombre} x {producto.cantidad}</span>
                                <strong>${totalProducto(producto).toLocaleString('es-CL')}</strong>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Card.Body>
            </Card>
            <Card>
                <Card.Body>
                    <Card.Title>Actualizar estado</Card.Title>
                    <Form onSubmit={guardarEstado}>
                        <Form.Group className="mb-3" controlId="estado-orden">
                            <Form.Label>Estado de la orden</Form.Label>
                            <Form.Select value={nuevoEstado} onChange={actualizarEstado}>
                                {estadosPermitidos.map((opcion) => (
                                    <option key={opcion} value={opcion}>{opcion.charAt(0).toUpperCase() + opcion.slice(1)}</option>
                                ))}
                            </Form.Select>
                        </Form.Group>
                        <Stack direction="horizontal" gap={2}>
                            <Button type="submit" variant="success">Guardar estado</Button>
                            <Button as={Link} to="/admin/ordenes" variant="outline-secondary">Volver a órdenes</Button>
                        </Stack>
                    </Form>
                </Card.Body>
            </Card>
        </ContenedorPagina>
    )
}
