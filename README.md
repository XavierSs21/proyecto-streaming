# IndieStream

> Plataforma de streaming para cine independiente construida con el stack MERN

[![Node Version](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)](https://nodejs.org)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

---

## Tabla de Contenidos

- [Descripción](#descripción)
- [Características](#características)
- [Tecnologías](#tecnologías)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Configuración](#configuración)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [API Documentation](#api-documentation)
- [Equipo](#equipo)

---

## Descripción

IndieStream es una plataforma de streaming diseñada para la distribución de películas independientes. Implementa un sistema completo de gestión de contenido audiovisual con autenticación JWT, panel administrativo y gestión de listas personalizadas.

Proyecto desarrollado como parte del curso Desarrollo Web Fullstack 1 (MERN), desplegado en Oracle Cloud Infrastructure.

---

## Características

### Funcionalidades Implementadas

**Usuario:**
- Registro y autenticación con JWT (RSA keys)
- Recuperación de contraseña por email
- Lista personal de películas ("Mi Lista")
- Exploración de catálogo por género

**Administrador:**
- CRUD completo de películas
- Carga de videos y thumbnails
- Gestión de usuarios (conversión a admin vía script)

**Técnicas:**
- Autenticación JWT con claves RSA
- Rate limiting básico
- Logging con Winston
- Manejo de errores centralizado
- Carga de archivos a Cloudinary

---

## Tecnologías

### Backend
```json
{
  "runtime": "Node.js 18+",
  "framework": "Express 5.x",
  "database": "MongoDB 6.x + Mongoose",
  "auth": "JWT + bcryptjs",
  "storage": "Cloudinary (en proceso: Oracle Object Storage)",
  "email": "Nodemailer (Gmail)",
  "logging": "Winston + winston-daily-rotate-file",
  "upload": "Multer + multer-s3"
}
```

### Frontend
```json
{
  "framework": "React 18",
  "build": "Vite",
  "routing": "React Router DOM 6",
  "state": "TanStack Query (React Query)",
  "styling": "Tailwind CSS 4",
  "components": "shadcn/ui",
  "forms": "React Hook Form + Zod",
  "icons": "Lucide React"
}
```

### Infraestructura
- **Servidor:** Oracle Cloud Infrastructure (Ubuntu)
- **Web Server:** Nginx (reverse proxy)
- **Process Manager:** PM2
- **Database:** MongoDB Atlas

---

## Requisitos Previos

```bash
Node.js >= 18.0.0
npm >= 9.0.0
MongoDB >= 6.0
```

---

## Instalación

### Clonar el Repositorio

```bash
git clone <repository-url>
cd indiestream
```

### Backend

```bash
cd backend
npm install
```

### Frontend

```bash
cd frontend
npm install
```

---

## Configuración

### Variables de Entorno - Backend

Crear archivo `.env` en `/backend`:

```env
# Servidor
NODE_ENV=development
PORT=8000

# Base de datos
MONGODB_URI=mongodb://localhost:27017/indiestream
# O MongoDB Atlas:
# MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/indiestream

# JWT (generar clave de 32+ caracteres)
JWT_SECRET=tu-clave-super-secreta-minimo-32-caracteres

# Email
EMAIL_USER=tu-email@gmail.com
EMAIL_PASS=tu-app-password-de-gmail

# URLs
FRONTEND_URL=http://localhost:5173
BACKEND_URL=http://localhost:8000

# Cloudinary
CLOUDINARY_CLOUD_NAME=tu-cloud-name
CLOUDINARY_API_KEY=tu-api-key
CLOUDINARY_API_SECRET=tu-api-secret
```

### Variables de Entorno - Frontend

Crear archivo `.env` en `/frontend`:

```env
VITE_API_URL=http://localhost:8000
```

### Generar Claves RSA

```bash
cd backend
mkdir -p keys
openssl genrsa -out keys/private.key 4096
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

---

## Uso

### Desarrollo Local

**Backend:**
```bash
cd backend
npm run dev
# Servidor corriendo en http://localhost:8000
```

**Frontend:**
```bash
cd frontend
npm run dev
# Aplicación corriendo en http://localhost:5173
```

### Crear Usuario Administrador

```bash
cd backend
node src/scripts/makeAdmin.js usuario@email.com
```

---

## Estructura del Proyecto

```
indiestream/
├── backend/
│   ├── config/
│   │   ├── database.js
│   │   └── logger.js
│   ├── src/
│   │   ├── controllers/
│   │   │   ├── HealthController.js
│   │   │   ├── movieController.js
│   │   │   ├── myListController.js
│   │   │   └── UserController.js
│   │   ├── middleware/
│   │   │   ├── auth.js
│   │   │   ├── errorHandler.js
│   │   │   ├── morganMiddleware.js
│   │   │   ├── performanceMonitor.js
│   │   │   ├── rateLimiter.js
│   │   │   └── requestIdMiddleware.js
│   │   ├── models/
│   │   │   ├── movie.js
│   │   │   ├── myList.js
│   │   │   └── user.js
│   │   ├── routes/
│   │   │   ├── movieRoutes.js
│   │   │   ├── myListRoute.js
│   │   │   └── UserRoute.js
│   │   ├── scripts/
│   │   │   └── makeAdmin.js
│   │   └── index.js
│   ├── logs/
│   ├── keys/
│   ├── .gitignore
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── api/
│   │   │   ├── axios.js
│   │   │   ├── MovieApi.jsx
│   │   │   └── UserApi.jsx
│   │   ├── components/
│   │   │   ├── forms/
│   │   │   │   ├── MovieForm.jsx
│   │   │   │   └── SessionForm.jsx
│   │   │   ├── Home/
│   │   │   │   ├── FeaturedCarrousel.jsx
│   │   │   │   ├── Footer.jsx
│   │   │   │   ├── Header.jsx
│   │   │   │   ├── MovieGrid.jsx
│   │   │   │   └── SearchBar.jsx
│   │   │   └── ui/
│   │   │       └── (shadcn components)
│   │   ├── lib/
│   │   │   └── utils.js
│   │   ├── pages/
│   │   │   ├── Admin.jsx
│   │   │   ├── ForgotPassword.jsx
│   │   │   ├── Home.jsx
│   │   │   ├── Login.jsx
│   │   │   ├── MoviePlayer.jsx
│   │   │   ├── Movies.jsx
│   │   │   ├── MyList.jsx
│   │   │   ├── Register.jsx
│   │   │   └── ResetPassword.jsx
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .gitignore
│   ├── package.json
│   └── vite.config.js
│
└── README.md
```

---

## API Documentation

### Autenticación

**POST** `/user/register`
```json
{
  "nombre": "string",
  "correo": "string",
  "password": "string"
}
```

**POST** `/user/login`
```json
{
  "correo": "string",
  "password": "string"
}
```
Retorna: `{ token: "jwt-token", user: {...} }`

**POST** `/user/forgot-password`
```json
{
  "correo": "string"
}
```

**POST** `/user/reset-password/:token`
```json
{
  "password": "string"
}
```

### Películas

**GET** `/movies`
- Query params: `genre` (opcional)

**GET** `/movies/:id`

**POST** `/movies` (requiere token admin)
- Headers: `Authorization: Bearer <token>`
- Body: FormData
  - title, description, director, year, duration, genre
  - video (file)
  - thumbnail (file)

**PUT** `/movies/:id` (requiere token admin)
- Headers: `Authorization: Bearer <token>`
- Body: FormData (campos opcionales)

**DELETE** `/movies/:id` (requiere token admin)
- Headers: `Authorization: Bearer <token>`

### Mi Lista

**GET** `/list` (requiere token)
- Headers: `Authorization: Bearer <token>`

**POST** `/list/:movieId` (requiere token)
- Headers: `Authorization: Bearer <token>`

**DELETE** `/list/:movieId` (requiere token)
- Headers: `Authorization: Bearer <token>`

### Health Check

**GET** `/health`
- Retorna estado del servidor y conexión a BD

---

## Deployment en OCI

### Estado Actual

El proyecto está desplegado en Oracle Cloud Infrastructure:
- Backend: Corriendo con PM2
- Frontend: Servido por Nginx
- MongoDB: MongoDB Atlas
- Storage: Cloudinary

### Acceso

```bash
ssh ubuntu@<ip-servidor>
cd /ruta/al/proyecto
```

### PM2 Commands

```bash
pm2 list                    # Ver procesos
pm2 logs backend            # Ver logs
pm2 restart backend         # Reiniciar
pm2 stop backend            # Detener
```

### Nginx

Configuración en: `/etc/nginx/sites-available/indiestream`

```bash
sudo nginx -t               # Verificar configuración
sudo systemctl restart nginx # Reiniciar Nginx
```

---

## Estado del Proyecto

### Completado
- ✅ Autenticación con JWT (RSA)
- ✅ CRUD de películas
- ✅ Sistema de listas personalizadas
- ✅ Upload de archivos a Cloudinary
- ✅ Panel de administración
- ✅ Recuperación de contraseña
- ✅ Logging estructurado
- ✅ Rate limiting básico
- ✅ Deployment en OCI

### En Progreso
- 🔄 Integración con Oracle Object Storage (problema con ES modules en oci-sdk)
- 🔄 Tests unitarios

### Pendiente
- ⏳ CI/CD automatizado
- ⏳ Dockerización
- ⏳ Tests de integración
- ⏳ Paginación en listados
- ⏳ Búsqueda avanzada

---

## Equipo

- **Xavier** - Full Stack
- **Paloma** - Full Stack
- **Guillermo** - Fronted

---

## Problemas Conocidos

1. **Oracle Object Storage**: Incompatibilidad del paquete `oci-sdk` con ES modules
2. **Rate Limiting**: Configurado básicamente, necesita Redis para ambientes distribuidos
3. **Validación**: Se hace en controladores, pendiente migrar a capa de validación dedicada

---

## Licencia

MIT

---

**Última actualización:** Diciembre 2024
