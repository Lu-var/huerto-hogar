import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

export default function Encabezado() {
    return (
        <Navbar expand="lg" className="encabezado-tienda" variant="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    HuertoHogar
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="navegacion-principal" />
                <Navbar.Collapse id="navegacion-principal">
                    <Nav className="ms-auto">
                        <Nav.Link as={Link} to="/">Inicio</Nav.Link>
                        <Nav.Link as={Link} to="/productos">Productos</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}