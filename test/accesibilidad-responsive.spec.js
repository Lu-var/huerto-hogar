import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import Encabezado from '../src/components/Encabezado.jsx'
import Contacto from '../src/components/Contacto.jsx'
import ModalProducto from '../src/components/ModalProducto.jsx'
import { productos } from '../src/data/productos.js'

describe('accesibilidad y comportamiento responsive', () => {
    it('abre y cierra el menú de navegación con un control accesible', () => {
        render(
            <MemoryRouter>
                <Encabezado />
            </MemoryRouter>,
        )

        const toggle = screen.getByRole('button', { name: 'Toggle navigation' })
        expect(toggle.getAttribute('aria-controls')).toBe('navegacion-principal')
        fireEvent.click(toggle)
        expect(screen.getByRole('link', { name: 'Productos' })).toBeTruthy()
        fireEvent.click(toggle)
        expect(toggle.getAttribute('aria-expanded') === 'false' || toggle.getAttribute('aria-expanded') === null).toBeTrue()
    })

    it('expone labels para formulario y feedback visible', () => {
        render(
            <MemoryRouter>
                <Contacto />
            </MemoryRouter>,
        )

        expect(screen.getByLabelText('Nombre')).toBeTruthy()
        expect(screen.getByLabelText('Correo')).toBeTruthy()
        expect(screen.getByLabelText('Mensaje')).toBeTruthy()
        fireEvent.click(screen.getByRole('button', { name: 'Enviar' }))
        expect(screen.getByText('Por favor, completa todos los campos.')).toBeTruthy()
    })

    it('mantiene el modal operable por teclado y con cierre explícito', () => {
        const onClose = jasmine.createSpy('onClose')

        render(
            <MemoryRouter>
                <ModalProducto producto={productos[0]} onClose={onClose} onAgregar={() => {}} />
            </MemoryRouter>,
        )

        const dialog = screen.getByRole('dialog')
        expect(dialog).toBeTruthy()
        fireEvent.keyDown(dialog, { key: 'Escape' })
        fireEvent.click(screen.getByRole('button', { name: 'Cerrar' }))
        expect(onClose).toHaveBeenCalled()
    })
})
