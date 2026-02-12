# Scott Fairdosi Portfolio (React + Express + PostgreSQL)

A full-stack portfolio website with two pathways:
- Music Background (`/music`)
- Software Engineering Background (`/engineering`)

## Tech Stack
- Frontend: React + Vite + React Router
- Backend: Node.js + Express
- Database: PostgreSQL (`pg`)
- Tooling: npm workspaces + concurrently + nodemon

## Project Structure
- `client/`: React app
- `server/`: Express API + PostgreSQL scripts
- `server/db/schema.sql`: database schema
- `server/db/seed.js`: seed script with profile content

## 1. Install dependencies
From project root:

```bash
npm install
```

## 2. Create PostgreSQL database
Example with psql:

```bash
createdb scott_portfolio
```

## 3. Configure environment variables
Copy example env file:

```bash
cp server/.env.example server/.env
cp client/.env.example client/.env
```

Edit `server/.env` if your local postgres credentials differ.

## 4. Seed database

```bash
npm run db:seed --workspace server
```

## 5. Start development servers

```bash
npm run dev
```

- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:4000/api`

## Key API Endpoints
- `GET /api/health`
- `GET /api/portfolio`
- `GET /api/pathways/:slug`

## Notes
- Update GitHub links in seed data (`server/db/seed.js`) to your exact repos.
- The server also serves `client/dist` in production after running client build.
