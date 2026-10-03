import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Encabezado from './components/Encabezado.jsx'
import Inicio from './components/Inicio.jsx'
import Productos from './components/Productos.jsx'
import Nosotros from './components/Nosotros.jsx'
import Contacto from './components/Contacto.jsx'
import PiePagina from './components/PiePagina.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Encabezado />

      <Routes>
        <Route path="/" element={<Inicio />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>

      <PiePagina />
    </BrowserRouter>
  )
}

export default App
