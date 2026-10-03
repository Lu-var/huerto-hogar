export default function Contacto() {
    return (
        <main>

            <section className="seccion-contacto">

                <h2>Contáctanos</h2>


                <form id="formulario-contacto">
                    <label>Nombre:</label>
                    <input type="text" />

                    <label>Correo:</label>
                    <input type="email" />

                    <label>Mensaje:</label>
                    <textarea />

                    <button type="submit">Enviar</button>
                </form>

            </section>

        </main>
    )
}