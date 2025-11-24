# Innovativa 4.0 — README

## 1. Resumen del proyecto
El siguiente README explica qué es el proyecto Innovativa 4.0, qué incluye y cómo levantarlo localmente paso a paso, con todos los comandos, 
variables de entorno y problemas comunes que puedes encontrar. Está orientado a que cualquier desarrollador pueda ponerlo a 
correr en su máquina y empezar a trabajar en el frontend (React + Vite) y el backend (Node.js + Express + Sequelize + MySQL).
Resumen del proyecto:
- Frontend: **React + Vite**
- Backend: **Node.js + Express + Sequelize + MySQL** Endpoints REST para autenticación (login/refresh/logout/register), proyectos, categories, daily, contacts, companies, users, uploads.
- Autenticación JWT
- Subida de imágenes con Cloudinary
- Bull + Redis para colas de correos
- Panel administrativo con gestión de usuarios, proyectos, empresas, contactos, etc.

Despliegue a Produccion:
https://innovativa40.com/
---

## 2. Requisitos Previos

### Software necesario
- **Node.js v18+**
- **MySQL 8+**
- **Redis** (solo si usas Bull en local)
- **Git**
- **Docker** (opcional)

---

## 3. Estructura del Proyecto
```
/Proyecto-Innovativa-40
├─ front/                      # frontend Vite + React
│  ├─ src/
│  ├─ public/
│  ├─ package.json
│  └─ vite.config.js
├─ api/                        # backend Node.js + Express
│  ├─ controllers/
│  ├─ db/
│  ├─ services/
│  ├─ models/                   # Sequelize models
│  ├─ migrations/               # opcional
│  ├─ queues/
│  ├─ routes/
│  ├─ middlewares/
│  ├─ utils/
│  ├─ validators/
│  ├─ workers/                  # Bull workers (email)
│  ├─ .env.example
│  └─ package.json
└─ README.md
```

---

## 4. Variables de Entorno

### Frontend → `/front/.env`
```
VITE_API_URL=http://localhost:3000/api
VITE_CLOUDINARY_CLOUD_NAME=xxxx
VITE_CLOUDINARY_UPLOAD_PRESET=xxxx
```

### Backend → `/api/.env`
```
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_NAME=innovativa40
DB_USER=root
DB_PASS=root

JWT_SECRET=clave-super-secreta-ejemplo
JWT_EXPIRATION=15m            # access token
JWT_REFRESH_SECRET=clave-super-secreta-ejemplo
JWT_REFRESH_EXPIRATION=7d    # refresh token TTL
COOKIE_SECURE=false          # true en producción con HTTPS
PASSWORD_SALT_ROUNDS=12
MAX_LOGIN_ATTEMPTS=5
LOCK_TIME_SECONDS=600        # 10 minutos

USE_REDIS=true/false
USE_WORKER=true/false
MAILER_USE_ETHEREAL=true/false

ADMIN_EMAIL=example@xxxx
FROM_EMAIL=example@xxxx

SMTP_HOST=SmtpHostExample
SMTP_PORT=465
SMTP_USER=example@xxxx
SMTP_PASS=xxxx

MAILGUN_ENABLED=true/false
MAILGUN_API_KEY=xxxx
MAILGUN_DOMAIN=xxxx
```

---

## 5. Instalación y Ejecución Local

### Backend
```bash
cd api
npm install
npm start
```

### Frontend
```bash
cd front
npm install
npm run dev
```

---

## 6. Base de Datos

Crear la base de datos:
```sql
CREATE DATABASE innovativa40;
```

El backend generará las tablas automáticamente gracias a:
```js
sequelize.sync();
```

---

## 7. Endpoints Principales

### Autenticación
- `POST /api/users/login`
- `POST /api/users/register`
- `POST /api/users/refresh`
- `POST /api/users/logout`

### Proyectos
- `GET /api/projects`
- `GET /api/projects/:id`
- `POST /api/projects`
- `PUT /api/projects/:id`
- `DELETE /api/projects/:id`

### Empresas
- `GET /api/companies`
- `POST /api/companies`

### Contactos
- `GET /api/contacts`
- `DELETE /api/contacts/:id`

### Empresas
- `GET /api/companies`
- `GET /api/companies/:id`
- `POST /api/companies`
- `PUT /api/companies/:id`
- `DELETE /api/companies/:id`

### Usuarios
- `GET /api/users`
- `GET /api/users/:id`
- `PUT /api/users/:id`
- `DELETE /api/users/:id`
- `POST /api/users/register`

---

## 8. Seguridad

- JWT Access Token + Refresh Token
- Cookies HttpOnly para mayor protección
- Sanitización de entradas
- CORS configurado correctamente entre frontend y backend
- Variables de entorno ocultas

---

¡Gracias por usar Innovativa 4.0!
