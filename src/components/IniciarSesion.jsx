import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import FormularioAutenticacion from './FormularioAutenticacion.jsx'

export default function IniciarSesion() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Iniciar sesión"
                descripcion="Accede a la cuenta simulada guardada en este navegador."
            />
            <FormularioAutenticacion modo="inicio" />
        </ContenedorPagina>
    )
}
