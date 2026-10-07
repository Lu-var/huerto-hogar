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
    const [errores, setErrores] = useState({})

    function actualizarCampo(evento) {
        const { name, value } = evento.target
        setFormulario((actual) => ({ ...actual, [name]: value }))
        setErrores((actual) => {
            const nuevos = { ...actual }
            delete nuevos[name]
            return nuevos
        })
        setError('')
    }

    function enviarFormulario(evento) {
        evento.preventDefault()
        const camposFaltantes = {}
        if (!formulario.email.trim()) camposFaltantes.email = true
        if (!formulario.password) camposFaltantes.password = true
        if (Object.keys(camposFaltantes).length > 0) {
            setErrores(camposFaltantes)
            setError('Completa el correo y la contraseña.')
            return
        }

        if (formulario.email.trim().toLowerCase() !== credencialesDemo.email || formulario.password !== credencialesDemo.password) {
            setErrores({ email: true, password: true })
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
                descripcion="Acceso de demostración para revisar las vistas de administración del proyecto."
            />
            <Card className="mx-auto tarjeta-autenticacion">
                <Card.Body>
                    <Card.Text className="text-muted">
                        La cuenta de demostración ya está cargada para revisar el flujo administrativo en esta aplicación local.
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
                                isInvalid={Boolean(errores.email)}
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
                                isInvalid={Boolean(errores.password)}
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
