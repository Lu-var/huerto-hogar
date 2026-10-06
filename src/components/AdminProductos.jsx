import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductos() {
    const [productos, setProductos] = useState([])
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    function cargar() {
        try {
            setProductos(productosRepositorio.obtenerTodos())
            setEstado('listo')
        } catch (errorLectura) {
            setError(errorLectura.message)
            setEstado('error')
        }
    }

    useEffect(() => {
        const temporizador = window.setTimeout(cargar, 0)
        return () => window.clearTimeout(temporizador)
    }, [])

    function eliminar(producto) {
        if (!window.confirm(`¿Eliminar ${producto.nombre}?`)) return
        try {
            productosRepositorio.eliminar(producto.id)
            cargar()
        } catch (errorEliminacion) {
            setError(errorEliminacion.message)
            setEstado('error')
        }
    }

    return (
        <ContenedorPagina>
            <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
                <EncabezadoSeccion titulo="Productos e inventario" descripcion="Administra los productos guardados en el catálogo local." />
                <Button as={Link} to="/admin/productos/nuevo" variant="success">Nuevo producto</Button>
            </div>
            {estado === 'cargando' && <Alert variant="info" role="status">Cargando productos...</Alert>}
            {estado === 'error' && <Alert variant="danger" role="alert">{error}</Alert>}
            {estado === 'listo' && productos.length === 0 && <Alert variant="info" role="status">No hay productos registrados.</Alert>}
            {estado === 'listo' && productos.length > 0 && (
                <>
                    <div className="d-flex flex-wrap gap-2 mb-3">
                        <Button as={Link} to="/admin/productos/criticos" variant="outline-warning">Ver inventario crítico</Button>
                        <Button as={Link} to="/admin/productos/reportes" variant="outline-secondary">Ver reportes</Button>
                    </div>
                    <Table responsive striped bordered hover>
                        <thead><tr><th>Producto</th><th>Precio</th><th>Stock</th><th>Acciones</th></tr></thead>
                        <tbody>
                            {productos.map((producto) => (
                                <tr key={producto.id}>
                                    <td>{producto.nombre}</td>
                                    <td>${Number(producto.precio || 0).toLocaleString('es-CL')}</td>
                                    <td>{producto.stock === undefined ? 'Sin informar' : producto.stock}</td>
                                    <td>
                                        <div className="d-flex flex-wrap gap-2">
                                            <Button as={Link} to={`/admin/productos/${producto.id}`} variant="outline-success" size="sm">Ver</Button>
                                            <Button as={Link} to={`/admin/productos/${producto.id}/editar`} variant="outline-secondary" size="sm">Editar</Button>
                                            <Button variant="outline-danger" size="sm" onClick={() => eliminar(producto)}>Eliminar</Button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </ContenedorPagina>
    )
}
