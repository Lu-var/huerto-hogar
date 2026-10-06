import { useState } from 'react'
import Badge from 'react-bootstrap/Badge'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import GrillaProductos from './GrillaProductos.jsx'
import ModalProducto from './ModalProducto.jsx'
import ResumenCarrito from './ResumenCarrito.jsx'
import useCarrito from '../hooks/usarCarrito.js'
import { productos } from '../data/productos.js'

export default function Productos() {
    const [productoAbierto, setProductoAbierto] = useState(null)
    const [carritoVisible, setCarritoVisible] = useState(true)
    const {
        carrito,
        cantidadProductos,
        total,
        agregar,
        aumentar,
        disminuir,
        quitar,
        vaciar,
    } = useCarrito()

    function vaciarConConfirmacion() {
        if (carrito.length > 0 && window.confirm('¿Quieres vaciar todo el carrito?')) {
            vaciar()
        }
    }

    function quitarConConfirmacion(id) {
        const producto = carrito.find((elemento) => elemento.id === id)

        if (producto?.cantidad === 1 && !window.confirm(`¿Quieres quitar ${producto.nombre}?`)) {
            return
        }

        quitar(id)
    }

    return (
        <ContenedorPagina>
            <Row className="g-4">
                <Col lg={carritoVisible ? 8 : 12}>
                    <div className="d-flex justify-content-between align-items-start gap-3 mb-4">
                        <EncabezadoSeccion
                            titulo="Nuestros productos"
                            descripcion="Selecciona un producto para conocer más detalles o agregarlo al carrito."
                        />
                        <Badge bg="success" className="fs-6 text-nowrap">
                            {cantidadProductos} productos
                        </Badge>
                    </div>
                    <GrillaProductos
                        productos={productos}
                        alAgregar={agregar}
                        alMostrarDetalle={setProductoAbierto}
                    />
                </Col>

                <Col lg={4}>
                    {carritoVisible ? (
                        <ResumenCarrito
                            carrito={carrito}
                            cantidadProductos={cantidadProductos}
                            total={total}
                            alAumentar={aumentar}
                            alDisminuir={disminuir}
                            alQuitar={quitarConConfirmacion}
                            alVaciar={vaciarConConfirmacion}
                            alOcultar={() => setCarritoVisible(false)}
                        />
                    ) : (
                        <Button variant="success" onClick={() => setCarritoVisible(true)}>
                            Mostrar carrito
                        </Button>
                    )}
                </Col>
            </Row>

            <ModalProducto
                producto={productoAbierto}
                onClose={() => setProductoAbierto(null)}
                onAgregar={() => {
                    agregar(productoAbierto)
                    setProductoAbierto(null)
                }}
            />
        </ContenedorPagina>
    )
}
