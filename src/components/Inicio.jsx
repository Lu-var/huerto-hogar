import { Link } from 'react-router-dom'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'

const beneficios = [
    {
        titulo: '🌱 Productos frescos',
        descripcion: 'Ofrecemos productos frescos y de calidad para toda la familia.',
    },
    {
        titulo: '🚜 Productores locales',
        descripcion: 'Conectamos a las familias con productores y agricultores locales.',
    },
    {
        titulo: '❤️ Compromiso y calidad',
        descripcion: 'Buscamos entregar una experiencia de compra cercana y confiable.',
    },
]

export default function Inicio() {
    return (
        <ContenedorPagina>
            <section className="py-4 py-lg-5">
                <Row className="align-items-center g-4 g-lg-5">
                    <Col lg={6}>
                        <div className="texto-inicio">
                            <h1 className="display-4 fw-bold text-success">
                                Productos frescos del campo a tu hogar
                            </h1>
                            <p className="lead text-secondary">
                                Frescura que se siente, calidad que se disfruta.
                                Llevamos hasta tu hogar productos seleccionados
                                para que puedas disfrutar de una alimentación más
                                fresca, saludable y natural.
                            </p>
                            <Button as={Link} to="/productos" variant="success" size="lg">
                                Ver nuestros productos
                            </Button>
                        </div>
                    </Col>
                    <Col lg={6}>
                        <Image
                            src="/img/index.png"
                            alt="Productos frescos del campo"
                            fluid
                            rounded
                            className="w-100"
                        />
                    </Col>
                </Row>
            </section>

            <section className="py-4">
                <EncabezadoSeccion
                    titulo="¿Por qué Huerto Hogar?"
                    descripcion="Una compra cercana, con productos seleccionados para tu hogar."
                />
                <Row xs={1} md={3} className="g-4">
                    {beneficios.map((beneficio) => (
                        <Col key={beneficio.titulo}>
                            <Card className="h-100 border-0 shadow-sm">
                                <Card.Body>
                                    <Card.Title className="text-success">
                                        {beneficio.titulo}
                                    </Card.Title>
                                    <Card.Text>{beneficio.descripcion}</Card.Text>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </ContenedorPagina>
    )
}
