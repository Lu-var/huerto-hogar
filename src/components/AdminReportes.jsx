import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import Table from 'react-bootstrap/Table'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { ordenesRepositorio, productosRepositorio, usuariosRepositorio } from '../data/repositorios.js'

export default function AdminReportes() {
    const [reporte, setReporte] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                const ordenes = ordenesRepositorio.obtenerTodos()
                const productos = productosRepositorio.obtenerTodos()
                const usuarios = usuariosRepositorio.obtenerTodos()
                const estados = ordenes.reduce((acumulado, orden) => {
                    const estado = orden.estado || 'sin estado'
                    acumulado[estado] = (acumulado[estado] || 0) + 1
                    return acumulado
                }, {})
                setReporte({
                    ordenes,
                    totalVentas: ordenes.reduce((total, orden) => total + (Number(orden.total) || 0), 0),
                    productos: productos.length,
                    usuarios: usuarios.length,
                    estados,
                })
            } catch (errorLectura) {
                setError(errorLectura.message)
            }
        }, 0)
        return () => window.clearTimeout(temporizador)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo="Reportes" descripcion="Información consolidada a partir de órdenes, productos y usuarios persistidos." />
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            {!error && !reporte && <Alert variant="info" role="status">Generando reportes...</Alert>}
            {reporte && (
                <>
                    <Row className="g-3 mb-4">
                        <Col sm={6} xl={3}><Card className="h-100 tarjeta-metrica"><Card.Body><Card.Subtitle>Órdenes</Card.Subtitle><Card.Title>{reporte.ordenes.length}</Card.Title></Card.Body></Card></Col>
                        <Col sm={6} xl={3}><Card className="h-100 tarjeta-metrica"><Card.Body><Card.Subtitle>Ventas</Card.Subtitle><Card.Title>${reporte.totalVentas.toLocaleString('es-CL')}</Card.Title></Card.Body></Card></Col>
                        <Col sm={6} xl={3}><Card className="h-100 tarjeta-metrica"><Card.Body><Card.Subtitle>Productos</Card.Subtitle><Card.Title>{reporte.productos}</Card.Title></Card.Body></Card></Col>
                        <Col sm={6} xl={3}><Card className="h-100 tarjeta-metrica"><Card.Body><Card.Subtitle>Usuarios</Card.Subtitle><Card.Title>{reporte.usuarios}</Card.Title></Card.Body></Card></Col>
                    </Row>
                    {reporte.ordenes.length === 0
                        ? <Alert variant="info" role="status">No hay órdenes para desglosar por estado.</Alert>
                        : <Table responsive striped bordered><thead><tr><th>Estado</th><th>Cantidad</th></tr></thead><tbody>{Object.entries(reporte.estados).map(([estado, cantidad]) => <tr key={estado}><td>{estado}</td><td>{cantidad}</td></tr>)}</tbody></Table>}
                </>
            )}
        </ContenedorPagina>
    )
}
