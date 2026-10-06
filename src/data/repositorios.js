import { crearRepositorio } from './persistencia.js'
import { productos, productosRepositorio } from './productos.js'

export { productosRepositorio }

export const usuariosRepositorio = crearRepositorio('huerto-hogar-usuarios', [])
export const blogsRepositorio = crearRepositorio('huerto-hogar-blogs', [])
export const ordenesRepositorio = crearRepositorio('huerto-hogar-ordenes', [])

export function obtenerProductosIniciales() {
    return productos.map((producto) => ({ ...producto }))
}
