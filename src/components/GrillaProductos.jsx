import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import TarjetaProducto from './TarjetaProducto.jsx'

export default function GrillaProductos({ productos, alAgregar, alMostrarDetalle }) {
    return (
        <Row xs={1} md={2} xl={3} className="g-4">
            {productos.map((producto) => (
                <Col key={producto.id}>
                    <TarjetaProducto
                        producto={producto}
                        alAgregar={alAgregar}
                        alMostrarDetalle={alMostrarDetalle}
                    />
                </Col>
            ))}
        </Row>
    )
}
