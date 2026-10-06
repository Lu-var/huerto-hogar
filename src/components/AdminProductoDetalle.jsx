import { Link, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductoDetalle() {
    const { id } = useParams()
    const producto = productosRepositorio.obtenerPorId(Number(id))

    if (!producto) {
        return <ContenedorPagina><Alert variant="warning" role="alert">Producto no encontrado.</Alert><Button as={Link} to="/admin/productos" variant="success">Volver a productos</Button></ContenedorPagina>
    }

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo={producto.nombre} descripcion="Detalle administrativo del producto." />
            <Card>
                <Card.Body>
                    <dl className="row mb-4">
                        <dt className="col-sm-3">Precio</dt><dd className="col-sm-9">${Number(producto.precio).toLocaleString('es-CL')} por {producto.unidad || 'unidad'}</dd>
                        <dt className="col-sm-3">Stock</dt><dd className="col-sm-9">{producto.stock === undefined ? 'Sin informar' : producto.stock}</dd>
                        <dt className="col-sm-3">Descripción</dt><dd className="col-sm-9">{producto.descripcion || 'Sin descripción'}</dd>
                        <dt className="col-sm-3">Origen</dt><dd className="col-sm-9">{producto.origen || 'Sin informar'}</dd>
                        <dt className="col-sm-3">Curiosidad</dt><dd className="col-sm-9">{producto.curiosidad || 'Sin informar'}</dd>
                    </dl>
                    <Button as={Link} to={`/admin/productos/${producto.id}/editar`} variant="success" className="me-2">Editar producto</Button>
                    <Button as={Link} to="/admin/productos" variant="outline-secondary">Volver a productos</Button>
                </Card.Body>
            </Card>
        </ContenedorPagina>
    )
}
