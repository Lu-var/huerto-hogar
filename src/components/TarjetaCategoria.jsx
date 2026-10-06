import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'

export default function TarjetaCategoria({ categoria }) {
    return (
        <Card className="h-100 shadow-sm">
            <Card.Body className="d-flex flex-column">
                <Card.Title>{categoria.nombre}</Card.Title>
                <Card.Text className="text-secondary">
                    {categoria.productos.length} productos disponibles.
                </Card.Text>
                <Button as={Link} to={`/categorias/${categoria.id}`} variant="success" className="mt-auto">
                    Ver categoría
                </Button>
            </Card.Body>
        </Card>
    )
}
