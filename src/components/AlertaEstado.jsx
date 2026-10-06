import Alert from 'react-bootstrap/Alert'

const variantesPermitidas = ['primary', 'secondary', 'success', 'danger', 'warning', 'info', 'light', 'dark']

export default function AlertaEstado({ children, variante = 'info', titulo }) {
    const varianteSegura = variantesPermitidas.includes(variante) ? variante : 'info'

    return (
        <Alert variant={varianteSegura} role="status">
            {titulo && <Alert.Heading>{titulo}</Alert.Heading>}
            {children}
        </Alert>
    )
}
