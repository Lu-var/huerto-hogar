import Button from 'react-bootstrap/Button'
import { Link } from 'react-router-dom'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AlertaEstado from './AlertaEstado.jsx'

export default function Ofertas() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Ofertas"
                descripcion="Consulta aquí las promociones publicadas por HuertoHogar."
            />
            <AlertaEstado variante="info" titulo="No hay ofertas publicadas">
                Actualmente no existen productos con una oferta activa.
            </AlertaEstado>
            <Button as={Link} to="/productos" variant="success">
                Revisar todos los productos
            </Button>
        </ContenedorPagina>
    )
}
