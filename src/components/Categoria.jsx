import { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import GrillaProductos from './GrillaProductos.jsx'
import ModalProducto from './ModalProducto.jsx'
import AlertaEstado from './AlertaEstado.jsx'
import useCarrito from '../hooks/usarCarrito.js'
import { categorias } from '../data/catalogo.js'

export default function Categoria() {
    const { slug } = useParams()
    const [productoAbierto, setProductoAbierto] = useState(null)
    const categoria = categorias.find((elemento) => elemento.id === slug)
    const { agregar } = useCarrito()

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
