import { Link } from 'react-router-dom'

export default function Inicio() {
    return (
        <main>

            <section className="inicio-principal">

                <div className="texto-inicio">

                    <h2>Productos frescos del campo a tu hogar</h2>

                    <p>
                        Frescura que se siente, calidad que se disfruta.
                        Llevamos hasta tu hogar productos seleccionados
                        para que puedas disfrutar de una alimentación más fresca, saludable y natural.
                    </p>

                    <Link to="/productos" className="boton-inicio">
                        Ver nuestros productos
                    </Link>

                </div>

                <img src="/img/index.png" alt="Productos frescos del campo" />

            </section>


            <section className="porque-huertohogar">

                <h2>¿Por qué Huerto Hogar?</h2>

                <div className="beneficios">

                    <article>
                        <h3>🌱 Productos frescos</h3>
                        <p>
                            Ofrecemos productos frescos y de calidad
                            para toda la familia.
                        </p>
                    </article>

                    <article>
                        <h3>🚜 Productores locales</h3>
                        <p>
                            Conectamos a las familias con productores
                            y agricultores locales.
                        </p>
                    </article>

                    <article>
                        <h3>❤️ Compromiso y calidad</h3>
                        <p>
                            Buscamos entregar una experiencia de compra
                            cercana y confiable.
                        </p>
                    </article>

                </div>

            </section>

        </main>
    )
}
