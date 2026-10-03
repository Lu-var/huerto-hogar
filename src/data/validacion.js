const formulario = document.getElementById("formulario-contacto");

// Valida que el formulario de contacto tenga datos antes de enviarse.
if (formulario) {

    formulario.addEventListener("submit", function(event) {

        const nombre = document.querySelector("input[type='text']").value;
        const correo = document.querySelector("input[type='email']").value;
        const mensaje = document.querySelector("textarea").value;

        if (nombre === "" || correo === "" || mensaje === "") {
            event.preventDefault();
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!correo.includes("@")) {
            event.preventDefault();
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        alert("Mensaje enviado correctamente.");

    });

}

let carrito = [];
let total = 0;
let productoSeleccionado = null;

// Agrega un producto al carrito o aumenta su cantidad si ya existe.
function agregarAlCarrito(nombre, precio, unidad) {
    
    const productoExistente = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (productoExistente) {

        productoExistente.cantidad++;
    } else {
        carrito.push({
            nombre: nombre,
            precio: precio,
            unidad: unidad,
            cantidad: 1
        });
        
    }
    
    mostrarCarrito();
}

// Suma una unidad al producto seleccionado.
function aumentarCantidad(nombre) {

    carrito.forEach(function(producto) {
        if (producto.nombre === nombre) {
            producto.cantidad++;
        }
    });

    mostrarCarrito();
}

// Resta una unidad y confirma antes de quitar el producto si queda en cero.
function disminuirCantidad(nombre) {

    carrito.forEach(function(producto) {
        if (producto.nombre === nombre) {
            if (producto.cantidad === 1) {
                const confirmar = confirm("Quieres quitar " + producto.nombre + " del carrito?");

                if (confirmar) {
                    producto.cantidad--;
                }
            } else {
                producto.cantidad--;
            }
        }
    });

    carrito = carrito.filter(function(producto) {
        return producto.cantidad > 0;
    });

    mostrarCarrito();
}

// Elimina un producto completo del carrito.
function quitarProducto(nombre) {

    const producto = carrito.find(function(producto) {
        return producto.nombre === nombre;
    });

    if (producto && producto.cantidad === 1) {
        const confirmar = confirm("Quieres quitar " + producto.nombre + " del carrito?");

        if (!confirmar) {
            return;
        }
    }

    carrito = carrito.filter(function(producto) {
        return producto.nombre !== nombre;
    });

    mostrarCarrito();
}

// Actualiza la lista, el contador y el total que se muestran en pantalla.
function mostrarCarrito() {

    const listaCarrito = document.getElementById("lista-carrito");
    const contadorCarrito = document.getElementById("contador-carrito");
    const totalCarrito = document.getElementById("total-carrito");

    total = 0;

    let cantidadProductos = 0;
    let contenido = "";

     carrito.forEach(function(producto) {

        total = total + (producto.precio * producto.cantidad);

        cantidadProductos = cantidadProductos + producto.cantidad;

        contenido += producto.nombre + " x " + producto.cantidad + " ";
        contenido += "<button class=\"boton-cantidad\" onclick=\"disminuirCantidad('" + producto.nombre + "')\">-</button> ";
        contenido += "<button class=\"boton-cantidad\" onclick=\"aumentarCantidad('" + producto.nombre + "')\">+</button> ";
        contenido += "<button class=\"boton-quitar\" onclick=\"quitarProducto('" + producto.nombre + "')\">Quitar</button><br>";
        contenido += "<small>$" + producto.precio + " por " + producto.unidad + "</small><br>";
        contenido += "<br>";
    });

    if (carrito.length === 0) {

        listaCarrito.textContent =
            "No hay productos en el carrito.";

    } else {

        listaCarrito.innerHTML = contenido;

    }

    contadorCarrito.textContent =
        "Carrito: " + cantidadProductos + " productos";

    totalCarrito.textContent =
        "Total: $" + total;
}


// Vacía todo el carrito después de pedir confirmación.
function vaciarCarrito() {

    if (carrito.length === 0) {
        return;
    }

    const confirmar = confirm("Quieres vaciar todo el carrito?");

    if (!confirmar) {
        return;
    }

    carrito = [];
    total = 0;

    mostrarCarrito();

}

// Oculta el carrito y muestra el boton para volver a verlo.
function ocultarCarrito() {

    document.getElementById("carrito").style.display = "none";
    document.getElementById("boton-mostrar-carrito").style.display = "inline-block";
}

// Vuelve a mostrar el carrito.
function mostrarPanelCarrito() {

    document.getElementById("carrito").style.display = "block";
    document.getElementById("boton-mostrar-carrito").style.display = "inline-block";
    document.getElementById("boton-mostrar-carrito").style.display = "none";
}

// Muestra una ventana flotante con los datos del producto seleccionado.
function mostrarDescripcion(id) {

    const producto = productos.find(function(producto) {
        return producto.id === id;
    });

    if (producto) {
        productoSeleccionado = producto;

        document.getElementById("modal-nombre").textContent = producto.nombre;
        document.getElementById("modal-precio").textContent = "Precio: $" + producto.precio;
        document.getElementById("modal-unidad").textContent = "Unidad: " + producto.unidad;
        document.getElementById("modal-origen").textContent = "Origen: " + producto.origen;
        document.getElementById("modal-descripcion").textContent = "Descripcion: " + producto.descripcion;
        document.getElementById("modal-curiosidad").textContent = "Curiosidad: " + producto.curiosidad;

        document.getElementById("ventana-producto").style.display = "flex";
    }
}

// Agrega al carrito el producto que esta abierto en la ventana flotante.
function agregarProductoModal() {

    if (productoSeleccionado) {
        agregarAlCarrito(productoSeleccionado.nombre, productoSeleccionado.precio, productoSeleccionado.unidad);
    }
}

// Cierra la ventana flotante del producto.
function cerrarDescripcion() {

    document.getElementById("ventana-producto").style.display = "none";
}
