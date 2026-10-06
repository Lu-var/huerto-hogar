import { Link } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'

export default function AdminTienda() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Vista de la tienda"
                descripcion="Acceso rápido para revisar la experiencia pública desde el panel."
            />
            <Alert variant="info" role="status">
                Esta vista conserva la tienda pública separada del panel administrativo.
            </Alert>
            <Card>
                <Card.Body>
                    <Card.Title>HuertoHogar público</Card.Title>
                    <Card.Text>
                        Revisa el catálogo, las categorías, las ofertas y los flujos de compra en la vista pública.
                    </Card.Text>
                    <Button as={Link} to="/" variant="success">Abrir tienda</Button>
                </Card.Body>
            </Card>
        </ContenedorPagina>
    )
}
