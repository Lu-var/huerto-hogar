import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import AlertaEstado from './AlertaEstado.jsx'

export default function AdminInicio() {
    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Panel de administración"
                descripcion="Desde aquí se gestionarán las operaciones de HuertoHogar."
            />
            <AlertaEstado variante="info" titulo="Panel en preparación">
                El acceso administrativo está habilitado. Las vistas de gestión se incorporarán en los siguientes módulos.
            </AlertaEstado>
        </ContenedorPagina>
    )
}
