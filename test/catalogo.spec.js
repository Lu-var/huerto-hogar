import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import GrillaProductos from '../src/components/GrillaProductos.jsx'
import ModalProducto from '../src/components/ModalProducto.jsx'
import Categorias from '../src/components/Categorias.jsx'
import Ofertas from '../src/components/Ofertas.jsx'
import { productos } from '../src/data/productos.js'

describe('catálogo y navegación pública', () => {
    it('renderiza tarjetas y permite agregar un producto', () => {
        const alAgregar = jasmine.createSpy('alAgregar')

        render(
            <MemoryRouter>
                <GrillaProductos
                    productos={productos.slice(0, 2)}
                    alAgregar={alAgregar}
                    alMostrarDetalle={() => {}}
                />
            </MemoryRouter>,
        )

        expect(screen.getByText('Manzana Fuji')).toBeTruthy()
        fireEvent.click(screen.getAllByRole('button', { name: 'Agregar al carrito' })[0])
        expect(alAgregar).toHaveBeenCalledWith(productos[0])
    })

    it('abre y cierra el detalle del producto', () => {
        const producto = productos[0]
        const alCerrar = jasmine.createSpy('alCerrar')

        render(
            <ModalProducto
                producto={producto}
                onClose={alCerrar}
                onAgregar={() => {}}
            />,
        )

        expect(screen.getByText(producto.descripcion)).toBeTruthy()
        fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
        expect(alCerrar).toHaveBeenCalled()
    })

    it('muestra categorías y estado honesto de ofertas', () => {
        render(
            <MemoryRouter>
                <Categorias />
                <Ofertas />
            </MemoryRouter>,
        )

        expect(screen.getByText('Frutas Frescas')).toBeTruthy()
        expect(screen.getByText('No hay ofertas publicadas')).toBeTruthy()
    })
})
