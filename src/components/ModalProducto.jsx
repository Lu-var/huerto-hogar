export default function ModalProducto({ producto, onClose, onAgregar }) {
    return (
        <div id="modal-producto" onClick={onClose}>
            <div id="contenido-producto" onClick={(e) => e.stopPropagation()}>
                <h3 id="modal-nombre">{producto.nombre}</h3>
                <p id="modal-precio">Precio: ${producto.precio}</p>
                <p id="modal-unidad">Unidad: {producto.unidad}</p>
                <p id="modal-origen">Origen: {producto.origen}</p>
                <p id="modal-descripcion">Descripcion: {producto.descripcion}</p>
                <p id="modal-curiosidad">Curiosidad: {producto.curiosidad}</p>
                {/* <button onClick={() => agregarProductoModal()}>Agregar al carrito</button>
                <button onClick={() => cerrarDescripcion()}>Cerrar</button> */}
                <button onClick={onAgregar}>Agregar al carrito</button>
                <button onClick={onClose}>Cerrar</button>
            </div>
        </div>
    )
}
