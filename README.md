# Cloud Computing - Sistema CRUD

Este repositorio contiene un sistema de inventario (CRUD) desarrollado para la asignatura de **Computación en la Nube** del **Instituto Profesional Santo Tomás**.

El proyecto demuestra la transición de una aplicación de almacenamiento local a un sistema completamente en la nube utilizando tecnologías Serverless.

## 🚀 Versiones del Proyecto

El proyecto está dividido en dos versiones funcionales para demostrar la diferencia entre el almacenamiento local en el navegador y una base de datos en la nube real.

### 1. Versión Cloud (Firebase) - *Principal*
* **Link en vivo:** [https://paulfl808.github.io/nubecompu/](https://paulfl808.github.io/nubecompu/)
* Utiliza **Firebase Firestore** (NoSQL) como base de datos en la nube.
* Los productos se guardan, leen, editan y eliminan en tiempo real, sincronizándose entre cualquier dispositivo que abra la página web.

### 2. Versión Local (LocalStorage)
* **Link en vivo:** [https://paulfl808.github.io/nubecompu/version_localstorage/](https://paulfl808.github.io/nubecompu/version_localstorage/)
* Funciona de manera 100% offline.
* Utiliza el `localStorage` del navegador para guardar los datos en formato JSON.
* Demuestra cómo era el sistema antes de implementar la conexión a Firebase.

## 🛠️ Resumen del Proceso de Desarrollo

El desarrollo de este sistema siguió un flujo progresivo:

1. **Diseño de Interfaz (HTML/CSS):** 
   Comenzamos diseñando una *Landing Page* (Inicio) y un *Dashboard* (Inventario) con un diseño moderno, limpio y discreto. Se crearon dos vistas separadas (`index.html` y `dashboard.html`).

2. **Implementación Local (El origen):** 
   Inicialmente, la lógica del CRUD se construyó utilizando Javascript nativo interactuando con el `localStorage` del navegador. Esto permitió probar la inserción y listado de productos de forma rápida (guardando objetos JSON).

3. **Migración a la Nube (Firebase Firestore):** 
   Para hacer el sistema verdaderamente "Cloud":
   * Se creó un proyecto en Firebase y se habilitó la base de datos Firestore en Modo de Prueba.
   * Se reemplazó el uso de `localStorage` por los módulos de Firebase (`addDoc`, `onSnapshot`, `deleteDoc`, `updateDoc`).
   * Al ser una base de datos NoSQL, las colecciones de productos se crearon automáticamente al insertar el primer registro.

4. **Despliegue Continuo (GitHub Pages):** 
   El código fuente se subió a este repositorio en GitHub, configurando la rama `gh-pages` para alojar la página web de manera gratuita y pública, vinculando el frontend directamente con Firebase sin necesidad de un servidor intermedio (Backend-as-a-Service).

## 💻 Tecnologías Utilizadas

* **Frontend:** HTML5, CSS3, JavaScript (ES6 Modules)
* **Base de Datos:** Firebase Firestore (Cloud NoSQL)
* **Hosting:** GitHub Pages
* **Iconos:** FontAwesome
