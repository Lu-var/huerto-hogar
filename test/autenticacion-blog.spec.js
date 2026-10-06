import React from 'react'
import { render, screen, fireEvent, waitFor, cleanup } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import FormularioAutenticacion from '../src/components/FormularioAutenticacion.jsx'
import Blogs from '../src/components/Blogs.jsx'
import DetalleBlog from '../src/components/DetalleBlog.jsx'
import { guardarSesion, obtenerSesion, cerrarSesion } from '../src/data/autenticacion.js'
import { blogsIniciales } from '../src/data/blogs.js'

describe('autenticación y blogs', () => {
    it('valida el registro antes de persistir', () => {
        render(
            <MemoryRouter>
                <FormularioAutenticacion modo="registro" />
            </MemoryRouter>,
        )

        fireEvent.click(screen.getByRole('button', { name: 'Crear cuenta' }))
        expect(screen.getByText('Ingresa un nombre de al menos dos caracteres.')).toBeTruthy()
        expect(screen.getByLabelText('Nombre')).toHaveClass('is-invalid')
    })

    it('persiste una sesión simulada y permite cerrarla', () => {
        const usuario = { id: 'usuario-1', nombre: 'Ana', email: 'ana@test.cl' }

        guardarSesion(usuario)
        expect(obtenerSesion()).toEqual(usuario)
        cerrarSesion()
        expect(obtenerSesion()).toBeNull()
    })

    it('muestra blogs y un artículo válido', async () => {
        render(
            <MemoryRouter>
                <Blogs />
            </MemoryRouter>,
        )
        await waitFor(() => expect(screen.getByText(blogsIniciales[0].titulo)).toBeTruthy())

        cleanup()
        window.localStorage.setItem('huerto-hogar-blogs', JSON.stringify(blogsIniciales))
        render(
            <MemoryRouter initialEntries={[`/blogs/${blogsIniciales[0].id}`]}>
                <Routes>
                    <Route path="/blogs/:id" element={<DetalleBlog />} />
                </Routes>
            </MemoryRouter>,
        )
        expect(screen.getByRole('heading', { name: blogsIniciales[0].titulo })).toBeTruthy()
    })
})
