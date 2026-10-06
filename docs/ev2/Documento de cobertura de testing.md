# Documento de cobertura de testing

## 1. Propósito

Este documento describe el proceso de pruebas unitarias aplicado a HuertoHogar para la Evaluación
Parcial 2. La estructura sigue el objetivo del ERS base de verificar requisitos funcionales,
comportamiento de componentes, estados, eventos y persistencia.

## 2. Herramientas y configuración

| Herramienta | Uso |
|---|---|
| Jasmine | Define suites, casos y aserciones |
| Karma | Ejecuta las pruebas en un navegador de prueba |
| jsdom | Proporciona el DOM utilizado por Karma |
| Testing Library | Renderiza componentes y consulta controles accesibles |
| MemoryRouter | Aísla y prueba navegación sin levantar un servidor |
| esbuild | Transforma JSX durante la ejecución |
| Istanbul | Instrumenta el código y calcula cobertura |

Comandos utilizados:

```bash
npm test
npm run test:coverage
```

La configuración se encuentra en [karma.conf.cjs](../../karma.conf.cjs). El proyecto define estos
umbrales mínimos globales:

| Métrica | Umbral |
|---|---:|
| Statements | 50% |
| Branches | 40% |
| Functions | 50% |
| Lines | 50% |

## 3. Organización de las suites

| Suite | Alcance |
|---|---|
| `persistencia.spec.js` | CRUD, duplicados, registros inexistentes, listas iniciales y JSON inválido |
| `carrito.spec.js` | Renderizado del carrito, cantidades, eliminación, total y estado vacío |
| `catalogo.spec.js` | Productos, categorías, ofertas, detalle y uso de props |
| `autenticacion-blog.spec.js` | Registro, inicio de sesión, validación y blogs |
| `checkout.spec.js` | Validaciones, pago aprobado, pago rechazado y resultados |
| `accesibilidad-responsive.spec.js` | Controles etiquetados, navegación básica y comportamiento responsive |
| `administracion.spec.js` | Acceso admin, dashboard, órdenes, productos, categorías, usuarios, reportes y tienda |

## 4. Casos de prueba representativos

| ID | Caso | Tipo | Resultado esperado |
|---|---|---|---|
| T-01 | Crear, leer, actualizar y eliminar un registro | Lógica | El repositorio conserva los cambios y termina vacío |
| T-02 | Crear un identificador duplicado | Error | El repositorio lanza un error explícito |
| T-03 | Leer JSON inválido | Error | El repositorio informa que no pudo leer los datos |
| T-04 | Renderizar productos del catálogo | Renderizado | Se muestran los productos recibidos |
| T-05 | Agregar producto y modificar cantidad | Estado y evento | El carrito actualiza cantidad y total |
| T-06 | Mostrar carrito vacío | Renderizado condicional | Se muestra el mensaje de carrito vacío |
| T-07 | Enviar registro incompleto | Validación | El formulario muestra mensajes de validación |
| T-08 | Completar checkout sin dirección | Validación | Se solicita la dirección de entrega |
| T-09 | Rechazar pago simulado | Flujo | Se conserva el carrito y no se confirma la orden |
| T-10 | Aprobar pago simulado | Flujo y persistencia | Se crea la orden y se limpia el carrito |
| T-11 | Abrir ruta administrativa sin sesión | Seguridad de navegación | Se redirige al acceso administrativo |
| T-12 | Consultar reportes sin órdenes | Estado vacío | Se informa que no existen órdenes disponibles |
| T-13 | Eliminar categoría asociada | Regla de negocio | La eliminación se bloquea y se muestra un mensaje |
| T-14 | Actualizar estado de una orden | Evento y persistencia | El nuevo estado queda guardado |

Estos casos cubren renderizado correcto y condicional, props, estado, eventos, validaciones,
persistencia, errores y reglas administrativas.

## 5. Mocks y aislamiento

- `MemoryRouter` reemplaza el historial del navegador para probar rutas de forma aislada.
- `window.localStorage` funciona como almacenamiento controlado por cada suite.
- `afterEach` ejecuta `cleanup`, limpia el almacenamiento local y vacía el DOM.
- Los datos de prueba se crean con `crearProducto` y objetos mínimos definidos en cada caso.
- Las suites no dependen de datos producidos por otra suite.

La aplicación no requiere mocks de HTTP porque esta versión no consume una API. Al integrar backend,
deberán agregarse mocks de respuestas exitosas, vacías y fallidas para el cliente HTTP.

## 6. Resultados de ejecución

Ejecución registrada antes de esta documentación:

- Suites ejecutadas: 7.
- Especificaciones ejecutadas: 28.
- Resultado: 28 exitosas.
- Resultado de errores: 0.
- Ambiente: Karma con `jsdom`.
- Cobertura global:

| Métrica | Resultado | Umbral | Estado |
|---|---:|---:|---|
| Statements | 87,34% (145/166) | 50% | Cumple |
| Branches | 68,08% (32/47) | 40% | Cumple |
| Functions | 87,87% (58/66) | 50% | Cumple |
| Lines | 87,67% (128/146) | 50% | Cumple |

El comando de cobertura genera reportes HTML, LCOV y resumen textual en `reports/coverage/`.
Estos archivos son artefactos de ejecución y no deben incorporarse al control de versiones.

## 7. Análisis

La cobertura confirma que las funciones de persistencia, carrito, catálogo, autenticación,
checkout y administración tienen ejercicios automatizados. Las pruebas de checkout verifican dos
resultados opuestos, aprobación y rechazo, para evitar que la limpieza del carrito ocurra en un
pago no aprobado. Las pruebas administrativas verifican tanto el acceso protegido como estados
vacíos y reglas de eliminación.

La cobertura de ramas es menor que la de statements porque existen combinaciones de datos
administrativos y errores de interfaz que no se recorren en todas las suites. Los umbrales
configurados se cumplen, pero una siguiente iteración podría aumentar casos de errores de
almacenamiento, edición inválida y rutas con identificadores inexistentes.

## 8. Reproducción

Desde la raíz del proyecto:

```bash
npm install
npm test
npm run test:coverage
```

Para una revisión manual se puede ejecutar:

```bash
npm run dev
```

Después se deben revisar las rutas públicas, el checkout, el acceso administrativo y las vistas
CRUD. Las credenciales de demostración del panel son `admin@huertohogar.local` y `admin123`.

## 9. Conclusión

El proceso de testing cumple con la configuración Jasmine/Karma solicitada, utiliza aislamiento
del DOM y almacenamiento local, verifica los flujos principales y supera los umbrales de cobertura
definidos. La cobertura refleja el frontend académico actual. No certifica seguridad de producción,
integración con backend real ni transacciones de pago reales.
