# EcoRuta BAQ — Backend

API REST en **Node.js + Express + PostgreSQL** para la plataforma EcoRuta BAQ.

## 🚀 Cómo correrlo

### 1. Requisitos
- Node.js 18+
- Un PostgreSQL corriendo (local, o el de Supabase — ver abajo)

### 2. Instalar dependencias
```bash
cd backend
npm install
```

### 3. Configurar el `.env`
Copia `.env.example` a `.env` y ajusta `DATABASE_URL` con tus credenciales:
```
DATABASE_URL=postgresql://usuario:password@localhost:5432/eco_ruta
```

### 4. Crear la base de datos y cargar el esquema
```bash
createdb eco_ruta
psql -d eco_ruta -f ../database/eco_ruta.sql
```
Esto crea las tablas (`users`, `spots`, `guide_items`, `reports`) y siembra:
- Los 6 materiales de la guía de reciclaje con sus puntos por Kg.
- Los 5 puntos de acopio de Barranquilla.
- Un usuario administrador de prueba:
  - **Email:** `admin@ecorutabaq.com`
  - **Password:** `Admin1234`

### 5. Levantar el servidor
```bash
npm run dev     # con auto-reload
# o
npm start
```
El servidor queda en `http://localhost:3000`. El frontend (Vite) ya está apuntando ahí.

## 🔌 Migrar a Supabase (Postgres administrado)
Supabase es PostgreSQL puro, así que **no hay que tocar código**. Solo:
1. Crea un proyecto en Supabase.
2. Ve a *Project Settings → Database → Connection string → URI* y cópialo.
3. Pégalo en `DATABASE_URL` de tu `.env` y pon `DATABASE_SSL=true`.
4. Corre `database/eco_ruta.sql` en el *SQL Editor* de Supabase (una sola vez).
5. Reinicia el backend. Listo.

## 📚 Endpoints principales

| Método | Ruta                          | Descripción                                  | Auth        |
|--------|-------------------------------|-----------------------------------------------|-------------|
| POST   | `/api/auth/register`          | Registro de usuario                           | -           |
| POST   | `/api/auth/login`              | Login (devuelve JWT)                          | -           |
| GET    | `/api/auth/me`                 | Usuario autenticado                           | Bearer      |
| GET    | `/api/spots`                   | Listar puntos de acopio                       | -           |
| GET    | `/api/guide`                   | Guía de reciclaje por material                | -           |
| POST   | `/api/reports`                 | Registrar entrega (`multipart/form-data`, campo `evidence` para la foto) | Bearer |
| GET    | `/api/reports/me`              | Mis entregas                                  | Bearer      |
| PUT    | `/api/reports/:id`             | Editar entrega (solo si sigue pendiente)      | Bearer      |
| DELETE | `/api/reports/:id`             | Borrar entrega (solo si sigue pendiente)      | Bearer      |
| GET    | `/api/reports?status=pendiente`| Listar todas las entregas                     | Admin       |
| PUT    | `/api/reports/:id/validate`    | Validar/rechazar una entrega (otorga puntos)  | Admin       |
| GET    | `/api/points/me`                | Puntos confirmados y pendientes del usuario   | Bearer      |
| GET    | `/api/points/ranking`           | Ranking ecológico (top usuarios)              | -           |
| GET    | `/api/admin/stats`              | Métricas para el dashboard administrativo     | Admin       |

Los puntos **siempre se calculan en el servidor** (cantidad × puntos/Kg de `guide_items`) y solo se suman al total del usuario cuando un administrador valida el reporte.
