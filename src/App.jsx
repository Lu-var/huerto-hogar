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
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
