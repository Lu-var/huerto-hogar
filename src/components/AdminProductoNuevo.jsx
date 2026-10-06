import { useNavigate } from 'react-router-dom'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioProducto from './AdminFormularioProducto.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductoNuevo() {
    const navigate = useNavigate()

    function guardar(datos) {
        const siguienteId = productosRepositorio.obtenerTodos().reduce((mayor, producto) => Math.max(mayor, Number(producto.id) || 0), 0) + 1
        productosRepositorio.crear({ id: siguienteId, ...datos })
        navigate(`/admin/productos/${siguienteId}`)
    }

    return <ContenedorPagina><EncabezadoSeccion titulo="Nuevo producto" descripcion="Agrega un producto al catálogo administrativo." /><AdminFormularioProducto alGuardar={guardar} textoBoton="Crear producto" /></ContenedorPagina>
}
