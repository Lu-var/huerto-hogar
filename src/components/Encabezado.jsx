import { Link } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import useSesion from '../hooks/usarSesion.js'

export default function Encabezado() {
    const { sesion, cerrar } = useSesion()

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
                        <Nav.Link as={Link} to="/categorias">Categorías</Nav.Link>
                        <Nav.Link as={Link} to="/ofertas">Ofertas</Nav.Link>
                        <Nav.Link as={Link} to="/nosotros">Nosotros</Nav.Link>
                        <Nav.Link as={Link} to="/contacto">Contacto</Nav.Link>
                        <Nav.Link as={Link} to="/blogs">Blog</Nav.Link>
                        {!sesion && <Nav.Link as={Link} to="/iniciar-sesion">Ingresar</Nav.Link>}
                        {!sesion && <Nav.Link as={Link} to="/registro">Registro</Nav.Link>}
                        {sesion && (
                            <Button variant="outline-light" size="sm" onClick={cerrar}>
                                Cerrar sesión ({sesion.nombre})
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}