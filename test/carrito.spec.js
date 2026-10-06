import React from 'react'
import { render, renderHook, act } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import useCarrito from '../src/hooks/usarCarrito.js'
import ResumenCarrito from '../src/components/ResumenCarrito.jsx'
import { crearProducto } from './test-utils.js'

describe('carrito', () => {
    it('agrega, aumenta, disminuye, quita y vacía productos', () => {
        const { result } = renderHook(() => useCarrito())
        const producto = crearProducto()

        act(() => result.current.agregar(producto))
        act(() => result.current.aumentar(producto.id))
        expect(result.current.cantidadProductos).toBe(2)
        expect(result.current.total).toBe(2000)

        act(() => result.current.disminuir(producto.id))
        expect(result.current.cantidadProductos).toBe(1)
        act(() => result.current.quitar(producto.id))
        expect(result.current.carrito).toEqual([])
        act(() => result.current.agregar(producto))
        act(() => result.current.vaciar())
        expect(result.current.carrito).toEqual([])
    })

    it('restaura el carrito persistido', () => {
        window.localStorage.setItem(
            'huerto-hogar-carrito',
            JSON.stringify([{ ...crearProducto(), cantidad: 2 }]),
        )

        const { result } = renderHook(() => useCarrito())

        expect(result.current.cantidadProductos).toBe(2)
        expect(result.current.total).toBe(2000)
    })

    it('muestra estado vacío y permite navegar al checkout cuando hay productos', async () => {
        const producto = crearProducto()
        const props = {
            carrito: [producto, { ...producto, id: 2, cantidad: 2 }],
            cantidadProductos: 3,
            total: 3000,
            alAumentar: () => {},
            alDisminuir: () => {},
            alQuitar: () => {},
            alVaciar: () => {},
            alOcultar: () => {},
        }

        render(
            <MemoryRouter>
                <ResumenCarrito {...props} />
            </MemoryRouter>,
        )
        expect(document.body.textContent).toContain('3 productos')
        expect(document.body.textContent).toContain('Ir al checkout')
    })
})
