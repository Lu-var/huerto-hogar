import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductosCriticos() {
    const [productos, setProductos] = useState([])
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                setProductos(productosRepositorio.obtenerTodos().filter((producto) => Number.isInteger(producto.stock) && producto.stock <= 5))
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }, 0)
        return () => window.clearTimeout(temporizador)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo="Inventario crítico" descripcion="Productos con stock informado igual o inferior a cinco unidades." />
            {estado === 'cargando' && <Alert variant="info" role="status">Revisando inventario...</Alert>}
            {estado === 'error' && <Alert variant="danger" role="alert">{error}</Alert>}
            {estado === 'listo' && productos.length === 0 && <Alert variant="info" role="status">No hay productos con inventario crítico informado.</Alert>}
            {estado === 'listo' && productos.length > 0 && (
                <Table responsive striped bordered>
                    <thead><tr><th>Producto</th><th>Stock</th><th>Acción</th></tr></thead>
                    <tbody>{productos.map((producto) => <tr key={producto.id}><td>{producto.nombre}</td><td>{producto.stock}</td><td><Button as={Link} to={`/admin/productos/${producto.id}/editar`} size="sm" variant="outline-success">Actualizar stock</Button></td></tr>)}</tbody>
                </Table>
            )}
            <Button as={Link} to="/admin/productos" variant="outline-secondary">Volver a productos</Button>
        </ContenedorPagina>
    )
}
