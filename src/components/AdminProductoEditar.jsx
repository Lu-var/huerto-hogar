import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioProducto from './AdminFormularioProducto.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductoEditar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const producto = productosRepositorio.obtenerPorId(Number(id))

    if (!producto) {
        return <ContenedorPagina><Alert variant="warning" role="alert">Producto no encontrado.</Alert><Button variant="success" onClick={() => navigate('/admin/productos')}>Volver a productos</Button></ContenedorPagina>
    }

    function guardar(cambios) {
        productosRepositorio.actualizar(producto.id, cambios)
        navigate(`/admin/productos/${producto.id}`)
    }

    return <ContenedorPagina><EncabezadoSeccion titulo={`Editar ${producto.nombre}`} descripcion="Actualiza los datos del producto." /><AdminFormularioProducto producto={producto} alGuardar={guardar} /></ContenedorPagina>
}
