# Apexora Backend

Node.js + Express + TypeScript + MongoDB (Mongoose) backend for the **Apexora**
travel planner. Implements role-based JWT auth (`superadmin` / `admin` / `user`)
and matches the frontend API contracts under `src/lib/api/*` in the web app.

## Stack
- Express 4 + TypeScript
- MongoDB via Mongoose
- JWT auth (Bearer token) + bcrypt password hashing
- Zod request validation
- Helmet, CORS, rate limiting, morgan logging
- Layered structure: `routes → controllers → services → models`

## Quick start

```bash
cp .env .env
npm install
npm run seed     # creates demo users, trips, bookings
npm run dev      # http://localhost:5000/api/v1
```

Demo accounts (password: `password`):
- `super@apexora.io` — superadmin
- `admin@apexora.io` — admin
- `user@apexora.io` — user

## Folder structure

```
src/
├── config/          env + db connection
├── middleware/      auth, role guard, error handler, validator
├── models/          Mongoose schemas (User, Trip, Booking, Plan)
├── controllers/     HTTP handlers
├── services/        business logic
├── routes/          Express routers, mounted in app.ts
├── validators/      Zod schemas
├── utils/           jwt, ApiError, asyncHandler, ApiResponse
├── seed/            seed script
├── types/           shared TS types + express augmentation
├── app.ts           express app wiring
└── server.ts        entrypoint
```

## API surface

All responses follow: `{ success: boolean, data: T, message?: string }`.

### Auth (`/auth`)
- `POST /register` — public
- `POST /login` — public
- `POST /logout` — auth
- `GET  /me` — auth

### Trips (`/trips`)
- `GET  /` — public, supports `?search=&category=`
- `GET  /:id` — public
- `POST /` — admin, superadmin
- `PATCH /:id` — admin (owner), superadmin
- `DELETE /:id` — admin (owner), superadmin

### Bookings (`/bookings`)
- `GET  /?userId=` — user (self), admin, superadmin
- `GET  /all` — admin, superadmin
- `POST /` — user
- `POST /:id/cancel` — user (owner), admin

### Plans (`/plans`)
- `GET  /?userId=` — user (self)
- `POST /` — user

### Admin (`/admin`)
- `GET /users` — admin, superadmin

### Superadmin (`/superadmin`)
- `GET  /admins`
- `POST /admins`

## Frontend integration

In the web app set:
```
VITE_API_URL=http://localhost:5000/api/v1
```
Then uncomment the axios calls in `src/lib/api/*.ts` — the shapes match.
