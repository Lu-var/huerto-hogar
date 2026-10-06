import { Link, useSearchParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ContenedorPagina from './ContenedorPagina.jsx'

export default function ResultadoPago({ estado }) {
    const [parametros] = useSearchParams()
    const numeroOrden = parametros.get('orden')
    const esCorrecto = estado === 'correcto'

    return (
        <ContenedorPagina>
            <Alert variant={esCorrecto ? 'success' : 'danger'}>
                <Alert.Heading>
                    {esCorrecto ? 'Pago aprobado' : 'No se pudo completar el pago'}
                </Alert.Heading>
                <p className="mb-0">
                    {esCorrecto
                        ? `Tu orden${numeroOrden ? ` ${numeroOrden}` : ''} fue creada correctamente.`
                        : 'El pago simulado fue rechazado. Tus productos siguen en el carrito.'}
                </p>
            </Alert>
            <div className="d-flex flex-wrap gap-2">
                <Button as={Link} to={esCorrecto ? '/productos' : '/checkout'} variant="success">
                    {esCorrecto ? 'Volver a productos' : 'Intentar nuevamente'}
                </Button>
                <Button as={Link} to="/" variant="outline-secondary">Ir al inicio</Button>
            </div>
        </ContenedorPagina>
    )
}
