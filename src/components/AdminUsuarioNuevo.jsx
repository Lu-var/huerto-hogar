import { useNavigate } from 'react-router-dom'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AdminFormularioUsuario from './AdminFormularioUsuario.jsx'
import { usuariosRepositorio } from '../data/repositorios.js'

export default function AdminUsuarioNuevo() {
    const navigate = useNavigate()
    function guardar(datos) {
        const usuario = { id: `usuario-${Date.now()}`, ...datos }
        usuariosRepositorio.crear(usuario)
        navigate(`/admin/usuarios/${usuario.id}`)
    }
    return <ContenedorPagina><EncabezadoSeccion titulo="Nuevo usuario" descripcion="Crea una cuenta local para el sistema." /><AdminFormularioUsuario alGuardar={guardar} textoBoton="Crear usuario" /></ContenedorPagina>
}
