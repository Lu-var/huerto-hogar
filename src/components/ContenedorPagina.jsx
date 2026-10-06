import Container from 'react-bootstrap/Container'

export default function ContenedorPagina({ children, className = '' }) {
    return (
        <Container className={`py-4 ${className}`.trim()}>
            {children}
        </Container>
    )
}
