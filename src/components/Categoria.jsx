import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import GrillaProductos from './GrillaProductos.jsx'
import ModalProducto from './ModalProducto.jsx'
import AlertaEstado from './AlertaEstado.jsx'
import ResumenCarrito from './ResumenCarrito.jsx'
import useCarrito from '../hooks/usarCarrito.js'
import { categorias } from '../data/catalogo.js'

export default function Categoria() {
    const { slug } = useParams()
    const [productoAbierto, setProductoAbierto] = useState(null)
    const [carritoVisible, setCarritoVisible] = useState(true)
    const categoria = categorias.find((elemento) => elemento.id === slug)
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

    if (!categoria) {
        return (
            <ContenedorPagina>
                <AlertaEstado variante="warning" titulo="Categoría no encontrada">
                    No existe una categoría con ese nombre.
                </AlertaEstado>
                <Button as={Link} to="/categorias" variant="success">
                    Ver categorías
                </Button>
            </ContenedorPagina>
        )
    }

    return (
        <ContenedorPagina>
            <Row className="g-4">
                <Col lg={8}>
                    <EncabezadoSeccion
                        titulo={categoria.nombre}
                        descripcion={`Productos disponibles en ${categoria.nombre.toLowerCase()}.`}
                    />
                    {categoria.productos.length === 0 ? (
                        <AlertaEstado variante="info">No hay productos en esta categoría.</AlertaEstado>
                    ) : (
                        <GrillaProductos
                            productos={categoria.productos}
                            alAgregar={agregar}
                            alMostrarDetalle={setProductoAbierto}
                        />
                    )}
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
