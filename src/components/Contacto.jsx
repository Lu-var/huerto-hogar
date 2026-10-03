import { useState } from 'react'

export default function Contacto() {

    const [nombre, setNombre] = useState("");
    const [correo, setCorreo] = useState("");
    const [mensaje, setMensaje] = useState("");

    // (js/validacion.js):
    //
    // const formulario = document.getElementById("formulario-contacto");
    //
    // if (formulario) {
    //
    //     formulario.addEventListener("submit", function(event) {
    //
    //         const nombre = document.querySelector("input[type='text']").value;
    //         const correo = document.querySelector("input[type='email']").value;
    //         const mensaje = document.querySelector("textarea").value;
    //
    //         if (nombre === "" || correo === "" || mensaje === "") {
    //             event.preventDefault();
    //             alert("Por favor, completa todos los campos.");
    //             return;
    //         }
    //
    //         if (!correo.includes("@")) {
    //             event.preventDefault();
    //             alert("Por favor, ingresa un correo válido.");
    //             return;
    //         }
    //
    //         alert("Mensaje enviado correctamente.");
    //
    //     });
    //
    // }
    function enviarFormulario(event) {

        event.preventDefault();

        if (nombre === "" || correo === "" || mensaje === "") {
            alert("Por favor, completa todos los campos.");
            return;
        }

        if (!correo.includes("@")) {
            alert("Por favor, ingresa un correo válido.");
            return;
        }

        alert("Mensaje enviado correctamente.");
    }

    return (
        <main>

            <section className="seccion-contacto">

                <h2>Contáctanos</h2>


                <form id="formulario-contacto" onSubmit={enviarFormulario}>
                    <label>Nombre:</label>
                    <input
                        type="text"
                        value={nombre}
                        onChange={(event) => setNombre(event.target.value)}
                    />

                    <label>Correo:</label>
                    <input
                        type="email"
                        value={correo}
                        onChange={(event) => setCorreo(event.target.value)}
                    />

                    <label>Mensaje:</label>
                    <textarea
                        value={mensaje}
                        onChange={(event) => setMensaje(event.target.value)}
                    />

                    <button type="submit">Enviar</button>
                </form>

            </section>

        </main>
    )
}
