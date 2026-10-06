export default function EncabezadoSeccion({ titulo, descripcion }) {
    return (
        <div className="mb-4">
            <h2 className="mb-2">{titulo}</h2>
            {descripcion && <p className="mb-0 text-secondary">{descripcion}</p>}
        </div>
    )
}
