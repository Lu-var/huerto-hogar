# Especificación de Requisitos de Software

## Ficha del documento

| Campo | Valor |
|---|---|
| Sistema | HuertoHogar: Del Campo al Hogar |
| Documento | Especificación de Requisitos de Software, versión 2 |
| Fecha | 06-10-2026 |
| Revisión | V2 |
| Base documental | ERS de la Evaluación Parcial 1, Anexo 4 |
| Estado | Actualizado para la Evaluación Parcial 2 |

## 1. Introducción

### 1.1 Propósito

Este documento especifica los requisitos funcionales y no funcionales de HuertoHogar, una tienda
online de productos frescos. La versión 2 actualiza el ERS de la Evaluación Parcial 1 para
describir la implementación frontend realizada con React, React Router, React-Bootstrap,
persistencia local y pruebas unitarias con Jasmine y Karma.

El documento está dirigido al equipo de desarrollo, a quienes revisan la evaluación y a las
personas responsables de probar y presentar el sistema.

### 1.2 Ámbito del sistema

HuertoHogar permite consultar productos, categorías, ofertas y blogs; registrar usuarios,
iniciar sesión, administrar un carrito, completar un checkout simulado y consultar el resultado
de un pago simulado. También incorpora un panel administrativo para gestionar órdenes, productos,
inventario, categorías, usuarios, reportes y perfil.

La implementación entregada funciona como frontend ejecutable en navegador. Los datos se
persisten localmente mediante `localStorage`; por lo tanto, la autenticación, el pago y la
persistencia no representan todavía un backend productivo ni un mecanismo de seguridad real.

### 1.3 Definiciones, acrónimos y abreviaturas

- **ERS:** Especificación de Requisitos de Software.
- **Frontend:** parte de la aplicación que se ejecuta en el navegador.
- **React:** biblioteca usada para construir la interfaz mediante componentes.
- **React-Bootstrap:** componentes Bootstrap adaptados a React.
- **SPA:** aplicación de una sola página con navegación administrada por React Router.
- **Repositorio local:** módulo que administra una colección persistida en `localStorage`.
- **Orden:** registro generado durante el checkout.
- **Checkout:** formulario de entrega y resultado de pago de una orden.
- **Administrador:** usuario con rol `admin` para acceder al panel administrativo.
- **RUT:** identificador tributario chileno solicitado en el registro de usuario.

### 1.4 Referencias

1. DSY1104, Evaluación Parcial 1, Anexo 4, ERS de HuertoHogar.
2. DSY1104, Evaluación Parcial 2, Anexo 1, instrucciones de frontend y pruebas unitarias.
3. DSY1104, Evaluación Parcial 2, pauta de evaluación.
4. Código fuente y suites de pruebas de este repositorio.

### 1.5 Visión general del documento

La sección 2 describe el contexto del sistema, sus usuarios, restricciones y dependencias. La
sección 3 especifica las interfaces, requisitos funcionales y no funcionales. La sección 4
relaciona los requisitos con las rutas y componentes implementados. La sección 5 registra las
decisiones y límites conocidos de esta versión.

## 2. Descripción general

### 2.1 Perspectiva del producto

HuertoHogar es una SPA independiente que se ejecuta en un navegador moderno. React renderiza
los componentes, React Router administra las rutas y React-Bootstrap aporta la estructura visual
responsiva. Los repositorios de datos encapsulan la lectura y escritura de `localStorage`.

En la versión actual no existe una API remota. La futura integración con backend debe reemplazar
los repositorios locales sin cambiar la navegación ni la composición principal de las vistas.

Flujo general:

```text
Usuario -> Navegador -> React Router -> Componentes React
                                      -> React-Bootstrap
                                      -> Repositorios locales -> localStorage

Administrador -> Acceso administrativo -> Protección por rol -> Panel administrativo
```

### 2.2 Funciones del producto

El sistema proporciona:

1. Página de inicio con acceso a las áreas principales.
2. Catálogo, categorías, ofertas y detalle de producto.
3. Carrito persistente con modificación de cantidades y eliminación.
4. Registro e inicio de sesión simulados.
5. Blog público y detalle de publicaciones.
6. Checkout, validación de entrega y resultados de pago aprobado o rechazado.
7. Acceso administrativo con rol simulado.
8. Dashboard con métricas calculadas desde los datos persistidos.
9. Gestión administrativa de órdenes y emisión de boleta imprimible.
10. Gestión de productos, inventario crítico y reportes de productos.
11. Gestión de categorías con validación de asociaciones.
12. Gestión de usuarios, roles, detalle e historial de compras.
13. Reportes consolidados y enlace a la tienda pública.

### 2.3 Características de los usuarios

| Tipo | Perfil | Operaciones |
|---|---|---|
| Visitante | Persona con conocimientos básicos de navegación web | Consultar catálogo, categorías, ofertas, blogs, nosotros y contacto |
| Cliente | Visitante que completa el registro | Iniciar sesión, usar carrito y realizar checkout simulado |
| Administrador | Persona con conocimientos básicos de navegador y gestión de datos | Gestionar órdenes, productos, inventario, categorías, usuarios y reportes |
| Evaluador o desarrollador | Persona con conocimientos de React y testing | Ejecutar la aplicación, las pruebas y revisar la cobertura |

### 2.4 Restricciones

- El frontend debe utilizar React.
- La interfaz debe utilizar componentes de React-Bootstrap y Bootstrap.
- La navegación debe funcionar mediante React Router.
- Las pruebas deben ejecutarse con Jasmine y Karma.
- La persistencia de esta entrega utiliza `localStorage`.
- El pago y el acceso administrativo son simulaciones de demostración.
- El sistema requiere un navegador con soporte para `localStorage`.
- Los datos iniciales se encuentran en el código fuente.
- No se deben interpretar las credenciales de demostración como autenticación segura.

### 2.5 Suposiciones y dependencias

- Node.js y las dependencias declaradas en `package.json` están disponibles.
- El navegador permite ejecutar JavaScript moderno y almacenar datos locales.
- La persona evaluadora puede limpiar `localStorage` para iniciar una demostración sin datos.
- La integración con backend se realizará en una etapa posterior si el curso la exige.
- Las imágenes de `public/img/` están disponibles para las vistas que las utilizan.

### 2.6 Requisitos futuros

- Reemplazar los repositorios locales por una API backend.
- Implementar autenticación real con contraseñas protegidas y autorización en servidor.
- Integrar un proveedor de pagos real.
- Asociar siempre cada orden con el usuario autenticado.
- Unificar el repositorio de categorías públicas y administrativas.
- Agregar auditoría de cambios administrativos.
- Agregar paginación, búsqueda y filtros persistidos para grandes volúmenes.

## 3. Requisitos específicos

### 3.1 Requisitos comunes de interfaces

#### 3.1.1 Interfaces de usuario

- La aplicación debe mostrar un encabezado, contenido principal y pie en las vistas públicas.
- El panel administrativo debe utilizar un layout separado con navegación propia.
- Los formularios deben mostrar etiquetas, validaciones y mensajes de resultado.
- Las tablas administrativas deben permitir lectura en pantallas pequeñas mediante comportamiento
  responsive de Bootstrap.
- Los estados de carga, vacío y error deben comunicarse visualmente cuando corresponda.
- Los controles deben ser operables con teclado y conservar foco visible.

#### 3.1.2 Interfaces de hardware

El sistema no requiere hardware especializado. Se puede utilizar teclado, mouse o pantalla táctil
en un equipo capaz de ejecutar un navegador moderno.

#### 3.1.3 Interfaces de software

- React y React DOM para la interfaz.
- React Router para navegación.
- React-Bootstrap y Bootstrap para componentes y estilos.
- `localStorage` para persistencia local.
- Jasmine, Karma, jsdom, Testing Library y esbuild para pruebas.

#### 3.1.4 Interfaces de comunicación

La versión actual no consume servicios HTTP. Los enlaces de ubicación presentes en la vista
Nosotros dirigen a búsquedas reales de Google Maps. Una futura API deberá definir autenticación,
formato de respuestas, manejo de errores y versionado.

### 3.2 Requisitos funcionales

#### RF-01 Catálogo de productos

El sistema debe listar productos con nombre, precio, unidad, descripción e imagen cuando exista.
Debe permitir abrir el detalle de un producto y agregarlo al carrito.

#### RF-02 Categorías y ofertas

El sistema debe mostrar categorías y permitir acceder a sus productos. Debe mostrar una vista de
ofertas basada en los productos marcados con descuento o condición promocional disponible.

#### RF-03 Carrito

El sistema debe conservar el carrito en `localStorage`, permitir aumentar o disminuir cantidades,
eliminar productos, mostrar el total y comunicar el estado vacío.

#### RF-04 Registro e inicio de sesión

El sistema debe validar los datos mínimos del formulario, crear un usuario local y permitir iniciar
sesión con los datos registrados. La sesión de demostración debe persistir en el navegador.

#### RF-05 Blogs

El sistema debe listar publicaciones y permitir abrir el detalle de cada publicación mediante una
ruta identificable.

#### RF-06 Checkout

El sistema debe solicitar dirección y opción de entrega. Debe mostrar validaciones cuando falten
datos y no debe crear una orden si el pago simulado es rechazado.

#### RF-07 Resultado de pago

El sistema debe mostrar un resultado de aprobación o rechazo. Cuando el pago es aprobado, debe
crear una orden y limpiar el carrito. Cuando es rechazado, debe conservar el carrito.

#### RF-08 Acceso administrativo

El sistema debe permitir el acceso de demostración con las credenciales definidas en el componente
administrativo y debe proteger las rutas `/admin` cuando no existe una sesión con rol `admin`.

#### RF-09 Dashboard administrativo

El sistema debe mostrar métricas calculadas a partir de productos, usuarios, blogs y órdenes
persistidos. Debe contemplar carga, error, datos y estado vacío.

#### RF-10 Órdenes y boletas

El administrador debe consultar órdenes, abrir su detalle, revisar productos, dirección, entrega
y total, cambiar su estado e imprimir una boleta mediante la función de impresión del navegador.

#### RF-11 Productos e inventario

El administrador debe crear, editar, consultar y eliminar productos. El sistema debe validar
nombre, precio y stock, y debe disponer de vistas para stock crítico y reportes de productos.

#### RF-12 Categorías

El administrador debe crear, editar y eliminar categorías. El sistema debe impedir eliminar una
categoría cuando tenga productos asociados mediante `productoIds`.

#### RF-13 Usuarios y perfiles

El administrador debe listar usuarios, crear, editar, consultar y eliminar usuarios, asignar roles,
consultar historial disponible y revisar el perfil administrativo activo.

#### RF-14 Reportes y acceso a tienda

El sistema debe calcular reportes consolidados de órdenes, ventas, productos, usuarios y estados
de órdenes. También debe ofrecer un enlace funcional a la tienda pública.

#### RF-15 Persistencia y errores

Los repositorios deben leer, crear, actualizar y eliminar datos locales. Deben rechazar
identificadores duplicados, informar registros inexistentes y reportar JSON inválido o fallas de
almacenamiento.

### 3.3 Requisitos no funcionales

#### RNF-01 Usabilidad y responsive

La interfaz debe adaptarse a pantallas de escritorio y móvil utilizando Bootstrap sin desbordamiento
horizontal en las vistas evaluadas.

#### RNF-02 Accesibilidad

Los controles deben tener etiquetas o nombres accesibles, navegación por teclado y foco visible.
Los mensajes de estado deben ser identificables por tecnologías de asistencia cuando corresponda.

#### RNF-03 Mantenibilidad

La interfaz debe organizarse en componentes reutilizables. Los formularios administrativos de
productos, categorías y usuarios deben reutilizar componentes de formulario comunes.

#### RNF-04 Verificabilidad

Las funciones principales deben contar con pruebas Jasmine ejecutables por Karma. El comando de
cobertura debe informar statements, branches, functions y lines.

#### RNF-05 Portabilidad

El proyecto debe poder instalarse con `npm install`, compilarse con `npm run build` y ejecutarse
localmente con `npm run dev`.

#### RNF-06 Integridad de datos locales

Los repositorios deben clonar datos al leer y escribir para evitar mutaciones accidentales y deben
mostrar errores explícitos cuando el almacenamiento no contiene una lista válida.

#### RNF-07 Seguridad declarada

La versión académica no ofrece seguridad de producción. Las credenciales de demostración y los
datos en `localStorage` deben considerarse públicos dentro del navegador y no deben utilizarse para
proteger información real.

## 4. Trazabilidad de implementación

| Requisito | Evidencia principal |
|---|---|
| RF-01 a RF-03 | `/productos`, `/categorias`, `/ofertas`, `/productos/:id`, `usarCarrito` |
| RF-04 | `/registro`, `/iniciar-sesion`, `FormularioAutenticacion` |
| RF-05 | `/blogs`, `/blogs/:id` |
| RF-06 y RF-07 | `/checkout`, `/checkout/pago-correcto`, `/checkout/pago-error` |
| RF-08 | `/admin/iniciar-sesion`, `ProteccionAdministracion` |
| RF-09 a RF-14 | componentes `Admin*` y rutas `/admin/*` |
| RF-15 | `src/data/persistencia.js` y `test/persistencia.spec.js` |
| RNF-01 y RNF-02 | React-Bootstrap, `src/css/estilos.css`, `test/accesibilidad-responsive.spec.js` |
| RNF-03 | formularios reutilizables y componentes de tarjetas |
| RNF-04 | suites en `test/*.spec.js` y `karma.conf.cjs` |

## 5. Criterios de aceptación

La versión se considera aceptable cuando:

1. `npm run build` termina sin errores.
2. `npm test` ejecuta las suites sin fallos.
3. `npm run test:coverage` genera el resumen y cumple los umbrales configurados.
4. Las rutas públicas y administrativas se pueden abrir desde la navegación.
5. El checkout aprobado crea una orden y el rechazado conserva el carrito.
6. Las rutas administrativas redirigen cuando no existe una sesión autorizada.
7. Los formularios informan errores de entrada y los repositorios reportan errores de persistencia.

## 6. Limitaciones conocidas

Esta ERS describe una entrega frontend académica. No se debe presentar la persistencia local como
backend real, ni el pago simulado como una transacción financiera. La asociación de órdenes con
usuarios y la sincronización entre categorías administrativas y catálogo público requieren una
iteración posterior.
