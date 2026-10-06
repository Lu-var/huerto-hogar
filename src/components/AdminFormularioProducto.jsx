import { useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import Card from 'react-bootstrap/Card'
import Form from 'react-bootstrap/Form'
import Stack from 'react-bootstrap/Stack'

const camposIniciales = {
    nombre: '',
    precio: '',
    unidad: '',
    descripcion: '',
    origen: '',
    curiosidad: '',
    stock: '',
}

export default function AdminFormularioProducto({ producto, alGuardar, textoBoton = 'Guardar producto' }) {
    const [campos, setCampos] = useState(() => producto
        ? { ...camposIniciales, ...producto, precio: String(producto.precio), stock: producto.stock === undefined ? '' : String(producto.stock) }
        : camposIniciales)
    const [error, setError] = useState('')

    function actualizarCampo(evento) {
        setCampos((actual) => ({ ...actual, [evento.target.name]: evento.target.value }))
        setError('')
    }

    function enviar(evento) {
        evento.preventDefault()
        const nombre = campos.nombre.trim()
        const precio = Number(campos.precio)
        const stock = campos.stock === '' ? undefined : Number(campos.stock)

        if (nombre.length < 2) {
            setError('Ingresa un nombre de al menos dos caracteres.')
            return
        }
        if (!Number.isFinite(precio) || precio <= 0) {
            setError('Ingresa un precio mayor que cero.')
            return
        }
        if (stock !== undefined && (!Number.isInteger(stock) || stock < 0)) {
            setError('El stock debe ser un número entero igual o mayor que cero.')
            return
        }

        alGuardar({
            ...campos,
            nombre,
            precio,
            stock,
            unidad: campos.unidad.trim(),
            descripcion: campos.descripcion.trim(),
            origen: campos.origen.trim(),
            curiosidad: campos.curiosidad.trim(),
        })
    }

    return (
        <Card>
            <Card.Body>
                {error && <Alert variant="danger" role="alert">{error}</Alert>}
                <Form onSubmit={enviar} noValidate>
                    <Form.Group className="mb-3" controlId="producto-nombre">
                        <Form.Label>Nombre</Form.Label>
                        <Form.Control name="nombre" value={campos.nombre} onChange={actualizarCampo} required />
                    </Form.Group>
                    <Stack direction="horizontal" gap={3} className="align-items-start">
                        <Form.Group className="mb-3 flex-fill" controlId="producto-precio">
                            <Form.Label>Precio</Form.Label>
                            <Form.Control type="number" min="1" name="precio" value={campos.precio} onChange={actualizarCampo} required />
                        </Form.Group>
                        <Form.Group className="mb-3 flex-fill" controlId="producto-stock">
                            <Form.Label>Stock</Form.Label>
                            <Form.Control type="number" min="0" name="stock" value={campos.stock} onChange={actualizarCampo} placeholder="Sin informar" />
                        </Form.Group>
                        <Form.Group className="mb-3 flex-fill" controlId="producto-unidad">
                            <Form.Label>Unidad</Form.Label>
                            <Form.Control name="unidad" value={campos.unidad} onChange={actualizarCampo} placeholder="kg, unidad, litro" />
                        </Form.Group>
                    </Stack>
                    <Form.Group className="mb-3" controlId="producto-descripcion">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control as="textarea" rows={3} name="descripcion" value={campos.descripcion} onChange={actualizarCampo} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="producto-origen">
                        <Form.Label>Origen</Form.Label>
                        <Form.Control name="origen" value={campos.origen} onChange={actualizarCampo} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="producto-curiosidad">
                        <Form.Label>Curiosidad</Form.Label>
                        <Form.Control name="curiosidad" value={campos.curiosidad} onChange={actualizarCampo} />
                    </Form.Group>
                    <Button type="submit" variant="success">{textoBoton}</Button>
                </Form>
            </Card.Body>
        </Card>
    )
}
