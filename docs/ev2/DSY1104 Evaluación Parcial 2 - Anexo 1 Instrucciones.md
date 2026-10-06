# Maleta Didáctica - Duoc UC
## Escuela de Informática y Telecomunicaciones
**Asignatura:** DSY1104 - Desarrollo Fullstack II  
**Evaluación:** Instrucciones para el desarrollo de la Evaluación 2 (30%)

---

## Objetivos para la evaluación 2

En esta evaluación, el equipo continuará desarrollando su tienda online con un enfoque en el frontend, utilizando React y añadiendo nuevos flujos de navegación. Se proporcionará un template en HTML como guía para ayudar a los estudiantes a tomar ideas y actualizar sus proyectos con el framework y por último deberán realizar una variedad de pruebas para asegurar la calidad y el correcto funcionamiento de los componentes.

---

## Requisitos del proyecto

### Migración de HTML a React:
* Convertir las páginas HTML existentes en componentes de React reutilizables.
* Asegurarse de que cada componente maneje su propio estado y propiedades de manera eficiente.

### Archivo de datos en JavaScript:
* Crear un archivo JavaScript que actúe como una fuente de datos simulada (similar a una base de datos) para la aplicación.
* Implementar funciones para operaciones CRUD (Crear, Leer, Actualizar, Eliminar) sobre los datos dentro del archivo JS.

### Integración de persistencia:
* Conectar el archivo de persistencia con los componentes de React para gestionar datos en tiempo real y actualizar la interfaz de usuario según sea necesario.

### Diseño responsivo utilizando Bootstrap:
* Incorporar Bootstrap para asegurar que el diseño sea responsivo para proporcionar una experiencia de usuario óptima en móviles, tabletas y escritorios.

### Vistas adicionales:
* Añadir nuevas vistas basadas en los requerimientos actuales del negocio o cliente, como paneles de administración o páginas de detalles de productos.

### Interactividad mejorada:
* Incorporar características interactivas adicionales utilizando React, como formularios avanzados, filtros de búsqueda y navegación mejorada.

### Configuración de pruebas:
* Configurar el entorno de pruebas usando Jasmine y Karma para ejecutar pruebas unitarias en componentes de React.

### Desarrollo de pruebas unitarias:
* Escribir pruebas para verificar la lógica y el comportamiento de los componentes, asegurando que cada parte de la aplicación funcione como se espera.

> *"Al crear un componente en React, sigue el principio de **Single Responsibility**. Un componente debe tener una única responsabilidad o propósito en la aplicación. Esto no solo hace que el componente sea más fácil de entender y probar, sino que también mejora la reutilización. Asegúrate de que el componente tenga un nombre claro y descriptivo, utilice props para recibir datos y funciones necesarias, y maneje su propio estado solo cuando sea estrictamente necesario."*

---

## Actualización del flujo entre páginas

Se reorganiza la estructura de las páginas y se añaden otras que serán complementarias para el desarrollo final de este proyecto.

### Estructura general de navegación (Nuevas vistas):
* **Tienda (Vista Pública):**
  * Página Principal (Home)
  * Productos -> Detalle Productos
  * Registro Usuario
  * Iniciar Sesión
  * Nosotros
  * Blogs -> Detalle Blog #1 / Detalle Blog #2
  * Contacto
  * Categorías -> Categoría #1
  * Comprar (Checkout) -> Pago Correcto / Pago con Error
  * Ofertas

* **Categorías:** Vista que separa los productos por categorías.
* **Compra (Checkout):** 
  * Se incorpora Checkout (Paso de Pago): El cliente introduce la dirección de envío y selecciona opciones de entrega.
  * Se incorporan nuevas vistas para indicar si la compra fue exitosa o no, generando un resumen.
  * *Nota:* Si el usuario ha iniciado sesión, toda esta información se añadirá de forma automática.
* **Ofertas:** Vista que muestra todos los productos en oferta.

---

## Vista del Administrador

El desarrollo del sistema administrativo será un proceso colaborativo, donde el docente desempeñará un papel fundamental al proponer y guiar el flujo de trabajo que los estudiantes deben seguir. La propuesta presentada servirá como una hoja de ruta inicial, proporcionando un marco estructurado y destacando los pasos esenciales que los estudiantes deben considerar. Esto permitirá a los estudiantes adaptar y personalizar el proyecto, experimentar con diferentes estrategias y aplicar sus habilidades de resolución de problemas en un contexto práctico.

### Estructura del Panel de Administración:
* **Home / Dashboard:** Visión general de todas las métricas y estadísticas clave del sistema.
* **Órdenes / Boletas:** Gestión y seguimiento de todas las órdenes de compra realizadas -> Mostrar Boleta.
* **Producto:** Administración de inventarios y detalles -> Nuevo Producto / Mostrar Producto -> Editar Producto / Listado Productos Críticos / Reportes.
* **Categoría:** Organizar productos en categorías -> Nueva Categoría / Editar Categoría.
* **Usuario:** Gestión de cuentas de usuario y sus roles -> Nuevo Usuario / Mostrar Usuario -> Editar Usuario / Historial de Compras.
* **Reportes:** Generación de informes detallados sobre las operaciones del sistema.
* **Perfil:** Administración de la información personal y configuraciones de cuenta.
* **Tienda:** Visualiza tu tienda en tiempo real.

---

## Propuesta de pruebas con Jasmine

Utilizar Jasmine para escribir y ejecutar pruebas unitarias que aseguren la funcionalidad y calidad del código en una aplicación React. A través de estas pruebas, aprenderás a verificar el renderizado, el manejo de propiedades (*props*), el estado (*state*) y los eventos en los componentes React.

* **Pruebas de renderizado:**
  * **Renderizado correcto:** Verificar que los componentes se rendericen con los datos proporcionados (Ej: asegurar que los componentes de lista rendericen todos los elementos).
  * **Renderizado condicional:** Comprobar que se muestren/oculten elementos según ciertas condiciones (Ej: verificar que un mensaje de error solo se muestre cuando hay un error presente).
* **Pruebas de propiedades (props):**
  * **Propiedades Recibidas:** Confirmar que los componentes reciben y utilizan las propiedades adecuadas (Ej: verificar que un botón recibe correctamente la etiqueta y la función `onClick`).
* **Pruebas de Estado (state):**
  * **Gestión del Estado:** Comprobar la lógica de cambios de estado dentro de los componentes (Ej: verificar que el estado de un formulario cambia cuando el usuario introduce texto).
* **Pruebas de Eventos:**
  * **Simulación de Eventos:** Simular eventos de usuario para verificar reacciones (Ej: simular un clic en un botón y comprobar que el estado cambie o se ejecute la función esperada).

---

## Instrucciones para la entrega II

La entrega consiste en 2 partes:
1. Entrega y presentación de la solución de la propuesta.
2. Ronda de preguntas abiertas individuales formuladas por el docente para evaluar la comprensión técnica y los cambios realizados en GitHub durante el desarrollo frontend.

### Documentos requeridos:
* Documento **ERS** (Especificación de Requisitos del Software - V2 actualizada).
* Documento de **cobertura del testing**: Propuesta y análisis de los tests realizados.

### Entregables del encargo:
* Enlace GitHub público del proyecto frontend.
* Proyecto frontend comprimido.
* Documento ERS (actualizado V2).
* Documento de cobertura del testing.

### Presentación del caso:
* Presentación en 15 minutos por equipo + 5 minutos de ronda de preguntas.
* Demostración del desarrollo funcional integrado con backend y frontend.
* Ronda de preguntas abiertas.