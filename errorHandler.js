# 🌱 EcoRuta BAQ

**Environmental Platform** — Recycle your everyday waste and earn rewards.

EcoRuta BAQ is a web platform built as an Integrative Project (Proyecto Integrador) at **Riwi**, designed to promote responsible recycling in Barranquilla, Colombia. It combines environmental education, an interactive map of authorized collection points, a photo-verified delivery system, and an ecological points/rewards program to turn recycling into a rewarding daily habit.

Citizens often want to recycle but don't know _what_ can be recycled, _how_ to prepare it, or _where_ to take it. EcoRuta BAQ closes that gap: users learn how to recycle each type of material, find nearby drop-off points on a map, register their deliveries with photo evidence, and earn ecological points once an administrator validates the report — points that can later be redeemed for rewards.

---

## 📑 Table of Contents

- [Features](#-features)
- [MVP](#-mvp-delivered)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Data Model](#-data-model)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [API Endpoints](#-api-endpoints)
- [User Stories & Epics](#-user-stories--epics)
- [Team](#-team)
- [Methodology & Scrum Evidence](#-methodology--scrum-evidence)
- [GitFlow](#-gitflow)
- [Documentation](#-documentation)
- [Roadmap](#-roadmap)

---

## ✨ Features

- ✅ Learn how to recycle each type of waste through an interactive guide.
- ✅ Consult environmental recommendations per material.
- ✅ Search authorized recycling drop-off points on an interactive map.
- ✅ Register a recycling delivery (material + quantity).
- ✅ Upload photo evidence to back up the report.
- ✅ Earn ecological points once an administrator validates the delivery.
- ✅ Check a personal ranking of top recyclers.
- ✅ Redeem accumulated points for rewards.
- ✅ Administrative dashboard with platform-wide metrics.

## 🚀 MVP Delivered

- User registration
- Login (as recycler or administrator)
- Recycling guide (select material → learn how to recycle it)
- Consultation of recycling drop-off points
- Delivery registration with photo evidence upload
- Administrator validation of pending reports
- Points system (calculated server-side)
- Ecological ranking
- Administrative dashboard
- Reward redemption

## 🌐 Live Deployment

EcoRuta BAQ is deployed and publicly accessible:

Plataform:

- Vercel (Frontend) URL: "eco-ruta-baq.vercel.app"
- Railway (Backend/API) URL: "eco-ruta-baq-production.up.railway.app"
- Supabase (Database)
  Both services auto-deploy on every push to the "estructura-actualizada" branch.

---

## 🛠 Tech Stack

### Frontend

- **JavaScript (Vanilla ES6+)** — core application logic, hash-based dynamic routing (`hashchange`), DOM manipulation, view injection and client-side session persistence.
- **Tailwind CSS** — utility-first styling for the responsive UI, dynamic visual states (e.g. Recycler/Administrator role selection cards) and visual consistency across the Dashboard and Landing Page.
- **Leaflet.js** — open-source interactive maps library, used to render OpenStreetMap tiles and plot geolocated recycling drop-off points across Barranquilla.
- **HTML5 (dynamic templates)** — UI structured through template literals, loaded dynamically based on the SPA's navigation state.

### Backend

- **Node.js + Express.js** — REST API exposing all business logic.
- **JWT (JSON Web Tokens)** — stateless authentication and role-based authorization (recycler vs. administrator).
- **Multer** — middleware for handling `multipart/form-data` uploads (delivery photo evidence).

### Database

- **PostgreSQL** — relational database storing users, spots, guide items and reports, with full referential integrity.
- **pgAdmin 4** — local database administration during development.
- **Supabase** — managed PostgreSQL used for cloud deployment (drop-in replacement, no code changes required).

### Tooling

- **GitHub** — version control and collaborative development (GitFlow).
- **Trello** — Scrum board for sprint planning, backlog and process evidence.
- **Figma** — UI/UX design and prototyping.

---

## 🏗 Architecture

EcoRuta BAQ follows a decoupled **client-server architecture**:

```
┌───────────────────────────┐        HTTPS / fetch        ┌───────────────────────────┐        SQL (pg)        ┌─────────────────────┐
│      CLIENT (Browser)     │        JSON + JWT            │      SERVER (Node.js)     │                         │     PERSISTENCE      │
│  Vanilla JS SPA (hash     │ ───────────────────────────▶ │  Express REST API         │ ──────────────────────▶│  PostgreSQL           │
│  router) + Tailwind CSS   │                               │  Middlewares: auth (JWT), │                         │  (Supabase / pgAdmin) │
│  + Leaflet.js (maps)      │ ◀─────────────────────────── │  admin, upload, errors    │ ◀───────────────────── │  + evidence uploads    │
└───────────┬───────────────┘                               │  Models: user, report,    │                         └─────────────────────┘
            │ tiles                                          │  spot, guide             │
            ▼                                                └───────────────────────────┘
     OpenStreetMap
```

A core architectural rule: **ecological points are always calculated on the server** (quantity × points-per-kg defined in `guide_items`) and are only added to a user's total once an **administrator validates** the corresponding report — the client can never manipulate its own score.

### Frontend (SPA)

The frontend is a Single Page Application. `router.js` drives navigation through the `hashchange` event, dynamically loading views from `src/pages/` (landing, login, register-page, dashboard, points-dashboard) without full page reloads.

- `components/` — reusable UI elements (`alert.js`, `button.js`, `input.js`, `navbar.js`).
- `pages/` — main application views, each as an independent module.
- `services/` — API communication layer (`api.js`, `authService.js`, `dashboardService.js`, `landingService.js`, `pointsService.js`), keeping network logic separate from presentation.
- `main.js` / `router.js` — application entry point and hash-based route control.

### Backend

The backend follows a modular MVC-style structure on top of Express:

- `config/db.js` — PostgreSQL connection pool configuration.
- `middleware/` — `auth.middleware.js` (JWT verification), `admin.middleware.js` (admin role guard), `upload.middleware.js` (Multer file uploads), `errorHandler.js` (centralized error handling).
- `models/` — `user.model.js`, `report.model.js`, `spot.model.js`, `guide.model.js`.
- `routes/` — `auth.routes.js`, `report.routes.js`, `spot.routes.js`, `guide.routes.js`, `points.routes.js`, `admin.routes.js`.
- `uploads/evidencias/` — storage for user-submitted evidence photos.

---

## 🗂 Data Model

Four core entities: **users**, **spots**, **guide_items** and **reports**, with `reports` acting as the central entity linking a user, a material and (optionally) a drop-off point.

| Table         | Description                                                                                                                                                    |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `users`       | Registered accounts. `role` distinguishes _recycler_ from _administrator_; `points_total` holds validated points.                                              |
| `spots`       | Authorized drop-off points in Barranquilla: name, address, zone, accepted materials and coordinates (used by Leaflet.js).                                      |
| `guide_items` | Recycling guide: one row per material with preparation instructions and points awarded per kilogram.                                                           |
| `reports`     | Each delivery: user, material, quantity (kg), evidence photo, status (`pending` / `approved` / `rejected`), calculated points, and the admin who validated it. |

**Relationships**

- `users (1) — (N) reports` — a user can register many deliveries.
- `guide_items (1) — (N) reports` — each delivery is classified under one guide material.
- `spots (1) — (N) reports` — a delivery can be linked to the drop-off point where it happened.
- `users (1, admin role) — (N) reports` — an admin can validate many reports (`validated_by`).

_(Full entity-relationship diagram available in the project's technical document.)_

---

## 📁 Project Structure

### Backend

```
backend/
├── config/
│   └── db.js
├── middleware/
│   ├── admin.middleware.js
│   ├── auth.middleware.js
│   ├── errorHandler.js
│   └── upload.middleware.js
├── models/
│   ├── guide.model.js
│   ├── report.model.js
│   ├── spot.model.js
│   └── user.model.js
├── routes/
│   ├── admin.routes.js
│   ├── auth.routes.js
│   ├── guide.routes.js
│   ├── points.routes.js
│   ├── report.routes.js
│   └── spot.routes.js
├── uploads/evidencias/
├── utils/
│   └── jwt.js
├── .env.example
├── package.json
└── server.js

database/
└── eco_ruta.sql
```

### Frontend

```
frontend/
├── public/
├── src/
│   ├── assets/
│   ├── components/
│   │   ├── alert.js
│   │   ├── button.js
│   │   ├── input.js
│   │   └── navbar.js
│   ├── pages/
│   │   ├── dashboard.js
│   │   ├── landing.js
│   │   ├── login.js
│   │   ├── points-dashboard.js
│   │   └── register-page.js
│   ├── services/
│   │   ├── api.js
│   │   ├── authService.js
│   │   ├── dashboardService.js
│   │   ├── landingService.js
│   │   └── pointsService.js
│   ├── main.js
│   └── router.js
├── index.html
├── style.css
├── vite.config.js
└── package.json
```

---

## ⚙️ Getting Started

### Requirements

- Node.js 18+
- A running PostgreSQL instance (local, or Supabase — see below)

### 1. Install dependencies

```bash
cd backend
npm install
```

### 2. Configure environment variables

Copy `.env.example` to `.env` and set `DATABASE_URL`:

```
DATABASE_URL=postgresql://user:password@localhost:5432/eco_ruta
```

### 3. Create the database and load the schema

```bash
createdb eco_ruta
psql -d eco_ruta -f ../database/eco_ruta.sql
```

This creates the tables (`users`, `spots`, `guide_items`, `reports`) and seeds:

- The 6 recycling guide materials with their points per kg.
- The 5 authorized drop-off points in Barranquilla.
- A test administrator account — **Email:** `admin@ecorutabaq.com` · **Password:** `Admin1234`

### 4. Run the server

```bash
npm run dev   # with auto-reload
# or
npm start
```

The server runs at `http://localhost:3000`. The Vite-powered frontend is already pointing to it.

### 5. Migrate to Supabase (managed PostgreSQL)

Supabase is plain PostgreSQL, so **no code changes are required**:

1. Create a Supabase project.
2. Go to _Project Settings → Database → Connection string → URI_ and copy it.
3. Paste it into `DATABASE_URL` in `.env` and set `DATABASE_SSL=true`.
4. Run `database/eco_ruta.sql` once in Supabase's _SQL Editor_.
5. Restart the backend.

---

## 🔌 API Endpoints

| Method | Route                           | Description                                                                 | Auth   |
| ------ | ------------------------------- | --------------------------------------------------------------------------- | ------ |
| POST   | `/api/auth/register`            | User registration                                                           | –      |
| POST   | `/api/auth/login`               | Login (returns JWT)                                                         | –      |
| GET    | `/api/auth/me`                  | Get authenticated user                                                      | Bearer |
| GET    | `/api/spots`                    | List drop-off points                                                        | –      |
| GET    | `/api/guide`                    | Recycling guide by material                                                 | –      |
| POST   | `/api/reports`                  | Register a delivery (`multipart/form-data`, field `evidence` for the photo) | Bearer |
| GET    | `/api/reports/me`               | My deliveries                                                               | Bearer |
| PUT    | `/api/reports/:id`              | Edit a delivery (only while pending)                                        | Bearer |
| DELETE | `/api/reports/:id`              | Delete a delivery (only while pending)                                      | Bearer |
| GET    | `/api/reports?status=pendiente` | List all deliveries                                                         | Admin  |
| PUT    | `/api/reports/:id/validate`     | Validate/reject a delivery (awards points)                                  | Admin  |
| GET    | `/api/points/me`                | Confirmed and pending points for the user                                   | Bearer |
| GET    | `/api/points/ranking`           | Ecological ranking (top users)                                              | –      |
| GET    | `/api/admin/stats`              | Metrics for the admin dashboard                                             | Admin  |

Points are **always calculated server-side** (quantity × points/kg from `guide_items`) and only credited to a user's total once an administrator validates the report.

---

## 📝 User Stories & Epics

The backlog is organized into **6 epics** and **15 user stories**, tracked on Trello:

| Epic                       | User Stories                                                                         |
| -------------------------- | ------------------------------------------------------------------------------------ |
| 🟣 EP-01 User Management   | HU-01 Register · HU-02 Login · HU-03 Logout                                          |
| 🟢 EP-02 Report Management | HU-04 Register delivery · HU-05 Upload evidence · HU-06 History                      |
| 🔵 EP-03 Recycling Points  | HU-07 View recycling points · HU-08 Point information                                |
| 🟡 EP-04 Points System     | HU-09 Calculate points · HU-10 View my points · HU-11 Ranking                        |
| 🔴 EP-05 Administration    | HU-12 Pending reports · HU-13 Approve report · HU-14 Reject report · HU-15 Dashboard |
| 🟤 EP-06 Recycling Guide   | Guide on how to recycle each type of material                                        |

Core flow — _as a recycler, I register, learn how to recycle, deliver material with photo evidence, and earn points once an admin validates my report; as an admin, I review, approve/reject, and monitor platform metrics._

---

## 👥 Team

| Member             | Role              |
| ------------------ | ----------------- |
| Carlos Aponte      | Scrum Master      |
| Ferney Castro      | Database          |
| Andrés Elles       | Frontend          |
| Daniel Chacón      | Frontend          |
| Alejandro González | Backend & GitFlow |
| Luis Gómez         | Backend           |

**Academy:** Riwi

---

## 📋 Methodology & Scrum Evidence

The project was developed using **Scrum**, managed through a Trello board organized by workflow columns: _Product Backlog_, _Sprint Backlog_, _In Develop_, _In revision_, _Testing QA_, _Finished_ and _Bugs_, plus a dedicated _Information of the project_ section holding the team's branch/commit conventions and a _Documentation_ list tracking the project's deliverables (README, technical pitch, commercial pitch, technical document, test cases).

Each card includes a subtask checklist, member labels and, when applicable, due dates — giving full traceability of each user story's progress throughout the sprint.

---

## 🌿 GitFlow

Branch and commit conventions used across the team (led by Alejandro González):

**Branches**

- `main` — stable branch, only tested and delivery-ready versions.
- `develop` — integration branch where new features converge before reaching `main`.
- `feature/feature-name` — one branch per user story (e.g. `feature/registro-usuario`, `feature/dashboard-admin`).
- `fix/bug-name` — branches for bug fixes found during QA.

**Commit convention** (semantic prefixes)

- `feat:` new functionality
- `fix:` bug fix
- `docs:` documentation changes
- `style:` Tailwind/styling changes with no logic change
- `refactor:` internal code improvements with no behavior change

---

## 📚 Documentation

- `DOC 01` — README (this file)
- `DOC 02` — Technical pitch
- `DOC 03` — Commercial pitch
- `DOC 04` — Full technical document (objectives, ERD, architecture, user stories, Scrum evidence, MVP)
- `DOC 06` — Test cases

## 🗺 Roadmap

- [ ] Real payment gateway for reward redemption
- [ ] Email/push notifications on report validation
- [ ] Expand and manage the rewards catalog from the admin panel
- [ ] Automated unit/integration tests, especially for points calculation and validation
- [ ] Native mobile app (Android/iOS)
- [ ] Real-time integration with external recycling companies / collection routes

---

**Delivery date:** July 20, 2026
