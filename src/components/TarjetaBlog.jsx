import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function TarjetaBlog({ blog }) {
    return (
        <Card className="h-100">
            <Card.Body className="d-flex flex-column">
                <Card.Subtitle className="mb-2 text-muted">{blog.etiqueta}</Card.Subtitle>
                <Card.Title>{blog.titulo}</Card.Title>
                <Card.Text>{blog.resumen}</Card.Text>
                <Button as={Link} to={`/blogs/${blog.id}`} variant="outline-success" className="mt-auto align-self-start">
                    Leer artículo
                </Button>
            </Card.Body>
        </Card>
    )
}
