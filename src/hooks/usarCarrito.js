import { useEffect, useMemo, useState } from 'react'

const claveCarrito = 'huerto-hogar-carrito'

function leerCarritoInicial() {
    if (typeof window === 'undefined') {
        return []
    }

    const carritoGuardado = window.localStorage.getItem(claveCarrito)

    if (!carritoGuardado) {
        return []
    }

    try {
        const carrito = JSON.parse(carritoGuardado)

        if (!Array.isArray(carrito)) {
            throw new Error('La persistencia del carrito no contiene una lista válida.')
        }

        return carrito
    } catch (error) {
        throw new Error(`No se pudo leer el carrito guardado: ${error.message}`)
    }
}

export default function useCarrito() {
    const [carrito, setCarrito] = useState(leerCarritoInicial)

    useEffect(() => {
        window.localStorage.setItem(claveCarrito, JSON.stringify(carrito))
    }, [carrito])

    const cantidadProductos = useMemo(
        () => carrito.reduce((total, producto) => total + producto.cantidad, 0),
        [carrito],
    )

    const total = useMemo(
        () => carrito.reduce((suma, producto) => suma + producto.precio * producto.cantidad, 0),
        [carrito],
    )

    function agregar(producto) {
        setCarrito((actual) => {
            const existe = actual.some((elemento) => elemento.id === producto.id)

            if (existe) {
                return actual.map((elemento) => (
                    elemento.id === producto.id
                        ? { ...elemento, cantidad: elemento.cantidad + 1 }
                        : elemento
                ))
            }

            return [...actual, { ...producto, cantidad: 1 }]
        })
    }

    function aumentar(id) {
        setCarrito((actual) => actual.map((producto) => (
            producto.id === id
                ? { ...producto, cantidad: producto.cantidad + 1 }
                : producto
        )))
    }

    function disminuir(id) {
        setCarrito((actual) => actual.flatMap((producto) => {
            if (producto.id !== id) {
                return [producto]
            }

            return producto.cantidad > 1
                ? [{ ...producto, cantidad: producto.cantidad - 1 }]
                : []
        }))
    }

    function quitar(id) {
        setCarrito((actual) => actual.filter((producto) => producto.id !== id))
    }

    function vaciar() {
        setCarrito([])
    }

    return {
        carrito,
        cantidadProductos,
        total,
        agregar,
        aumentar,
        disminuir,
        quitar,
        vaciar,
    }
}
