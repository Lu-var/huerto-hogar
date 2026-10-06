import { productos } from './productos.js'

export const categorias = [
    {
        id: 'frutas-frescas',
        nombre: 'Frutas Frescas',
        productos: productos.filter((producto) => [1, 2, 3].includes(producto.id)),
    },
    {
        id: 'verduras-organicas',
        nombre: 'Verduras Orgánicas',
        productos: productos.filter((producto) => [4, 5, 6].includes(producto.id)),
    },
    {
        id: 'productos-organicos',
        nombre: 'Productos Orgánicos',
        productos: productos.filter((producto) => [7, 8].includes(producto.id)),
    },
    {
        id: 'productos-lacteos',
        nombre: 'Productos Lácteos',
        productos: productos.filter((producto) => producto.id === 9),
    },
]
