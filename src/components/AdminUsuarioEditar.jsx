import { useNavigate, useParams } from 'react-router-dom'
import Alert from 'react-bootstrap/Alert'
import Button from 'react-bootstrap/Button'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioUsuario from './AdminFormularioUsuario.jsx'
import { usuariosRepositorio } from '../data/repositorios.js'

export default function AdminUsuarioEditar() {
    const { id } = useParams()
    const navigate = useNavigate()
    const usuario = usuariosRepositorio.obtenerPorId(id)

    if (!usuario) {
        return <ContenedorPagina><Alert variant="warning" role="alert">Usuario no encontrado.</Alert><Button variant="success" onClick={() => navigate('/admin/usuarios')}>Volver a usuarios</Button></ContenedorPagina>
    }

    function guardar(cambios) {
        usuariosRepositorio.actualizar(id, cambios)
        navigate(`/admin/usuarios/${id}`)
    }

    return <ContenedorPagina><EncabezadoSeccion titulo={`Editar ${usuario.nombre}`} descripcion="Actualiza los datos y el rol de la cuenta." /><AdminFormularioUsuario usuario={usuario} alGuardar={guardar} /></ContenedorPagina>
}
