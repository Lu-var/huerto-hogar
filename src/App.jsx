import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiseñoAplicacion from './components/DiseñoAplicacion.jsx'
import Inicio from './components/Inicio.jsx'
import Productos from './components/Productos.jsx'
import Nosotros from './components/Nosotros.jsx'
import Contacto from './components/Contacto.jsx'
import Categorias from './components/Categorias.jsx'
import Categoria from './components/Categoria.jsx'
import Ofertas from './components/Ofertas.jsx'
import DetalleProducto from './components/DetalleProducto.jsx'
import Registro from './components/Registro.jsx'
import IniciarSesion from './components/IniciarSesion.jsx'
import Blogs from './components/Blogs.jsx'
import DetalleBlog from './components/DetalleBlog.jsx'
import Checkout from './components/Checkout.jsx'
import ResultadoPago from './components/ResultadoPago.jsx'
import AccesoAdministracion from './components/AccesoAdministracion.jsx'
import ProteccionAdministracion from './components/ProteccionAdministracion.jsx'
import DiseñoAdministracion from './components/DiseñoAdministracion.jsx'
import AdminInicio from './components/AdminInicio.jsx'
import AdminOrdenes from './components/AdminOrdenes.jsx'
import AdminDetalleOrden from './components/AdminDetalleOrden.jsx'
import AdminProductos from './components/AdminProductos.jsx'
import AdminProductoDetalle from './components/AdminProductoDetalle.jsx'
import AdminProductoNuevo from './components/AdminProductoNuevo.jsx'
import AdminProductoEditar from './components/AdminProductoEditar.jsx'
import AdminProductosCriticos from './components/AdminProductosCriticos.jsx'
import AdminProductosReportes from './components/AdminProductosReportes.jsx'
import AdminCategorias from './components/AdminCategorias.jsx'
import AdminCategoriaNueva from './components/AdminCategoriaNueva.jsx'
import AdminCategoriaEditar from './components/AdminCategoriaEditar.jsx'
import AdminUsuarios from './components/AdminUsuarios.jsx'
import AdminUsuarioNuevo from './components/AdminUsuarioNuevo.jsx'
import AdminUsuarioDetalle from './components/AdminUsuarioDetalle.jsx'
import AdminUsuarioEditar from './components/AdminUsuarioEditar.jsx'
import AdminUsuarioHistorial from './components/AdminUsuarioHistorial.jsx'
import AdminPerfil from './components/AdminPerfil.jsx'
import AdminReportes from './components/AdminReportes.jsx'
import AdminTienda from './components/AdminTienda.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DiseñoAplicacion />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/productos/:id" element={<DetalleProducto />} />
          <Route path="/categorias" element={<Categorias />} />
          <Route path="/categorias/:slug" element={<Categoria />} />
          <Route path="/ofertas" element={<Ofertas />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/iniciar-sesion" element={<IniciarSesion />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:id" element={<DetalleBlog />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/checkout/pago-correcto" element={<ResultadoPago estado="correcto" />} />
          <Route path="/checkout/pago-error" element={<ResultadoPago estado="error" />} />
        </Route>
        <Route path="/admin/iniciar-sesion" element={<AccesoAdministracion />} />
        <Route element={<ProteccionAdministracion />}>
          <Route element={<DiseñoAdministracion />}>
            <Route path="/admin" element={<AdminInicio />} />
            <Route path="/admin/ordenes" element={<AdminOrdenes />} />
            <Route path="/admin/ordenes/:id" element={<AdminDetalleOrden />} />
            <Route path="/admin/productos" element={<AdminProductos />} />
            <Route path="/admin/productos/nuevo" element={<AdminProductoNuevo />} />
            <Route path="/admin/productos/criticos" element={<AdminProductosCriticos />} />
            <Route path="/admin/productos/reportes" element={<AdminProductosReportes />} />
            <Route path="/admin/productos/:id/editar" element={<AdminProductoEditar />} />
            <Route path="/admin/productos/:id" element={<AdminProductoDetalle />} />
            <Route path="/admin/categorias" element={<AdminCategorias />} />
            <Route path="/admin/categorias/nueva" element={<AdminCategoriaNueva />} />
            <Route path="/admin/categorias/:slug/editar" element={<AdminCategoriaEditar />} />
            <Route path="/admin/usuarios" element={<AdminUsuarios />} />
            <Route path="/admin/usuarios/nuevo" element={<AdminUsuarioNuevo />} />
            <Route path="/admin/usuarios/:id/historial" element={<AdminUsuarioHistorial />} />
            <Route path="/admin/usuarios/:id/editar" element={<AdminUsuarioEditar />} />
            <Route path="/admin/usuarios/:id" element={<AdminUsuarioDetalle />} />
            <Route path="/admin/perfil" element={<AdminPerfil />} />
            <Route path="/admin/reportes" element={<AdminReportes />} />
            <Route path="/admin/tienda" element={<AdminTienda />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
