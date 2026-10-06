import { crearRepositorio } from './persistencia.js'

export const categoriasIniciales = [
    { id: 'frutas-frescas', nombre: 'Frutas Frescas', productoIds: [1, 2, 3] },
    { id: 'verduras-organicas', nombre: 'Verduras Orgánicas', productoIds: [4, 5, 6] },
    { id: 'productos-organicos', nombre: 'Productos Orgánicos', productoIds: [7, 8] },
    { id: 'productos-lacteos', nombre: 'Productos Lácteos', productoIds: [9] },
]

export const categoriasRepositorio = crearRepositorio('huerto-hogar-categorias', categoriasIniciales)
