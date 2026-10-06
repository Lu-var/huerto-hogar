import Button from 'react-bootstrap/Button'
import ButtonGroup from 'react-bootstrap/ButtonGroup'
import ListGroup from 'react-bootstrap/ListGroup'

export default function ProductoCarrito({ producto, alAumentar, alDisminuir, alQuitar }) {
    return (
        <ListGroup.Item>
            <div className="d-flex justify-content-between gap-2">
                <div>
                    <strong>{producto.nombre}</strong>
                    <div className="small text-secondary">
                        ${producto.precio.toLocaleString('es-CL')} por {producto.unidad}
                    </div>
                </div>
                <strong>${(producto.precio * producto.cantidad).toLocaleString('es-CL')}</strong>
            </div>
            <div className="d-flex align-items-center justify-content-between mt-2">
                <ButtonGroup size="sm" aria-label={`Cantidad de ${producto.nombre}`}>
                    <Button variant="outline-secondary" onClick={() => alDisminuir(producto.id)}>-</Button>
                    <Button variant="outline-secondary" disabled>{producto.cantidad}</Button>
                    <Button variant="outline-secondary" onClick={() => alAumentar(producto.id)}>+</Button>
                </ButtonGroup>
                <Button variant="link" size="sm" className="text-danger" onClick={() => alQuitar(producto.id)}>
                    Quitar
                </Button>
            </div>
        </ListGroup.Item>
    )
}
