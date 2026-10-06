import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ListGroup from 'react-bootstrap/ListGroup'
import { Link } from 'react-router-dom'
import ProductoCarrito from './ProductoCarrito.jsx'

export default function ResumenCarrito({
    carrito,
    cantidadProductos,
    total,
    alAumentar,
    alDisminuir,
    alQuitar,
    alVaciar,
    alOcultar,
}) {
    return (
        <div className="carrito-panel">
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">Mi carrito</h2>
                <Button variant="outline-secondary" size="sm" onClick={alOcultar}>
                    Ocultar
                </Button>
            </div>

            {carrito.length === 0 ? (
                <Alert variant="light" className="mb-3">No hay productos en el carrito.</Alert>
            ) : (
                <>
                    <ListGroup className="mb-3">
                        {carrito.map((producto) => (
                            <ProductoCarrito
                                key={producto.id}
                                producto={producto}
                                alAumentar={alAumentar}
                                alDisminuir={alDisminuir}
                                alQuitar={alQuitar}
                            />
                        ))}
                    </ListGroup>
                    <Button variant="outline-danger" size="sm" onClick={alVaciar}>
                        Vaciar carrito
                    </Button>
                    <Button as={Link} to="/checkout" variant="success" className="mt-2 w-100">
                        Ir al checkout
                    </Button>
                </>
            )}

            <p className="mb-0 mt-3">
                <strong>{cantidadProductos} productos</strong>
                <span className="float-end"><strong>Total: ${total.toLocaleString('es-CL')}</strong></span>
            </p>
        </div>
    )
}
