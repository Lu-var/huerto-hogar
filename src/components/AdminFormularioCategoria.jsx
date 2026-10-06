import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'

function crearSlug(nombre) {
    return nombre.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
}

export default function AdminFormularioCategoria({ categoria, alGuardar, textoBoton = 'Guardar categoría' }) {
    const [nombre, setNombre] = useState(categoria?.nombre || '')
    const [error, setError] = useState('')

    function enviar(evento) {
        evento.preventDefault()
        const nombreLimpio = nombre.trim()
        const id = crearSlug(nombreLimpio)
        if (nombreLimpio.length < 2 || !id) {
            setError('Ingresa un nombre de categoría válido.')
            return
        }
        alGuardar({ nombre: nombreLimpio, id })
    }

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger" role="alert">{error}</Alert>}
                <Form onSubmit={enviar} noValidate>
                    <Form.Group className="mb-3" controlId="categoria-nombre">
                        <Form.Label>Nombre de la categoría</Form.Label>
                        <Form.Control value={nombre} onChange={(evento) => { setNombre(evento.target.value); setError('') }} required />
                        <Form.Text>El identificador se genera automáticamente a partir del nombre.</Form.Text>
                    </Form.Group>
                    <Button type="submit" variant="success">{textoBoton}</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
