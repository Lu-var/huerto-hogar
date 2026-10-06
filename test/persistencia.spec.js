import { crearRepositorio } from '../src/data/persistencia.js'
import { productosRepositorio } from '../src/data/productos.js'
import { usuariosRepositorio, blogsRepositorio, ordenesRepositorio } from '../src/data/repositorios.js'
import { crearProducto } from './test-utils.js'

describe('persistencia y repositorios', () => {
    it('crea, lee, actualiza y elimina registros', () => {
        const repositorio = crearRepositorio('prueba-crud', [])
        const producto = crearProducto()

        expect(repositorio.crear(producto)).toEqual(producto)
        expect(repositorio.obtenerPorId(1)).toEqual(producto)
        expect(repositorio.actualizar(1, { precio: 1500 }).precio).toBe(1500)
        expect(repositorio.eliminar(1)).toBeTrue()
        expect(repositorio.obtenerTodos()).toEqual([])
    })

    it('rechaza identificadores duplicados y registros inexistentes', () => {
        const repositorio = crearRepositorio('prueba-errores', [crearProducto()])

        expect(() => repositorio.crear(crearProducto())).toThrowError(/Ya existe/)
        expect(() => repositorio.actualizar(99, {})).toThrowError(/No existe/)
        expect(() => repositorio.eliminar(99)).toThrowError(/No existe/)
    })

    it('expone los repositorios de la aplicación con listas válidas', () => {
        expect(productosRepositorio.obtenerTodos().length).toBeGreaterThan(0)
        expect(usuariosRepositorio.obtenerTodos()).toEqual([])
        expect(blogsRepositorio.obtenerTodos().length).toBeGreaterThan(0)
        expect(ordenesRepositorio.obtenerTodos()).toEqual([])
    })

    it('informa cuando la persistencia contiene JSON inválido', () => {
        window.localStorage.setItem('prueba-corrupta', '{no-json')
        const repositorio = crearRepositorio('prueba-corrupta', [])

        expect(() => repositorio.obtenerTodos()).toThrowError(/No se pudieron leer/)
    })
})
