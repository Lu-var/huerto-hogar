import { BrowserRouter, Routes, Route } from 'react-router-dom'
import DiseñoAplicacion from './components/DiseñoAplicacion.jsx'
import Inicio from './components/Inicio.jsx'
import Productos from './components/Productos.jsx'
import Nosotros from './components/Nosotros.jsx'
import Contacto from './components/Contacto.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<DiseñoAplicacion />}>
          <Route path="/" element={<Inicio />} />
          <Route path="/productos" element={<Productos />} />
          <Route path="/nosotros" element={<Nosotros />} />
          <Route path="/contacto" element={<Contacto />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
