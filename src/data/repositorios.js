import { crearRepositorio } from './persistencia.js'
import { productos, productosRepositorio } from './productos.js'
import { blogsIniciales } from './blogs.js'

export { productosRepositorio }

export const usuariosRepositorio = crearRepositorio('huerto-hogar-usuarios', [])
export const blogsRepositorio = crearRepositorio('huerto-hogar-blogs', blogsIniciales)
export const ordenesRepositorio = crearRepositorio('huerto-hogar-ordenes', [])

export function obtenerProductosIniciales() {
    return productos.map((producto) => ({ ...producto }))
}
