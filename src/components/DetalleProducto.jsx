import { Link, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import AlertaEstado from './AlertaEstado.jsx'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import useCarrito from '../hooks/usarCarrito.js'
import { productos } from '../data/productos.js'

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

export default function DetalleProducto() {
    const { id } = useParams()
    const producto = productos.find((elemento) => elemento.id === Number(id))
    const { agregar } = useCarrito()

    if (!producto) {
        return (
            <ContenedorPagina>
                <AlertaEstado variante="warning" titulo="Producto no encontrado">
                    No existe un producto con ese identificador.
                </AlertaEstado>
                <Button as={Link} to="/productos" variant="success">
                    Volver a productos
                </Button>
            </ContenedorPagina>
        )
    }

    return (
        <ContenedorPagina>
            <Row className="align-items-center g-4">
                <Col md={6}>
                    <Image
                        src={imagenesPorProducto[producto.id]}
                        alt={producto.nombre}
                        fluid
                        rounded
                    />
                </Col>
                <Col md={6}>
                    <EncabezadoSeccion titulo={producto.nombre} />
                    <p>{producto.descripcion}</p>
                    <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')} por {producto.unidad}</p>
                    <p><strong>Origen:</strong> {producto.origen}</p>
                    <p><strong>Curiosidad:</strong> {producto.curiosidad}</p>
                    <div className="d-flex gap-2">
                        <Button variant="success" onClick={() => agregar(producto)}>
                            Agregar al carrito
                        </Button>
                        <Button as={Link} to="/productos" variant="outline-success">
                            Volver a productos
                        </Button>
                    </div>
                </Col>
            </Row>
        </ContenedorPagina>
    )
}
