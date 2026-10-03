import { useState } from 'react'
import { productos } from '../data/productos.js'
import ModalProducto from './ModalProducto.jsx'

export default function Productos() {

    const [carrito, setCarrito] = useState([])
    const [productoAbierto, setProductoAbierto] = useState(null)
    const [carritoVisible, setCarritoVisible] = useState(true)

    function agregarAlCarrito(nombre, precio, unidad) {

        // const productoExistente = carrito.find(function(producto) {
        //     return producto.nombre === nombre;
        // });

        // if (productoExistente) {

        //     productoExistente.cantidad++;
        // } else {
        //     carrito.push({
        //         nombre: nombre,
        //         precio: precio,
        //         unidad: unidad,
        //         cantidad: 1
        //     });

        // }

        // mostrarCarrito();

        const productoExistente = carrito.find((producto) => producto.nombre === nombre);

        if (productoExistente) {
            setCarrito(carrito.map((producto) =>
                producto.nombre === nombre
                    ? { ...producto, cantidad: producto.cantidad + 1 }
                    : producto
            ));
        } else {
            setCarrito([...carrito, { nombre, precio, unidad, cantidad: 1 }]);
        }
    }

    function aumentarCantidad(nombre) {

        // carrito.forEach(function(producto) {
        //     if (producto.nombre === nombre) {
        //         producto.cantidad++;
        //     }
        // });

        // mostrarCarrito();

        setCarrito(carrito.map((producto) =>
            producto.nombre === nombre
                ? { ...producto, cantidad: producto.cantidad + 1 }
                : producto
        ));
    }

    function disminuirCantidad(nombre) {

        // carrito.forEach(function(producto) {
        //     if (producto.nombre === nombre) {
        //         if (producto.cantidad === 1) {
        //             const confirmar = confirm("Quieres quitar " + producto.nombre + " del carrito?");

        //             if (confirmar) {
        //                 producto.cantidad--;
        //             }
        //         } else {
        //             producto.cantidad--;
        //         }
        //     }
        // });

        // carrito = carrito.filter(function(producto) {
        //     return producto.cantidad > 0;
        // });

        // mostrarCarrito();

        const producto = carrito.find((p) => p.nombre === nombre);

        if (!producto) {
            return;
        }

        if (producto.cantidad === 1) {
            if (!confirm("Quieres quitar " + producto.nombre + " del carrito?")) {
                return;
            }
            setCarrito(carrito.filter((p) => p.nombre !== nombre));
        } else {
            setCarrito(carrito.map((p) =>
                p.nombre === nombre ? { ...p, cantidad: p.cantidad - 1 } : p
            ));
        }
    }

    function quitarProducto(nombre) {

        // const producto = carrito.find(function(producto) {
        //     return producto.nombre === nombre;
        // });

        // if (producto && producto.cantidad === 1) {
        //     const confirmar = confirm("Quieres quitar " + producto.nombre + " del carrito?");

        //     if (!confirmar) {
        //         return;
        //     }
        // }

        // carrito = carrito.filter(function(producto) {
        //     return producto.nombre !== nombre;
        // });

        // mostrarCarrito();

        const producto = carrito.find((p) => p.nombre === nombre);

        if (producto && producto.cantidad === 1) {
            if (!confirm("Quieres quitar " + producto.nombre + " del carrito?")) {
                return;
            }
        }

        setCarrito(carrito.filter((p) => p.nombre !== nombre));
    }

    function mostrarCarrito() {

        // const listaCarrito = document.getElementById("lista-carrito");
        // const contadorCarrito = document.getElementById("contador-carrito");
        // const totalCarrito = document.getElementById("total-carrito");

        // total = 0;

        // let cantidadProductos = 0;
        // let contenido = "";

        //  carrito.forEach(function(producto) {

        //     total = total + (producto.precio * producto.cantidad);

        //     cantidadProductos = cantidadProductos + producto.cantidad;

        //     contenido += producto.nombre + " x " + producto.cantidad + " ";
        //     contenido += "<button class=\"boton-cantidad\" onclick=\"disminuirCantidad('" + producto.nombre + "')\">-</button> ";
        //     contenido += "<button class=\"boton-cantidad\" onclick=\"aumentarCantidad('" + producto.nombre + "')\">+</button> ";
        //     contenido += "<button class=\"boton-quitar\" onclick=\"quitarProducto('" + producto.nombre + "')\">Quitar</button><br>";
        //     contenido += "<small>$" + producto.precio + " por " + producto.unidad + "</small><br>";
        //     contenido += "<br>";
        // });

        // if (carrito.length === 0) {

        //     listaCarrito.textContent =
        //         "No hay productos en el carrito.";

        // } else {

        //     listaCarrito.innerHTML = contenido;

        // }

        // contadorCarrito.textContent =
        //     "Carrito: " + cantidadProductos + " productos";

        // totalCarrito.textContent =
        //     "Total: $" + total;
    }

    // En React no hace falta redibujar la interfaz a mano: todo se redibuja
    // solo cuando cambia el estado. Por eso mostrarCarrito() queda vacio.

    function vaciarCarrito() {

        // if (carrito.length === 0) {
        //     return;
        // }

        // const confirmar = confirm("Quieres vaciar todo el carrito?");

        // if (!confirmar) {
        //     return;
        // }

        // carrito = [];
        // total = 0;

        // mostrarCarrito();

        if (carrito.length === 0) {
            return;
        }

        if (confirm("Quieres vaciar todo el carrito?")) {
            setCarrito([]);
        }
    }

    // Oculta el carrito y muestra el boton para volver a verlo.
    function ocultarCarrito() {

        // document.getElementById("carrito").style.display = "none";
        // document.getElementById("boton-mostrar-carrito").style.display = "inline-block";

        setCarritoVisible(false);
    }

    // Vuelve a mostrar el carrito.
    function mostrarPanelCarrito() {

        // document.getElementById("carrito").style.display = "block";
        // document.getElementById("boton-mostrar-carrito").style.display = "inline-block";
        // document.getElementById("boton-mostrar-carrito").style.display = "none";

        setCarritoVisible(true);
    }

    // Muestra una ventana flotante con los datos del producto seleccionado.
    function mostrarDescripcion(id) {

        // const producto = productos.find(function(producto) {
        //     return producto.id === id;
        // });

        // if (producto) {
        //     productoSeleccionado = producto;

        //     document.getElementById("modal-nombre").textContent = producto.nombre;
        //     document.getElementById("modal-precio").textContent = "Precio: $" + producto.precio;
        //     document.getElementById("modal-unidad").textContent = "Unidad: " + producto.unidad;
        //     document.getElementById("modal-origen").textContent = "Origen: " + producto.origen;
        //     document.getElementById("modal-descripcion").textContent = "Descripcion: " + producto.descripcion;
        //     document.getElementById("modal-curiosidad").textContent = "Curiosidad: " + producto.curiosidad;

        //     document.getElementById("ventana-producto").style.display = "flex";
        // }

        const producto = productos.find((producto) => producto.id === id);

        if (producto) {
            setProductoAbierto(producto);
        }
    }

    // Agrega al carrito el producto que esta abierto en la ventana flotante.
    function agregarProductoModal() {

        // if (productoSeleccionado) {
        //     agregarAlCarrito(productoSeleccionado.nombre, productoSeleccionado.precio, productoSeleccionado.unidad);
        // }

        if (productoAbierto) {
            agregarAlCarrito(productoAbierto.nombre, productoAbierto.precio, productoAbierto.unidad);
        }
    }

    // Cierra la ventana flotante del producto.
    function cerrarDescripcion() {

        // document.getElementById("ventana-producto").style.display = "none";

        setProductoAbierto(null);
    }

    const cantidadProductos = carrito.reduce((total, producto) => total + producto.cantidad, 0);
    const total = carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0);

    return (
        <>

            <main>

                <section className="zona-superior">

                    <div>
                        <h2>Nuestros productos</h2>
                        <p id="contador-carrito">Carrito: {cantidadProductos} productos</p>
                        {!carritoVisible && (
                            <button id="boton-mostrar-carrito" onClick={() => mostrarPanelCarrito()}>Mostrar carrito</button>
                        )}
                    </div>

                    {carritoVisible && (
                        <div id="carrito">
                            <h3>Mi carrito</h3>

                            {carrito.length === 0 ? (
                                <p id="lista-carrito">No hay productos en el carrito.</p>
                            ) : (
                                <div id="lista-carrito">
                                    {carrito.map((producto) => (
                                        <div key={producto.nombre}>
                                            {producto.nombre} x {producto.cantidad}{" "}
                                            <button className="boton-cantidad" onClick={() => disminuirCantidad(producto.nombre)}>-</button>
                                            <button className="boton-cantidad" onClick={() => aumentarCantidad(producto.nombre)}>+</button>
                                            <button className="boton-quitar" onClick={() => quitarProducto(producto.nombre)}>Quitar</button>
                                            <br />
                                            <small>${producto.precio} por {producto.unidad}</small>
                                            <br />
                                            <br />
                                        </div>
                                    ))}
                                </div>
                            )}

                            <button onClick={() => ocultarCarrito()}>Ocultar carrito</button>
                            <button onClick={() => vaciarCarrito()}>Vaciar carrito</button>
                            <p id="total-carrito">Total: ${total}</p>
                        </div>
                    )}

                </section>

                <section className="categoria">
                    <h3>Frutas Frescas</h3>

                    <article>
                        <h4>Manzanas Fuji</h4>
                        <img src="/img/Manzana-Fuji.png" alt="Manzanas Fuji" onClick={() => mostrarDescripcion(1)} />
                        <p>Precio: $1.200 por kg</p>
                        <button onClick={() => agregarAlCarrito('Manzanas Fuji', 1200, 'kg')}>Agregar al carrito</button>
                    </article>

                    <article>
                        <h4>Naranjas Valencia</h4>
                        <img src="/img/Naranja-organica.jpg" alt="Naranjas Valencia" onClick={() => mostrarDescripcion(2)} />
                        <p>Precio: $1.000 por kg</p>
                        <button onClick={() => agregarAlCarrito('Naranjas Valencia', 1000, 'kg')}>Agregar al carrito</button>
                    </article>

                    <article>
                        <h4>Plátanos</h4>
                        <img src="/img/Platano-granel.jpg" alt="Plátanos" onClick={() => mostrarDescripcion(3)} />
                        <p>Precio: $800 por kg</p>
                        <button onClick={() => agregarAlCarrito('Plátanos', 800, 'kg')}>Agregar al carrito</button>
                    </article>

                </section>

                <section className="categoria">
                    <h3>Verduras Orgánicas</h3>

                    <article>
                        <h4>Zanahorias Orgánicas</h4>
                        <img src="/img/Zanahorias.jpg" alt="Zanahorias Orgánicas" onClick={() => mostrarDescripcion(4)} />
                        <p>Precio: $900 por kg</p>
                        <button onClick={() => agregarAlCarrito('Zanahorias Orgánicas', 900, 'kg')}>Agregar al carrito</button>
                    </article>

                    <article>
                        <h4>Espinacas Frescas</h4>
                        <img src="/img/espinaca.jpg" alt="Espinacas Frescas" onClick={() => mostrarDescripcion(5)} />
                        <p>Precio: $700 por unidad</p>
                        <button onClick={() => agregarAlCarrito('Espinacas Frescas', 700, 'unidad')}>Agregar al carrito</button>
                    </article>

                    <article>
                        <h4>Pimientos Tricolores</h4>
                        <img src="/img/pimentones.jpg" alt="Pimientos Tricolores" onClick={() => mostrarDescripcion(6)} />
                        <p>Precio: $1.500 por unidad</p>
                        <button onClick={() => agregarAlCarrito('Pimientos Tricolores', 1500, 'unidad')}>Agregar al carrito</button>
                    </article>
                </section>

                <section className="categoria">
                    <h3>Productos Orgánicos</h3>

                    <article>
                        <h4>Miel Orgánica</h4>
                        <img src="/img/Miel.jpg" alt="Miel Orgánica" onClick={() => mostrarDescripcion(7)} />
                        <p>Precio: $5.000 por 500 g</p>
                        <button onClick={() => agregarAlCarrito('Miel Orgánica', 5000, '500 g')}>Agregar al carrito</button>
                    </article>

                    <article>
                        <h4>Quinua Orgánica</h4>
                        <img src="/img/Quinoa.jpg" alt="Quinua Orgánica" onClick={() => mostrarDescripcion(8)} />
                        <p>Precio: $3.000 por 500 g</p>
                        <button onClick={() => agregarAlCarrito('Quinua Orgánica', 3000, '500 g')}>Agregar al carrito</button>
                    </article>
                </section>

                <section className="categoria">
                    <h3>Productos Lácteos</h3>

                    <article>
                        <h4>Leche Entera</h4>
                        <img src="/img/Leche-blanca.png" alt="Leche Entera" onClick={() => mostrarDescripcion(9)} />
                        <p>Precio: $1.200 por litro</p>
                        <button onClick={() => agregarAlCarrito('Leche Entera', 1200, 'litro')}>Agregar al carrito</button>
                    </article>
                </section>

            </main>

            {productoAbierto && (
                <ModalProducto
                    producto={productoAbierto}
                    onClose={cerrarDescripcion}
                    onAgregar={agregarProductoModal}
                />
            )}
        </>
    )
}
