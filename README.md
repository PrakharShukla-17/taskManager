# TaskManager 🗂️

A full-stack task management web application built with **React + TypeScript** (Vite), **Node.js + Express + TypeScript**, and **MongoDB Atlas**.

---

## Tech Stack

**Frontend:** React 18, TypeScript, Vite, Tailwind CSS, React Router v6, Axios, React Hot Toast, Lucide React, Pixelify Sans

**Backend:** Node.js, Express, TypeScript, Mongoose, Zod, bcryptjs, jsonwebtoken, Helmet, express-rate-limit

**Database:** MongoDB Atlas

---

## Features

- JWT-based authentication (register / login)
- Password strength indicator on signup
- Create, read, update, delete tasks
- Toggle tasks between pending and completed
- Priority levels — low, medium, high
- Optional due dates with overdue highlighting
- Debounced search across title and description
- Sidebar filter — All / Pending / Completed
- Pagination — 6 tasks per page
- Live stats bar (total, pending, completed)
- 8-step interactive guided tour
- Skeleton loading states
- Rate limiting + Helmet security headers

---

## Project Structure

```
taskManager/
├── backend/
│   ├── src/
│   │   ├── config/         # MongoDB connection
│   │   ├── controllers/    # Auth & Task controllers
│   │   ├── middleware/     # Auth, validation, error handler
│   │   ├── models/         # Mongoose User & Task models
│   │   ├── routes/         # Express routers
│   │   ├── utils/          # JWT helper
│   │   ├── validators/     # Zod schemas
│   │   └── index.ts        # Entry point
│   ├── .env.example
│   ├── package.json
│   └── tsconfig.json
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── auth/       # PasswordStrengthIndicator
│   │   │   ├── layout/     # Sidebar, ProtectedRoute, GuestRoute
│   │   │   ├── task/       # TaskCard, TaskModal
│   │   │   ├── tour/       # TourModal
│   │   │   └── ui/         # SearchBar, Pagination, StatsBar, EmptyState, Skeletons, DeleteConfirmModal
│   │   ├── context/        # AuthContext
│   │   ├── hooks/          # useTasks
│   │   ├── pages/          # LoginPage, RegisterPage, DashboardPage, NotFoundPage
│   │   ├── types/          # TypeScript interfaces
│   │   ├── utils/          # api.ts, passwordStrength.ts, tourSteps.ts
│   │   ├── App.tsx
│   │   ├── main.tsx
│   │   ├── vite-env.d.ts
│   │   └── index.css
│   ├── index.html
│   ├── package.json
│   ├── tailwind.config.js
│   ├── tsconfig.json
│   └── vite.config.ts
│
└── README.md
```

---

## Local Setup

### Prerequisites

- Node.js >= 18
- A [MongoDB Atlas](https://cloud.mongodb.com) account (free tier works)

---

### 1. Clone the repo

```bash
git clone https://github.com/your-username/taskmanager.git
cd taskmanager
```

---

### 2. MongoDB Atlas

1. Go to [cloud.mongodb.com](https://cloud.mongodb.com) and create a free cluster
2. **Database Access** → Add a new user with a username and password
3. **Network Access** → Add IP Address → `0.0.0.0/0` (allow all)
4. **Connect** → Drivers → copy the connection string

It looks like:
```
mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
```

Replace `<username>` and `<password>` with your actual credentials.

---

### 3. Backend

```bash
cd backend
cp .env.example .env
```

Edit `.env` and fill in your values:

```env
PORT=5000
MONGODB_URI=mongodb+srv://youruser:yourpass@cluster0.xxxxx.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=pick_any_long_random_string
JWT_EXPIRES_IN=7d
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

Then install and run:

```bash
npm install
npm run dev
```

Backend runs on **http://localhost:5000**

---

### 4. Frontend

```bash
cd ../frontend
npm install
npm run dev
```

Frontend runs on **http://localhost:5173**

The Vite dev server proxies `/api` requests to `localhost:5000` automatically — no extra config needed locally.

---

## Deployment

### Backend → Render

1. Go to [render.com](https://render.com) → **New → Web Service** → connect your GitHub repo
2. Set the following:

| Field | Value |
|---|---|
| Root Directory | `backend` |
| Runtime | `Node` |
| Build Command | `npm install && npm run build` |
| Start Command | `npm start` |

3. Add these **Environment Variables**:

| Key | Value |
|---|---|
| `NODE_ENV` | `production` |
| `PORT` | `5000` |
| `MONGODB_URI` | your Atlas connection string |
| `JWT_SECRET` | a long random secret |
| `JWT_EXPIRES_IN` | `7d` |
| `FRONTEND_URL` | your Vercel URL (add after frontend deploy) |

4. Deploy — you'll get a URL like `https://taskmanager-backend-xxxx.onrender.com`

---

### Frontend → Vercel

1. Go to [vercel.com](https://vercel.com) → **New Project** → import your GitHub repo
2. Set the following:

| Field | Value |
|---|---|
| Root Directory | `frontend` |
| Framework Preset | `Vite` |
| Build Command | `npm run build` |
| Output Directory | `dist` |

3. Add this **Environment Variable**:

| Key | Value |
|---|---|
| `VITE_API_URL` | `https://taskmanager-backend-xxxx.onrender.com` |

4. Deploy — you'll get a URL like `https://taskmanager-xxx.vercel.app`

---

### Final step — update CORS on Render

Go back to Render → your backend service → **Environment** and update:

```
FRONTEND_URL = https://taskmanager-xxx.vercel.app
```

Then **Manual Deploy → Redeploy** so the CORS config picks up the new origin.

---

## API Reference

### Auth

| Method | Endpoint | Description | Auth required |
|---|---|---|---|
| POST | `/api/auth/register` | Register a new user | No |
| POST | `/api/auth/login` | Login | No |
| GET | `/api/auth/me` | Get current user | Yes |

### Tasks

| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/tasks` | Get tasks (paginated, filterable, searchable) |
| POST | `/api/tasks` | Create a task |
| GET | `/api/tasks/stats` | Get task counts |
| GET | `/api/tasks/:id` | Get a single task |
| PUT | `/api/tasks/:id` | Update a task |
| DELETE | `/api/tasks/:id` | Delete a task |
| PATCH | `/api/tasks/:id/toggle` | Toggle pending / completed |

All `/api/tasks` routes require `Authorization: Bearer <token>` header.

### GET /api/tasks query params

| Param | Values | Default |
|---|---|---|
| `page` | number | `1` |
| `limit` | number | `6` |
| `status` | `all` / `pending` / `completed` | `all` |
| `search` | string | `""` |
| `priority` | `all` / `low` / `medium` / `high` | `all` |
| `sortBy` | field name | `createdAt` |
| `sortOrder` | `asc` / `desc` | `desc` |

---

## Environment Variables Reference

### Backend `.env`

| Variable | Description |
|---|---|
| `PORT` | Port the server runs on |
| `MONGODB_URI` | MongoDB Atlas connection string |
| `JWT_SECRET` | Secret key for signing JWT tokens |
| `JWT_EXPIRES_IN` | Token expiry e.g. `7d`, `24h` |
| `NODE_ENV` | `development` or `production` |
| `FRONTEND_URL` | Frontend origin for CORS |

### Frontend `.env` (Vercel)

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend base URL (without `/api`) |
DONE
