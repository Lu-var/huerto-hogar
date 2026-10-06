import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'

const localidades = [
    { nombre: 'Viña del Mar', url: 'https://www.google.com/maps/search/?api=1&query=Vi%C3%B1a%20del%20Mar%2C%20Chile' },
    { nombre: 'Valparaíso', url: 'https://www.google.com/maps/search/?api=1&query=Valpara%C3%ADso%2C%20Chile' },
    { nombre: 'Las Condes', url: 'https://www.google.com/maps/search/?api=1&query=Santiago%2C%20Chile' },
    { nombre: 'Maipú', url: 'https://www.google.com/maps/search/?api=1&query=Santiago%2C%20Chile' },
    { nombre: 'Villarica', url: 'https://www.google.com/maps/search/?api=1&query=Villarica%2C%20Chile' },
    { nombre: 'Nacimiento', url: 'https://www.google.com/maps/search/?api=1&query=Nacimiento%2C%20Chile' },
    { nombre: 'Concepción', url: 'https://www.google.com/maps/search/?api=1&query=Concepci%C3%B3n%2C%20Chile' },
    { nombre: 'Puerto Montt', url: 'https://www.google.com/maps/search/?api=1&query=Puerto%20Montt%2C%20Chile' },
]

const secciones = [
    {
        titulo: 'Sobre HuertoHogar',
        imagen: '/img/Campo.png',
        alternar: false,
        parrafos: [
            'HuertoHogar es una tienda online que busca acercar productos frescos y de calidad directamente desde el campo hasta los hogares de las familias chilenas. La empresa cuenta con más de 6 años de experiencia y trabaja para ofrecer una alternativa cercana y confiable para quienes buscan alimentos frescos y naturales. Su propuesta busca facilitar el acceso a productos provenientes de agricultores y productores locales, fortaleciendo el vínculo entre el campo y las familias. De esta manera, HuertoHogar busca entregar una experiencia de compra basada en la calidad de sus productos y en el compromiso con sus clientes.',
            'Contamos con más de 6 años de experiencia y operamos en más de 9 puntos a lo largo del país.',
        ],
    },
    {
        titulo: 'Nuestra misión',
        imagen: '/img/Vision.jpg',
        alternar: true,
        parrafos: [
            'Nuestra misión es conectar a las familias chilenas con el campo, facilitando el acceso a productos frescos, naturales y de calidad. En HuertoHogar buscamos acercar a nuestros clientes a los productores locales, promoviendo una alimentación saludable y responsable.',
            'También buscamos apoyar a los agricultores y productores de distintas localidades de Chile, fortaleciendo el vínculo entre quienes trabajan la tierra y las familias que disfrutan de sus productos. De esta manera, promovemos el consumo de alimentos frescos y prácticas sostenibles, manteniendo nuestro compromiso con la calidad y el bienestar de nuestros clientes.',
        ],
    },
    {
        titulo: 'Nuestra visión',
        imagen: '/img/mision.png',
        alternar: false,
        parrafos: [
            'Nuestra misión es conectar a las familias chilenas con el campo, ofreciendo productos frescos y de calidad directamente de productores locales. En HuertoHogar buscamos facilitar el acceso a alimentos saludables y naturales, acercando el trabajo de los agricultores a nuestros clientes.',
            'Además, queremos contribuir a una alimentación más saludable y promover prácticas sostenibles, apoyando a los productores locales y fortaleciendo el vínculo entre las familias y el campo. Nuestro compromiso es entregar productos de calidad y una experiencia de compra cercana y confiable.',
        ],
    },
]

export default function Nosotros() {
    return (
        <ContenedorPagina>
            {secciones.map((seccion) => (
                <section className="py-4" key={seccion.titulo}>
                    <Row className="align-items-center g-4">
                        <Col lg={{ order: seccion.alternar ? 2 : 1, span: 6 }}>
                            <EncabezadoSeccion titulo={seccion.titulo} />
                            {seccion.parrafos.map((parrafo) => (
                                <p key={parrafo}>{parrafo}</p>
                            ))}
                        </Col>
                        <Col lg={{ order: seccion.alternar ? 1 : 2, span: 6 }}>
                            <Image src={seccion.imagen} alt={seccion.titulo} fluid rounded />
                        </Col>
                    </Row>
                </section>
            ))}

            <section className="ubicaciones py-4">
                <EncabezadoSeccion
                    titulo="¿Dónde estamos?"
                    descripcion="HuertoHogar cuenta con presencia en distintas localidades de Chile."
                />
                <Row xs={2} md={4} className="g-3">
                    {localidades.map((localidad) => (
                        <Col key={localidad.nombre}>
                            <Card className="h-100 bg-success text-white">
                                <Card.Body className="d-flex flex-column">
                                    <Card.Title className="fs-6">{localidad.nombre}</Card.Title>
                                    <Card.Link
                                        href={localidad.url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-auto text-white"
                                    >
                                        Ver en Google Maps
                                    </Card.Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </section>
        </ContenedorPagina>
    )
}
