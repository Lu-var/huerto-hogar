import { useNavigate } from 'react-router-dom'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioCategoria from './AdminFormularioCategoria.jsx'
import { categoriasRepositorio } from '../data/categorias.js'

export default function AdminCategoriaNueva() {
    const navigate = useNavigate()
    function guardar(cambios) {
        categoriasRepositorio.crear({ ...cambios, productoIds: [] })
        navigate('/admin/categorias')
    }
    return <ContenedorPagina><EncabezadoSeccion titulo="Nueva categoría" descripcion="Crea una categoría sin productos asociados inicialmente." /><AdminFormularioCategoria alGuardar={guardar} textoBoton="Crear categoría" /></ContenedorPagina>
}
