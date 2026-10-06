import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Col from 'react-bootstrap/Col'
import Form from 'react-bootstrap/Form'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'

const formularioInicial = {
    nombre: '',
    correo: '',
    mensaje: '',
}

export default function Contacto() {
    const [formulario, setFormulario] = useState(formularioInicial)
    const [estado, setEstado] = useState(null)

    function actualizarCampo(event) {
        const { name, value } = event.target
        setFormulario((actual) => ({ ...actual, [name]: value }))
        setEstado(null)
    }

    function enviarFormulario(event) {
        event.preventDefault()

        if (!formulario.nombre.trim() || !formulario.correo.trim() || !formulario.mensaje.trim()) {
            setEstado({
                variante: 'danger',
                mensaje: 'Por favor, completa todos los campos.',
            })
            return
        }

        if (!formulario.correo.includes('@')) {
            setEstado({
                variante: 'danger',
                mensaje: 'Por favor, ingresa un correo válido.',
            })
            return
        }

        setEstado({
            variante: 'success',
            mensaje: 'Mensaje enviado correctamente.',
        })
        setFormulario(formularioInicial)
    }

    return (
        <ContenedorPagina>
            <Row className="justify-content-center">
                <Col lg={8} xl={6}>
                    <EncabezadoSeccion
                        titulo="Contáctanos"
                        descripcion="Envíanos tu consulta y te responderemos a la brevedad."
                    />

                    <Form onSubmit={enviarFormulario} noValidate>
                        <Form.Group className="mb-3" controlId="formulario-nombre">
                            <Form.Label>Nombre</Form.Label>
                            <Form.Control
                                type="text"
                                name="nombre"
                                value={formulario.nombre}
                                onChange={actualizarCampo}
                                autoComplete="name"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formulario-correo">
                            <Form.Label>Correo</Form.Label>
                            <Form.Control
                                type="email"
                                name="correo"
                                value={formulario.correo}
                                onChange={actualizarCampo}
                                autoComplete="email"
                                required
                            />
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formulario-mensaje">
                            <Form.Label>Mensaje</Form.Label>
                            <Form.Control
                                as="textarea"
                                name="mensaje"
                                value={formulario.mensaje}
                                onChange={actualizarCampo}
                                rows={5}
                                required
                            />
                        </Form.Group>

                        <Button type="submit" variant="success">
                            Enviar
                        </Button>
                    </Form>

                    {estado && (
                        <Alert variant={estado.variante} className="mt-4" role="alert">
                            {estado.mensaje}
                        </Alert>
                    )}
                </Col>
            </Row>
        </ContenedorPagina>
    )
}
