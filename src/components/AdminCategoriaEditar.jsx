import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioCategoria from './AdminFormularioCategoria.jsx'
import { categoriasRepositorio } from '../data/categorias.js'

export default function AdminCategoriaEditar() {
    const { slug } = useParams()
    const navigate = useNavigate()
    const categoria = categoriasRepositorio.obtenerPorId(slug)

    if (!categoria) {
        return <ContenedorPagina><Alert variant="warning" role="alert">Categoría no encontrada.</Alert><Button variant="success" onClick={() => navigate('/admin/categorias')}>Volver a categorías</Button></ContenedorPagina>
    }

    function guardar(cambios) {
        const categoriaExistente = categoriasRepositorio.obtenerPorId(cambios.id)
        if (cambios.id !== categoria.id && categoriaExistente) {
            window.alert('Ya existe una categoría con ese nombre.')
            return
        }
        categoriasRepositorio.eliminar(categoria.id)
        categoriasRepositorio.crear({ ...categoria, ...cambios })
        navigate('/admin/categorias')
    }

    return <ContenedorPagina><EncabezadoSeccion titulo={`Editar ${categoria.nombre}`} descripcion="Actualiza el nombre de la categoría." /><AdminFormularioCategoria categoria={categoria} alGuardar={guardar} /></ContenedorPagina>
}
