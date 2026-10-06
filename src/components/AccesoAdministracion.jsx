import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { guardarSesion } from '../data/autenticacion.js'

const credencialesDemo = {
    email: 'admin@huertohogar.local',
    password: 'admin123',
}

export default function AccesoAdministracion() {
    const navigate = useNavigate()
    const [formulario, setFormulario] = useState(credencialesDemo)
    const [error, setError] = useState('')

    function actualizarCampo(evento) {
        setFormulario((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))
        setError('')
    }

    function enviarFormulario(evento) {
        evento.preventDefault()
        if (formulario.email.trim().toLowerCase() !== credencialesDemo.email || formulario.password !== credencialesDemo.password) {
            setError('Las credenciales de demostración no son correctas.')
            return
        }

        guardarSesion({
            id: 'administrador-demo',
            nombre: 'Administrador',
            email: credencialesDemo.email,
            rol: 'admin',
        })
        navigate('/admin')
    }

    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Acceso administrativo"
                descripcion="Entrada simulada para revisar las vistas de administración del proyecto."
            />
            <Card className="mx-auto tarjeta-autenticacion">
                <Card.Body>
                    <Card.Text className="text-muted">
                        Usa la cuenta de demostración incluida en esta aplicación local.
                    </Card.Text>
                    {error && <Alert variant="danger">{error}</Alert>}
                    <Form onSubmit={enviarFormulario} noValidate>
                        <Form.Group className="mb-3" controlId="admin-email">
                            <Form.Label>Correo administrativo</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={formulario.email}
                                onChange={actualizarCampo}
                                required
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="admin-password">
                            <Form.Label>Contraseña</Form.Label>
                            <Form.Control
                                type="password"
                                name="password"
                                value={formulario.password}
                                onChange={actualizarCampo}
                                required
                            />
                        </Form.Group>
                        <Button type="submit" variant="success">Ingresar al panel</Button>
                    </Form>
                </Card.Body>
            </Card>
        </ContenedorPagina>
    )
}
