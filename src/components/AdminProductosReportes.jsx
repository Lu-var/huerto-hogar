import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { productosRepositorio } from '../data/repositorios.js'

export default function AdminProductosReportes() {
    const [resumen, setResumen] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                const productos = productosRepositorio.obtenerTodos()
                setResumen({
                    total: productos.length,
                    conStock: productos.filter((producto) => Number.isInteger(producto.stock)).length,
                    sinStock: productos.filter((producto) => Number.isInteger(producto.stock) && producto.stock === 0).length,
                    valorCatalogo: productos.reduce((total, producto) => total + (Number(producto.precio) || 0), 0),
                })
            } catch (errorLectura) {
                setError(errorLectura.message)
            }
        }, 0)
        return () => window.clearTimeout(temporizador)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion titulo="Reportes de productos" descripcion="Resumen calculado desde los productos persistidos." />
            {error && <Alert variant="danger" role="alert">{error}</Alert>}
            {!error && !resumen && <Alert variant="info" role="status">Generando reporte...</Alert>}
            {resumen && (
                <Row className="g-3">
                    <Col sm={6} xl={3}><Card><Card.Body><Card.Subtitle>Total de productos</Card.Subtitle><Card.Title>{resumen.total}</Card.Title></Card.Body></Card></Col>
                    <Col sm={6} xl={3}><Card><Card.Body><Card.Subtitle>Stock informado</Card.Subtitle><Card.Title>{resumen.conStock}</Card.Title></Card.Body></Card></Col>
                    <Col sm={6} xl={3}><Card><Card.Body><Card.Subtitle>Sin stock</Card.Subtitle><Card.Title>{resumen.sinStock}</Card.Title></Card.Body></Card></Col>
                    <Col sm={6} xl={3}><Card><Card.Body><Card.Subtitle>Suma de precios</Card.Subtitle><Card.Title>${resumen.valorCatalogo.toLocaleString('es-CL')}</Card.Title></Card.Body></Card></Col>
                </Row>
            )}
        </ContenedorPagina>
    )
}
