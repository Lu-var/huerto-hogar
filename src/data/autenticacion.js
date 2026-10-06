const claveSesion = 'huerto-hogar-sesion'

function obtenerAlmacenamiento() {
    if (typeof window === 'undefined' || !window.localStorage) {
        throw new Error('La sesión requiere un navegador con localStorage disponible.')
    }

    return window.localStorage
}

export function obtenerSesion() {
    const datos = obtenerAlmacenamiento().getItem(claveSesion)

    if (!datos) {
        return null
    }

    try {
        return JSON.parse(datos)
    } catch (error) {
        throw new Error(`No se pudo leer la sesión: ${error.message}`)
    }
}

export function guardarSesion(usuario) {
    try {
        obtenerAlmacenamiento().setItem(claveSesion, JSON.stringify(usuario))
        window.dispatchEvent(new Event('huerto-hogar-sesion-cambiada'))
    } catch (error) {
        throw new Error(`No se pudo guardar la sesión: ${error.message}`)
    }
}

export function cerrarSesion() {
    try {
        obtenerAlmacenamiento().removeItem(claveSesion)
        window.dispatchEvent(new Event('huerto-hogar-sesion-cambiada'))
    } catch (error) {
        throw new Error(`No se pudo cerrar la sesión: ${error.message}`)
    }
}
