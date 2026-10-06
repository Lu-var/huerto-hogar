import { cleanup } from '@testing-library/react'

afterEach(() => {
    cleanup()
    window.localStorage.clear()
    document.body.innerHTML = ''
})

export function crearProducto(id = 1, cambios = {}) {
    return {
        id,
        nombre: `Producto ${id}`,
        precio: 1000,
        unidad: 'unidad',
        descripcion: 'Descripción de prueba',
        curiosidad: 'Curiosidad de prueba',
        origen: 'Origen de prueba',
        ...cambios,
    }
}

export function obtenerBoton(nombre) {
    return [...document.querySelectorAll('button')].find((boton) => (
        boton.textContent.trim() === nombre
    ))
}
