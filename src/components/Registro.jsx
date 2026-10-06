import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import FormularioAutenticacion from './FormularioAutenticacion.jsx'

export default function Registro() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Registro"
                descripcion="Crea una cuenta simulada para esta sesión de navegación."
            />
            <FormularioAutenticacion modo="registro" />
        </ContenedorPagina>
    )
}
