import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import TarjetaCategoria from './TarjetaCategoria.jsx'
import { categorias } from '../data/catalogo.js'

export default function Categorias() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Categorías"
                descripcion="Encuentra productos según el tipo de alimento que buscas."
            />
            <Row xs={1} md={2} className="g-4">
                {categorias.map((categoria) => (
                    <Col key={categoria.id}>
                        <TarjetaCategoria categoria={categoria} />
                    </Col>
                ))}
            </Row>
        </ContenedorPagina>
    )
}
