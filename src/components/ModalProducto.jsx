import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

export default function ModalProducto({ producto, onClose, onAgregar }) {
    if (!producto) {
        return null
    }

    return (
        <Modal show onHide={onClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>{producto.nombre}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <p><strong>Precio:</strong> ${producto.precio.toLocaleString('es-CL')}</p>
                <p><strong>Unidad:</strong> {producto.unidad}</p>
                <p><strong>Origen:</strong> {producto.origen}</p>
                <p><strong>Descripción:</strong> {producto.descripcion}</p>
                <p className="mb-0"><strong>Curiosidad:</strong> {producto.curiosidad}</p>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="outline-secondary" onClick={onClose}>Cerrar</Button>
                <Button variant="success" onClick={onAgregar}>Agregar al carrito</Button>
            </Modal.Footer>
        </Modal>
    )
}
