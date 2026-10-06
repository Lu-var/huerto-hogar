import { useEffect, useState } from 'react'
import Alert from 'react-bootstrap/Alert'
import Card from 'react-bootstrap/Card'
import Col from 'react-bootstrap/Col'
import Row from 'react-bootstrap/Row'
import ContenedorPagina from './ContenedorPagina.jsx'
import EncabezadoSeccion from './EncabezadoSeccion.jsx'
import { productosRepositorio, usuariosRepositorio, blogsRepositorio, ordenesRepositorio } from '../data/repositorios.js'

const metricasIniciales = {
    productos: 0,
    usuarios: 0,
    blogs: 0,
    ordenes: 0,
    ventas: 0,
}

function leerMetricas() {
    const ordenes = ordenesRepositorio.obtenerTodos()

    return {
        productos: productosRepositorio.obtenerTodos().length,
        usuarios: usuariosRepositorio.obtenerTodos().length,
        blogs: blogsRepositorio.obtenerTodos().length,
        ordenes: ordenes.length,
        ventas: ordenes.reduce((total, orden) => total + (Number(orden.total) || 0), 0),
    }
}

function TarjetaMetrica({ etiqueta, valor, descripcion }) {
    return (
        <Col sm={6} xl={3}>
            <Card className="h-100 tarjeta-metrica">
                <Card.Body>
                    <Card.Subtitle className="mb-2 text-secondary">{etiqueta}</Card.Subtitle>
                    <Card.Title as="p" className="display-6 mb-2">{valor}</Card.Title>
                    <Card.Text className="small text-secondary mb-0">{descripcion}</Card.Text>
                </Card.Body>
            </Card>
        </Col>
    )
}

export default function AdminInicio() {
    const [metricas, setMetricas] = useState(metricasIniciales)
    const [estado, setEstado] = useState('cargando')
    const [error, setError] = useState('')

    useEffect(() => {
        const temporizador = window.setTimeout(() => {
            try {
                setMetricas(leerMetricas())
                setEstado('listo')
            } catch (errorLectura) {
                setError(errorLectura.message)
                setEstado('error')
            }
        }, 0)

        return () => window.clearTimeout(temporizador)
    }, [])

    return (
        <ContenedorPagina>
            <EncabezadoSeccion
                titulo="Panel de administración"
                descripcion="Resumen calculado a partir de los datos disponibles en este navegador."
            />
            {estado === 'cargando' && <Alert variant="info" role="status">Cargando resumen administrativo...</Alert>}
            {estado === 'error' && <Alert variant="danger" role="alert"><Alert.Heading>No se pudo cargar el resumen</Alert.Heading>{error}</Alert>}
            {estado === 'listo' && (
                metricas.productos === 0 && metricas.usuarios === 0 && metricas.blogs === 0 && metricas.ordenes === 0
                    ? <Alert variant="info" role="status">Todavía no hay datos administrativos para mostrar.</Alert>
                    : (
                        <Row className="g-3">
                            <TarjetaMetrica etiqueta="Productos" valor={metricas.productos} descripcion="Productos disponibles en el catálogo." />
                            <TarjetaMetrica etiqueta="Usuarios" valor={metricas.usuarios} descripcion="Cuentas registradas localmente." />
                            <TarjetaMetrica etiqueta="Artículos" valor={metricas.blogs} descripcion="Artículos almacenados para el blog." />
                            <TarjetaMetrica etiqueta="Órdenes" valor={metricas.ordenes} descripcion="Órdenes creadas desde checkout." />
                            <Col sm={6} xl={3}>
                                <Card className="h-100 tarjeta-metrica">
                                    <Card.Body>
                                        <Card.Subtitle className="mb-2 text-secondary">Ventas registradas</Card.Subtitle>
                                        <Card.Title as="p" className="display-6 mb-2">
                                            ${metricas.ventas.toLocaleString('es-CL')}
                                        </Card.Title>
                                        <Card.Text className="small text-secondary mb-0">Suma de órdenes persistidas.</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>
                    )
            )}
        </ContenedorPagina>
    )
}
