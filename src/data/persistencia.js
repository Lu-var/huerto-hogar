function clonarDatos(datos) {
    return JSON.parse(JSON.stringify(datos))
}

function obtenerAlmacenamiento() {
    if (typeof window === 'undefined' || !window.localStorage) {
        throw new Error('La persistencia local requiere un navegador con localStorage disponible.')
    }

    return window.localStorage
}

export function crearRepositorio(clave, datosIniciales = []) {
    if (!clave || typeof clave !== 'string') {
        throw new Error('La clave del repositorio es obligatoria.')
    }

    function leerDatos() {
        const almacenamiento = obtenerAlmacenamiento()
        const datosGuardados = almacenamiento.getItem(clave)

        if (datosGuardados === null) {
            return clonarDatos(datosIniciales)
        }

        try {
            const datos = JSON.parse(datosGuardados)

            if (!Array.isArray(datos)) {
                throw new Error('El valor persistido no contiene una lista válida.')
            }

            return datos
        } catch (error) {
            throw new Error(`No se pudieron leer los datos de ${clave}: ${error.message}`)
        }
    }

    function guardarDatos(datos) {
        try {
            obtenerAlmacenamiento().setItem(clave, JSON.stringify(datos))
        } catch (error) {
            throw new Error(`No se pudieron guardar los datos de ${clave}: ${error.message}`)
        }
    }

    return {
        obtenerTodos() {
            return clonarDatos(leerDatos())
        },

        obtenerPorId(id) {
            return clonarDatos(leerDatos().find((elemento) => elemento.id === id) ?? null)
        },

        crear(elemento) {
            const datos = leerDatos()

            if (datos.some((registro) => registro.id === elemento.id)) {
                throw new Error(`Ya existe un registro con el identificador ${elemento.id}.`)
            }

            const nuevosDatos = [...datos, clonarDatos(elemento)]
            guardarDatos(nuevosDatos)
            return clonarDatos(elemento)
        },

        actualizar(id, cambios) {
            const datos = leerDatos()
            const indice = datos.findIndex((elemento) => elemento.id === id)

            if (indice === -1) {
                throw new Error(`No existe un registro con el identificador ${id}.`)
            }

            const elementoActualizado = { ...datos[indice], ...clonarDatos(cambios), id }
            const nuevosDatos = datos.map((elemento, posicion) => (
                posicion === indice ? elementoActualizado : elemento
            ))

            guardarDatos(nuevosDatos)
            return clonarDatos(elementoActualizado)
        },

        eliminar(id) {
            const datos = leerDatos()

            if (!datos.some((elemento) => elemento.id === id)) {
                throw new Error(`No existe un registro con el identificador ${id}.`)
            }

            const nuevosDatos = datos.filter((elemento) => elemento.id !== id)
            guardarDatos(nuevosDatos)
            return true
        },
    }
}
