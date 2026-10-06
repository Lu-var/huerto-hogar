import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import Alert from 'react-bootstrap/Alert'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import ResumenOrden from './ResumenOrden.jsx'
import useCarrito from '../hooks/usarCarrito.js'
import { ordenesRepositorio } from '../data/repositorios.js'

export default function Checkout() {
    const navigate = useNavigate()
    const { carrito, total, vaciar } = useCarrito()
    const [formulario, setFormulario] = useState({
        direccion: '',
        entrega: '',
        pago: '',
    })
    const [error, setError] = useState('')

    function actualizarCampo(evento) {
        setFormulario((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))
        setError('')
    }

    function enviarFormulario(evento) {
        evento.preventDefault()

        if (!formulario.direccion.trim()) {
            setError('Ingresa una dirección de entrega.')
            return
        }

        if (!formulario.entrega) {
            setError('Selecciona una opción de entrega.')
            return
        }

        if (!formulario.pago) {
            setError('Selecciona el resultado del pago simulado.')
            return
        }

        if (formulario.pago === 'rechazado') {
            navigate('/checkout/pago-error')
            return
        }

        const numeroOrden = `HH-${Date.now()}`
        ordenesRepositorio.crear({
            id: numeroOrden,
            productos: carrito,
            total,
            direccion: formulario.direccion.trim(),
            entrega: formulario.entrega,
            estado: 'pagada',
        })
        vaciar()
        navigate(`/checkout/pago-correcto?orden=${numeroOrden}`)
    }

    if (carrito.length === 0) {
        return (
            <ContenedorPagina>
                <Alert variant="info" role="status">
                    <Alert.Heading>Tu carrito está vacío</Alert.Heading>
                    Agrega productos antes de iniciar el checkout.
                </Alert>
                <Button as={Link} to="/productos" variant="success">Ver productos</Button>
            </ContenedorPagina>
        )
    }

    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Checkout"
                descripcion="Completa tus datos para preparar una orden de demostración."
            />
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="g-4">
                <Col lg={7}>
                    <Card>
                        <Card.Body>
                            <Card.Title>Datos de entrega y pago</Card.Title>
                            <Card.Text className="text-muted">
                                El pago es simulado y no solicita datos bancarios reales.
                            </Card.Text>
                            <Form onSubmit={enviarFormulario}>
                                <Form.Group className="mb-3" controlId="direccion">
                                    <Form.Label>Dirección de entrega</Form.Label>
                                    <Form.Control
                                        name="direccion"
                                        value={formulario.direccion}
                                        onChange={actualizarCampo}
                                        placeholder="Ejemplo: Avenida Principal 123"
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="entrega">
                                    <Form.Label>Opción de entrega</Form.Label>
                                    <Form.Select name="entrega" value={formulario.entrega} onChange={actualizarCampo}>
                                        <option value="">Selecciona una opción</option>
                                        <option value="domicilio">Despacho a domicilio</option>
                                        <option value="retiro">Retiro coordinado</option>
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="mb-4" controlId="pago">
                                    <Form.Label>Resultado del pago simulado</Form.Label>
                                    <Form.Select name="pago" value={formulario.pago} onChange={actualizarCampo}>
                                        <option value="">Selecciona un resultado</option>
                                        <option value="aprobado">Pago aprobado</option>
                                        <option value="rechazado">Pago rechazado</option>
                                    </Form.Select>
                                </Form.Group>
                                <Button type="submit" variant="success">Confirmar pedido</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
                <Col lg={5}>
                    <ResumenOrden carrito={carrito} total={total} />
                </Col>
            </Row>
        </ContenedorPagina>
    )
}
