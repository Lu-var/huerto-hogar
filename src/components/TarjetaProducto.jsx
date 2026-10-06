import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'

const imagenesPorProducto = {
    1: '/img/Manzana-Fuji.png',
    2: '/img/Naranja-organica.jpg',
    3: '/img/Platano-granel.jpg',
    4: '/img/Zanahorias.jpg',
    5: '/img/espinaca.jpg',
    6: '/img/pimentones.jpg',
    7: '/img/Miel.jpg',
    8: '/img/Quinoa.jpg',
    9: '/img/Leche-blanca.png',
}

export default function TarjetaProducto({ producto, alAgregar, alMostrarDetalle }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Img
                variant="top"
                src={imagenesPorProducto[producto.id]}
                alt={producto.nombre}
                className="tarjeta-producto-imagen"
                onClick={() => alMostrarDetalle(producto)}
            />
            <Card.Body className="d-flex flex-column">
                <Card.Title>{producto.nombre}</Card.Title>
                <Card.Text className="text-secondary">
                    ${producto.precio.toLocaleString('es-CL')} por {producto.unidad}
                </Card.Text>
                <div className="mt-auto d-grid gap-2">
                    <Button variant="success" onClick={() => alAgregar(producto)}>
                        Agregar al carrito
                    </Button>
                    <Button variant="outline-success" onClick={() => alMostrarDetalle(producto)}>
                        Ver detalle
                    </Button>
                </div>
            </Card.Body>
        </Card>
    )
}
