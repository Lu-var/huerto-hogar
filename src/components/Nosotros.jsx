export default function Nosotros() {
    const localidades = [
        { nombre: "Viña del Mar", url: "https://www.google.com/maps/search/?api=1&query=Vi%C3%B1a%20del%20Mar%2C%20Chile" },
        { nombre: "Valparaíso", url: "https://www.google.com/maps/search/?api=1&query=Valpara%C3%ADso%2C%20Chile" },
        { nombre: "Las Condes", url: "https://www.google.com/maps/search/?api=1&query=Santiago%2C%20Chile" },
        { nombre: "Maipú", url: "https://www.google.com/maps/search/?api=1&query=Santiago%2C%20Chile" },
        { nombre: "Villarica", url: "https://www.google.com/maps/search/?api=1&query=Villarica%2C%20Chile" },
        { nombre: "Nacimiento", url: "https://www.google.com/maps/search/?api=1&query=Nacimiento%2C%20Chile" },
        { nombre: "Concepción", url: "https://www.google.com/maps/search/?api=1&query=Concepci%C3%B3n%2C%20Chile" },
        { nombre: "Puerto Montt", url: "https://www.google.com/maps/search/?api=1&query=Puerto%20Montt%2C%20Chile" },
    ];

    return (
        <main>

            <section className="info-nosotros">

                <div className="texto-nosotros">
                    <h2>Sobre HuertoHogar</h2>

                    <p>
                        HuertoHogar es una tienda online que busca acercar productos frescos y de calidad directamente desde el campo
                        hasta los hogares de las familias chilenas.
                        La empresa cuenta con más de 6 años de experiencia y trabaja para ofrecer una alternativa cercana y
                        confiable para quienes buscan alimentos frescos y naturales.
                        Su propuesta busca facilitar el acceso a productos provenientes de agricultores y productores locales,
                        fortaleciendo el vínculo entre el campo y las familias. De esta manera,
                        HuertoHogar busca entregar una experiencia de compra basada en la calidad de sus productos
                        y en el compromiso con sus clientes.
                    </p>

                    <p>
                        Contamos con más de 6 años de experiencia y operamos
                        en más de 9 puntos a lo largo del país.
                    </p>
                </div>

                <img src="/img/Campo.png" alt="Productos frescos del campo" />

            </section>


            <section className="info-nosotros">

                <img src="/img/Vision.jpg" alt="Productos frescos" />

                <div className="texto-nosotros">
                    <h2>Nuestra misión</h2>

                    <p>
                        Nuestra misión es conectar a las familias chilenas con el campo,
                        facilitando el acceso a productos frescos, naturales y de calidad.
                        En HuertoHogar buscamos acercar a nuestros clientes a los
                        productores locales, promoviendo una alimentación saludable y
                        responsable.
                    </p>

                    <p>
                        También buscamos apoyar a los agricultores y productores de
                        distintas localidades de Chile, fortaleciendo el vínculo entre
                        quienes trabajan la tierra y las familias que disfrutan de sus
                        productos. De esta manera, promovemos el consumo de alimentos
                        frescos y prácticas sostenibles, manteniendo nuestro compromiso
                        con la calidad y el bienestar de nuestros clientes.
                    </p>
                </div>

            </section>


            <section className="info-nosotros">

                <div className="texto-nosotros">
                    <h2>Nuestra visión</h2>

                    <p>
                        Nuestra misión es conectar a las familias chilenas con el campo,
                        ofreciendo productos frescos y de calidad directamente de
                        productores locales. En HuertoHogar buscamos facilitar el acceso
                        a alimentos saludables y naturales, acercando el trabajo de los
                        agricultores a nuestros clientes.
                    </p>

                    <p>
                        Además, queremos contribuir a una alimentación más saludable y
                        promover prácticas sostenibles, apoyando a los productores locales
                        y fortaleciendo el vínculo entre las familias y el campo. Nuestro
                        compromiso es entregar productos de calidad y una experiencia de
                        compra cercana y confiable.
                    </p>
                </div>

                <img src="/img/mision.png" alt="Productos naturales" />

            </section>


            <section className="ubicaciones">

                <h2>¿Dónde estamos?</h2>

                <p>
                    HuertoHogar cuenta con presencia en distintas localidades
                    de Chile.
                </p>

                <div className="localidades">
                    {localidades.map((l) => (
                        <article key={l.nombre}>
                            <h3>{l.nombre}</h3>
                            <a href={l.url} target="_blank">Ver en Google Maps </a>
                        </article>
                    ))}

                </div>

            </section>

        </main>
    )
}