import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

export default function AdminFormularioUsuario({ usuario, alGuardar, textoBoton = 'Guardar usuario' }) {
    const [campos, setCampos] = useState({
        nombre: usuario?.nombre || '',
        email: usuario?.email || '',
        password: '',
        rol: usuario?.rol || 'cliente',
    })
    const [error, setError] = useState('')

    function actualizar(evento) {
        setCampos((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))
        setError('')
    }

    function enviar(evento) {
        evento.preventDefault()
        const email = campos.email.trim().toLowerCase()
        if (campos.nombre.trim().length < 2) {
            setError('Ingresa un nombre de al menos dos caracteres.')
            return
        }
        if (!email.includes('@')) {
            setError('Ingresa un correo electrónico válido.')
            return
        }
        if (!usuario && campos.password.length < 6) {
            setError('La contraseña debe tener al menos seis caracteres.')
            return
        }
        alGuardar({
            ...campos,
            nombre: campos.nombre.trim(),
            email,
            ...(campos.password ? { password: campos.password } : {}),
        })
    }

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger" role="alert">{error}</Alert>}
                <Form onSubmit={enviar} noValidate>
                    <Form.Group className="mb-3" controlId="usuario-nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" value={campos.nombre} onChange={actualizar} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usuario-email">
                        <Form.Label>Correo electrónico</Form.Label>
                        <Form.Control type="email" name="email" value={campos.email} onChange={actualizar} required />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usuario-password">
                        <Form.Label>{usuario ? 'Nueva contraseña (opcional)' : 'Contraseña'}</Form.Label>
                        <Form.Control type="password" name="password" value={campos.password} onChange={actualizar} required={!usuario} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usuario-rol">
                        <Form.Label>Rol</Form.Label>
                        <Form.Select name="rol" value={campos.rol} onChange={actualizar}>
                            <option value="cliente">Cliente</option>
                            <option value="admin">Administrador</option>
                        </Form.Select>
                    </Form.Group>
                    <Button type="submit" variant="success">{textoBoton}</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
