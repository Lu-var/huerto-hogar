import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'
import { guardarSesion } from '../data/autenticacion.js'
import { usuariosRepositorio } from '../data/repositorios.js'

export default function FormularioAutenticacion({ modo }) {
    const esRegistro = modo === 'registro'
    const navigate = useNavigate()
    const [formulario, setFormulario] = useState({ nombre: '', email: '', password: '' })
    const [error, setError] = useState('')

    function actualizarCampo(evento) {
        setFormulario((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))
        setError('')
    }

    function enviarFormulario(evento) {
        evento.preventDefault()
        const email = formulario.email.trim().toLowerCase()

        if (esRegistro && formulario.nombre.trim().length < 2) {
            setError('Ingresa un nombre de al menos dos caracteres.')
            return
        }

        if (!email.includes('@')) {
            setError('Ingresa un correo electrónico válido.')
            return
        }

        if (formulario.password.length < 6) {
            setError('La contraseña debe tener al menos seis caracteres.')
            return
        }

        try {
            const usuarios = usuariosRepositorio.obtenerTodos()
            const usuarioExistente = usuarios.find((usuario) => usuario.email === email)

            if (esRegistro) {
                if (usuarioExistente) {
                    setError('Ya existe una cuenta con ese correo.')
                    return
                }

                const usuario = {
                    id: `usuario-${Date.now()}`,
                    nombre: formulario.nombre.trim(),
                    email,
                    password: formulario.password,
                }
                usuariosRepositorio.crear(usuario)
                guardarSesion({ id: usuario.id, nombre: usuario.nombre, email: usuario.email })
                navigate('/')
                return
            }

            if (!usuarioExistente || usuarioExistente.password !== formulario.password) {
                setError('El correo o la contraseña no son correctos.')
                return
            }

            guardarSesion({
                id: usuarioExistente.id,
                nombre: usuarioExistente.nombre,
                email: usuarioExistente.email,
            })
            navigate('/')
        } catch (errorLectura) {
            setError(errorLectura.message)
        }
    }

    return (
        <Card className="mx-auto tarjeta-autenticacion">
            <Card.Body>
                <Card.Title>{esRegistro ? 'Crear cuenta' : 'Iniciar sesión'}</Card.Title>
                <Card.Text className="text-muted">
                    Este formulario usa una cuenta simulada y guarda los datos solo en este navegador.
                </Card.Text>
                {error && <Alert variant="danger">{error}</Alert>}
                <Form onSubmit={enviarFormulario} noValidate>
                    {esRegistro && (
                        <Form.Group className="mb-3" controlId="nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                name="nombre"
                                value={formulario.nombre}
                                onChange={actualizarCampo}
                                required
                            />
                        </Form.Group>
                    )}
                    <Form.Group className="mb-3" controlId="email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control
                            type="email"
                            name="email"
                            value={formulario.email}
                            onChange={actualizarCampo}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="password">
                        <Form.Label>Contraseña</Form.Label>
                        <Form.Control
                            type="password"
                            name="password"
                            value={formulario.password}
                            onChange={actualizarCampo}
                            required
                        />
                    </Form.Group>
                    <Stack gap={2}>
                        <Button type="submit" variant="success">
                            {esRegistro ? 'Crear cuenta' : 'Ingresar'}
                        </Button>
                        <Button as={Link} to={esRegistro ? '/iniciar-sesion' : '/registro'} variant="outline-secondary">
                            {esRegistro ? 'Ya tengo una cuenta' : 'Crear una cuenta'}
                        </Button>
                    </Stack>
                </Form>
            </Card.Body>
        </Card>
    )
}
