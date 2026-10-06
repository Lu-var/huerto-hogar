import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { MemoryRouter, Route, Routes } from 'react-router-dom'
import AccesoAdministracion from '../src/components/AccesoAdministracion.jsx'
import AdminInicio from '../src/components/AdminInicio.jsx'
import AdminOrdenes from '../src/components/AdminOrdenes.jsx'
import AdminProductos from '../src/components/AdminProductos.jsx'
import AdminCategorias from '../src/components/AdminCategorias.jsx'
import AdminUsuarios from '../src/components/AdminUsuarios.jsx'
import AdminReportes from '../src/components/AdminReportes.jsx'
import AdminTienda from '../src/components/AdminTienda.jsx'
import { usuariosRepositorio } from '../src/data/repositorios.js'

function conRuta(elemento, ruta = '/') {
    return render(
        <MemoryRouter initialEntries={[ruta]}>
            <Routes>
                <Route path="*" element={elemento} />
            </Routes>
        </MemoryRouter>,
    )
}

describe('panel administrativo', () => {
    it('valida credenciales administrativas y muestra error cuando son inválidas', () => {
        conRuta(<AccesoAdministracion />)
        fireEvent.change(screen.getByLabelText('Correo administrativo'), { target: { value: 'incorrecto' } })
        fireEvent.change(screen.getByLabelText('Contraseña'), { target: { value: 'no-valida' } })
        fireEvent.submit(screen.getByRole('button', { name: 'Ingresar al panel' }).closest('form'))
        expect(screen.getByRole('alert').textContent).toContain('Las credenciales')
    })

    it('renderiza métricas derivadas en el dashboard', async () => {
        conRuta(<AdminInicio />)
        expect(await screen.findByText('Productos')).toBeTruthy()
        expect(screen.getByText('Órdenes')).toBeTruthy()
    })

    it('muestra el estado vacío de órdenes', async () => {
        window.localStorage.setItem('huerto-hogar-ordenes', '[]')
        conRuta(<AdminOrdenes />)
        expect(await screen.findByText('Todavía no hay órdenes registradas.')).toBeTruthy()
    })

    it('renderiza productos y navega al formulario de creación', async () => {
        conRuta(<AdminProductos />)
        expect(await screen.findByText('Manzana Fuji')).toBeTruthy()
        expect(screen.getByRole('button', { name: 'Nuevo producto' }).getAttribute('href')).toBe('/admin/productos/nuevo')
    })

    it('bloquea la eliminación de categorías con productos asociados', async () => {
        window.localStorage.setItem('huerto-hogar-categorias', JSON.stringify([
            { id: 'con-productos', nombre: 'Con productos', productoIds: [1] },
        ]))
        conRuta(<AdminCategorias />)
        await screen.findByText('Con productos')
        fireEvent.click(screen.getByRole('button', { name: 'Eliminar' }))
        expect(screen.getByRole('alert').textContent).toContain('productos asociados')
    })

    it('renderiza usuarios y roles', async () => {
        usuariosRepositorio.crear({
            id: 'admin-test',
            nombre: 'Administrador de prueba',
            email: 'admin-test@ejemplo.cl',
            password: 'secreto123',
            rol: 'admin',
        })
        conRuta(<AdminUsuarios />)
        expect(await screen.findByText('Administrador de prueba')).toBeTruthy()
        expect(screen.getByText('admin')).toBeTruthy()
    })

    it('muestra reportes y estado vacío de órdenes', async () => {
        window.localStorage.setItem('huerto-hogar-ordenes', '[]')
        conRuta(<AdminReportes />)
        expect(await screen.findByText('No hay órdenes para desglosar por estado.')).toBeTruthy()
    })

    it('ofrece acceso funcional a la tienda pública', () => {
        conRuta(<AdminTienda />)
        expect(screen.getByRole('button', { name: 'Abrir tienda' }).getAttribute('href')).toBe('/')
    })
})
