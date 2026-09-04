const formulario = document.getElementById("formulario-contacto");

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

let carrito = 0;
let total = 0;
let productosCarrito = [];
function agregarAlCarrito(nombre, precio) {

    carrito = carrito + 1;
    total = total + precio;

    productosCarrito.push(nombre);

    document.getElementById("contador-carrito").textContent =
        "Carrito: " + carrito + " productos";

    document.getElementById("lista-carrito").innerHTML =
        productosCarrito.join("<br>");

    document.getElementById("total-carrito").textContent =
    "Total: $" + total;
    console.log("Producto: " + nombre);
    console.log("Precio: $" + precio);
    console.log("Total: $" + total);
}
function vaciarCarrito() {

    carrito = 0;
    total = 0;
    productosCarrito = [];

    document.getElementById("contador-carrito").textContent =
        "Carrito: 0 productos";

    document.getElementById("lista-carrito").textContent =
        "No hay productos en el carrito.";

    document.getElementById("total-carrito").textContent =
        "Total: $0";
}
