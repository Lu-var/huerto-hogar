import { Link, useParams } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ContenedorPagina from './ContenedorPagina.jsx'
import AlertaEstado from './AlertaEstado.jsx'
import { blogsRepositorio } from '../data/repositorios.js'

export default function DetalleBlog() {
    const { id } = useParams()
    const blog = blogsRepositorio.obtenerPorId(id)

    if (!blog) {
        return (
            <ContenedorPagina>
                <AlertaEstado variante="warning" titulo="Artículo no encontrado">
                    El artículo solicitado no existe.
                </AlertaEstado>
                <Button as={Link} to="/blogs" variant="success">Volver al blog</Button>
            </ContenedorPagina>
        )
    }

    return (
        <ContenedorPagina>
            <Card>
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-muted">{blog.etiqueta}</Card.Subtitle>
                    <Card.Title as="h1">{blog.titulo}</Card.Title>
                    <Card.Text>{blog.contenido}</Card.Text>
                    <Button as={Link} to="/blogs" variant="outline-success">Volver al blog</Button>
                </Card.Body>
            </Card>
        </ContenedorPagina>
    )
}
