# 🏥 Medical App

Medical App es una aplicación web diseñada para gestionar formularios médicos de manera eficiente. Incluye un **backend** desarrollado con Node.js y PostgreSQL, y un **frontend** construido con React. 🚀

---

## 🛠️ Requisitos previos

Antes de comenzar, asegúrate de tener instalado:

- 🐳 **Docker**: Para gestionar los contenedores.
- 💻 **Node.js** (opcional, si deseas ejecutar el proyecto fuera de Docker).

---

## 🚀 Inicialización del proyecto

Sigue estos pasos para configurar e iniciar el proyecto:

### 1️⃣ Configurar el **frontend**

1. Abre un terminal y ejecuta el siguiente comando para iniciar un contenedor de Node.js para el frontend:
   ```bash
   docker run -it --rm -v "$PWD/frontend":/app -w /app node:18 bash
2. Dentro del contenedor, instala las dependencias del frontend ejecutando:
   ```bash
   npm install
3. Cuando la instalacion este completa y exitosa, ya puedes salir del contenedor.
   ```bash
   exit
### 2️⃣ Configurar el **backend**
1. Abre un terminal y ejecuta el siguiente comando para iniciar un contenedor de Node.js para el backend:
    ```bash 
    docker run -it --rm -v "$PWD/backend":/app -w /app node:18 bash
2. Dentro del contenedor, instala las dependencias del backend ejecutando:
   ```bash
   npm install
3. Cuando la instalacion este completa y exitosa, ya puedes salir del contenedor.
   ```bash
   exit
### 3️⃣ Iniciar los servicios con Docker Compose

1. Una vez que las dependencias estén instaladas, inicia los servicios definidos en docker-compose.yml ejecutando:

   ```bash
   docker-compose up

Esto levantará los servicios del frontend, backend y la base de datos PostgreSQL. 🎉

### 🌐 Endpoints principales

## Backend (http://localhost:3001)
- POST /register: Registro de usuarios.
- POST /login: Inicio de sesión.
- GET /me: Información del usuario autenticado.
/forms:
- GET: Obtener formularios del usuario autenticado.
- POST: Crear un nuevo formulario.
## Frontend
El frontend estará disponible en: http://localhost:5173 🌟

## 📂 Notas adicionales
Asegúrate de que el archivo backend/db/init.sql esté configurado correctamente para inicializar la base de datos.
Usa el token generado al iniciar sesión para autenticar las solicitudes protegidas.
Si necesitas reiniciar los contenedores rápidamente, usa:
   ```bash
    docker-compose down
    docker-compose up
```

🎉 ¡Listo para usar!
¡Disfruta trabajando con Medical App y mejora la gestión de formularios médicos! 🩺✨