import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Encabezado from './components/Encabezado.jsx'
import Productos from './components/Productos.jsx'
import Nosotros from './components/Nosotros.jsx'
import Contacto from './components/Contacto.jsx'

export function App() {
  return (
    <BrowserRouter>
      <Encabezado />

      <Routes>
        {/* TODO: portear old/index.html a Inicio.jsx y cambiar este redirect */}
        <Route path="/" element={<Navigate to="/productos" replace />} />
        <Route path="/productos" element={<Productos />} />
        <Route path="/nosotros" element={<Nosotros />} />
        <Route path="/contacto" element={<Contacto />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
