import Card from 'react-bootstrap/Card'
import ListGroup from 'react-bootstrap/ListGroup'

export default function ResumenOrden({ carrito, total }) {
    return (
        <Card>
            <Card.Body>
                <Card.Title>Resumen de tu orden</Card.Title>
                <ListGroup variant="flush">
                    {carrito.map((producto) => (
                        <ListGroup.Item key={producto.id} className="px-0 d-flex justify-content-between">
                            <span>{producto.nombre} x {producto.cantidad}</span>
                            <strong>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</strong>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
                <p className="mb-0 mt-3 d-flex justify-content-between">
                    <strong>Total</strong>
                    <strong>${total.toLocaleString('es-CL')}</strong>
                </p>
            </Card.Body>
        </Card>
    )
}
