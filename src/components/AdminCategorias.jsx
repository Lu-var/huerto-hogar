import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { categoriasRepositorio } from '../data/categorias.js'

export default function AdminCategorias() {
    const [categorias, setCategorias] = useState([])
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    function cargar() {
        try {
            setCategorias(categoriasRepositorio.obtenerTodos())
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

    function eliminar(categoria) {
        if ((categoria.productoIds || []).length > 0) {
            setError('No puedes eliminar una categoría que todavía tiene productos asociados.')
            return
        }
        if (!window.confirm(`¿Eliminar ${categoria.nombre}?`)) return
        try {
            categoriasRepositorio.eliminar(categoria.id)
            cargar()
        } catch (errorEliminacion) {
            setError(errorEliminacion.message)
            setEstado('error')
        }
    }

    return (
        <ContenedorPagina>
            <div className="d-flex flex-wrap justify-content-between gap-2 align-items-start">
                <EncabezadoSeccion titulo="Categorías" descripcion="Organiza los productos del catálogo mediante categorías persistidas." />
                <Button as={Link} to="/admin/categorias/nueva" variant="success">Nueva categoría</Button>
            </div>
            {estado === 'cargando' && <Alert variant="info" role="status">Cargando categorías...</Alert>}
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            {estado === 'listo' && categorias.length === 0 && <Alert variant="info" role="status">No hay categorías registradas.</Alert>}
            {estado === 'listo' && categorias.length > 0 && (
                <Table responsive striped bordered hover>
                    <thead><tr><th>Nombre</th><th>Identificador</th><th>Productos asociados</th><th>Acciones</th></tr></thead>
                    <tbody>{categorias.map((categoria) => (
                        <tr key={categoria.id}>
                            <td>{categoria.nombre}</td><td>{categoria.id}</td><td>{(categoria.productoIds || []).length}</td>
                            <td><div className="d-flex flex-wrap gap-2">
                                <Button as={Link} to={`/admin/categorias/${categoria.id}/editar`} variant="outline-secondary" size="sm">Editar</Button>
                                <Button variant="outline-danger" size="sm" onClick={() => eliminar(categoria)}>Eliminar</Button>
                            </div></td>
                        </tr>
                    ))}</tbody>
                </Table>
            )}
        </ContenedorPagina>
    )
}
