import { useEffect, useState } from 'react'
import { Row, Col } from 'react-bootstrap'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AlertaEstado from './AlertaEstado.jsx'
import TarjetaBlog from './TarjetaBlog.jsx'
import { blogsRepositorio } from '../data/repositorios.js'

export default function Blogs() {
    const [blogs, setBlogs] = useState(null)
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    useEffect(() => {
        const cargarBlogs = () => {
            try {
                setBlogs(blogsRepositorio.obtenerTodos())
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }

        const idCarga = window.setTimeout(cargarBlogs, 0)
        return () => window.clearTimeout(idCarga)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Blog de HuertoHogar"
                descripcion="Ideas de demostración para organizar y disfrutar productos frescos."
            />
            {estado === 'cargando' && <AlertaEstado>Cargando artículos...</AlertaEstado>}
            {estado === 'error' && <AlertaEstado variante="danger" titulo="No se pudieron cargar los artículos">{error}</AlertaEstado>}
            {estado === 'listo' && blogs.length === 0 && (
                <AlertaEstado>No hay artículos publicados por el momento.</AlertaEstado>
            )}
            {estado === 'listo' && blogs.length > 0 && (
                <Row className="g-4">
                    {blogs.map((blog) => (
                        <Col key={blog.id} md={6}>
                            <TarjetaBlog blog={blog} />
                        </Col>
                    ))}
                </Row>
            )}
        </ContenedorPagina>
    )
}
