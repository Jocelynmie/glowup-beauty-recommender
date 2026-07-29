# GlowUp — Deployment Guide

## 1. Local development

```bash
# Backend  → http://localhost:4000
cd server && npm install && npm run dev

# Frontend → http://localhost:5173  (in a second terminal)
cd client && npm install && npm run dev
```

The Vite dev server proxies `/api/*` to the backend on port 4000, so open
**http://localhost:5173** and everything works out of the box on the rule-based
engine — no API key required.

### Enabling the optional AI enhancement

The `/api/recommend/ai` endpoint refines the wording with Claude. It is entirely
optional; without a key the endpoint transparently falls back to the rule-based
result. To enable it, set `ANTHROPIC_API_KEY` before starting the backend:

```bash
cd server
export ANTHROPIC_API_KEY=sk-ant-...   # or copy .env.example → .env and use `node --env-file`
npm run dev
```

When set, `GET /api/health` returns `{"aiEnabled": true}` and the frontend shows
an "✨ AI refine" toggle.

## 2. Running tests

```bash
cd server && npm test    # unit tests for the recommendation engine
```

## 3. Production build

```bash
# Backend: compile TS → dist/, then run with Node
cd server && npm install && npm run build && npm start   # serves the API on $PORT (default 4000)

# Frontend: build static assets into client/dist/
cd client && npm install && npm run build                # output in client/dist/
```

### Serving the built frontend

`client/dist/` is a static bundle — host it on any static host (Netlify, Vercel,
Cloudflare Pages, S3+CloudFront, Nginx). Point the host's `/api/*` route (or a
reverse proxy) at the running backend. In production the frontend expects `/api`
to reach the API; configure a proxy/rewrite accordingly (the Vite dev proxy only
applies during `npm run dev`).

### Environment variables (backend)

| Variable            | Required | Purpose                                            |
| ------------------- | -------- | -------------------------------------------------- |
| `ANTHROPIC_API_KEY` | No       | Enables `/api/recommend/ai`; omit for rules-only.  |
| `PORT`              | No       | API port (default `4000`).                         |

## 4. Suggested hosting

- **Frontend**: any static host (build with `npm run build`, deploy `client/dist/`).
- **Backend**: any Node host (Render, Railway, Fly.io, a container, or a VM).
  Set `ANTHROPIC_API_KEY` there if you want AI refinement, and route the
  frontend's `/api` to it.
