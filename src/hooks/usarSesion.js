import { useEffect, useState } from 'react'
import { cerrarSesion, obtenerSesion } from '../data/autenticacion.js'

export default function useSesion() {
    const [sesion, setSesion] = useState(() => obtenerSesion())

    useEffect(() => {
        const actualizarSesion = () => setSesion(obtenerSesion())
        window.addEventListener('huerto-hogar-sesion-cambiada', actualizarSesion)

        return () => window.removeEventListener('huerto-hogar-sesion-cambiada', actualizarSesion)
    }, [])

    return {
        sesion,
        cerrar: () => cerrarSesion(),
    }
}
