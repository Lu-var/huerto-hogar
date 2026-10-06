import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import Button from 'react-bootstrap/Button'
import useSesion from '../hooks/usarSesion.js'

const enlaces = [
    { to: '/admin', label: 'Dashboard', end: true },
    { to: '/admin/ordenes', label: 'Órdenes' },
    { to: '/admin/productos', label: 'Productos' },
    { to: '/admin/categorias', label: 'Categorías' },
    { to: '/admin/usuarios', label: 'Usuarios' },
    { to: '/admin/reportes', label: 'Reportes' },
    { to: '/admin/perfil', label: 'Perfil' },
    { to: '/admin/tienda', label: 'Ver tienda' },
]

export default function DiseñoAdministracion() {
    const { sesion, cerrar } = useSesion()
    const navigate = useNavigate()

    function salir() {
        cerrar()
        navigate('/admin/iniciar-sesion')
    }

    return (
        <div className="d-flex min-vh-100 flex-column">
            <Navbar expand="lg" className="encabezado-administracion" variant="dark">
                <Container fluid>
                    <Navbar.Brand as={NavLink} to="/admin">HuertoHogar Admin</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navegacion-administracion" />
                    <Navbar.Collapse id="navegacion-administracion">
                        <Nav className="me-auto">
                            {enlaces.map((enlace) => (
                                <Nav.Link
                                    key={enlace.to}
                                    as={NavLink}
                                    to={enlace.to}
                                    end={enlace.end}
                                >
                                    {enlace.label}
                                </Nav.Link>
                            ))}
                        </Nav>
                        <span className="text-white me-3">Sesión: {sesion?.nombre}</span>
                        <Button variant="outline-light" onClick={salir}>Cerrar sesión</Button>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <main className="flex-grow-1">
                <Outlet />
            </main>
        </div>
    )
}
