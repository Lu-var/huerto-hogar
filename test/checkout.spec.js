import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Checkout from '../src/components/Checkout.jsx'
import ResultadoPago from '../src/components/ResultadoPago.jsx'
import { ordenesRepositorio } from '../src/data/repositorios.js'

describe('checkout y pagos simulados', () => {
    beforeEach(() => {
        window.localStorage.setItem(
            'huerto-hogar-carrito',
            JSON.stringify([{
                id: 1,
                nombre: 'Manzana Fuji',
                precio: 1200,
                unidad: 'kg',
                cantidad: 1,
            }]),
        )
    })

    it('muestra validación si faltan datos', () => {
        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
        expect(screen.getByText('Ingresa una dirección de entrega.')).toBeTruthy()
    })

    it('conserva el carrito cuando el pago es rechazado', () => {
        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>,
        )
        fireEvent.change(screen.getByLabelText('Dirección de entrega'), {
            target: { value: 'Calle 1' },
        })
        fireEvent.change(screen.getByLabelText('Opción de entrega'), {
            target: { value: 'domicilio' },
        })
        fireEvent.change(screen.getByLabelText('Resultado del pago simulado'), {
            target: { value: 'rechazado' },
        })
        fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
        expect(JSON.parse(window.localStorage.getItem('huerto-hogar-carrito'))).toHaveSize(1)
    })

    it('crea la orden y limpia el carrito con pago aprobado', () => {
        render(
            <MemoryRouter>
                <Checkout />
            </MemoryRouter>,
        )
        fireEvent.change(screen.getByLabelText('Dirección de entrega'), {
            target: { value: 'Calle 1' },
        })
        fireEvent.change(screen.getByLabelText('Opción de entrega'), {
            target: { value: 'domicilio' },
        })
        fireEvent.change(screen.getByLabelText('Resultado del pago simulado'), {
            target: { value: 'aprobado' },
        })
        fireEvent.click(screen.getByRole('button', { name: 'Confirmar pedido' }))
        expect(JSON.parse(window.localStorage.getItem('huerto-hogar-carrito'))).toEqual([])
        expect(ordenesRepositorio.obtenerTodos()).toHaveSize(1)
    })

    it('muestra el resultado correcto y el resultado de error', () => {
        const { unmount } = render(
            <MemoryRouter initialEntries={['/checkout/pago-correcto?orden=HH-1']}>
                <ResultadoPago estado="correcto" />
            </MemoryRouter>,
        )
        expect(screen.getByText('Pago aprobado')).toBeTruthy()
        unmount()
        render(
            <MemoryRouter initialEntries={['/checkout/pago-error']}>
                <ResultadoPago estado="error" />
            </MemoryRouter>,
        )
        expect(screen.getByText('No se pudo completar el pago')).toBeTruthy()
    })
})
