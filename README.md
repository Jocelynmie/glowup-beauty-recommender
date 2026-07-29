# GlowUp ✨ — Personalized Beauty & Style Recommendation System

Users submit their facial features (face shape / skin tone / undertone / facial features), and the system automatically recommends a suitable **makeup look**, **outfit color palette**, and **jewelry** to wear.

---

## 1. Overview

GlowUp is a personalized beauty recommendation web app powered by a rule-based knowledge base. After a user fills out a short facial-feature questionnaire, the backend recommendation engine combines face shape, skin tone, undertone, and facial features to produce a complete styling plan:

- **Makeup advice**: contouring, blush, eye makeup, brows, lips + a recommended lip color palette
- **Outfit color palette**: matches a seasonal color type based on the four-season color theory, with best colors / colors to avoid / versatile neutrals
- **Jewelry advice**: metal tone (gold / silver / rose gold), earrings, and necklace styles

---

## 2. Tech Stack

| Layer | Technology |
| --- | --- |
| Frontend | React 18 + Vite + TypeScript + Tailwind CSS v4 |
| Backend | Node.js + Express + TypeScript |
| Recommendation engine | Rule-based knowledge base (deterministic, runs offline) |
| Communication | REST API (frontend proxies to backend via Vite proxy) |

Rationale: both frontend and backend use TypeScript, so types are reusable and development is fast; the recommendation engine is implemented as a rule base, making results explainable with no external dependencies, and it can be smoothly extended with AI enhancements later.

---

## 3. Project Structure

```
GlowUp-Project/
├── README.md                    # This document
├── DEPLOYMENT.md                # Local dev, tests, and production deployment guide
├── server/                      # Backend (Express + TS)
│   ├── package.json
│   ├── tsconfig.json
│   ├── .env.example             # Optional ANTHROPIC_API_KEY / PORT
│   └── src/
│       ├── index.ts             # Express entry + routes + input validation
│       └── recommendation/
│           ├── types.ts         # Domain model / type definitions
│           ├── knowledgeBase.ts # Form options + seasonal color palettes + lip palettes
│           ├── engine.ts        # Core recommendation engine logic
│           ├── engine.test.ts   # Unit tests (node:test via tsx)
│           └── aiEnhance.ts     # Optional Claude-based prose refinement (graceful fallback)
└── client/                      # Frontend (React + Vite + TS)
    ├── package.json
    ├── vite.config.ts           # Includes /api proxy configuration
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── index.css            # Tailwind + gradient background + entrance animations
        ├── types.ts             # Frontend types (synced with backend)
        ├── api.ts               # API client (getOptions / getHealth / postRecommend)
        ├── App.tsx              # Main UI: loads options, form state, submit flow, AI toggle
        └── components/
            ├── FeatureForm.tsx  # Dynamic feature selectors + validation
            ├── Results.tsx      # Makeup / outfit / jewelry result cards
            └── ColorSwatch.tsx  # Color chips (click to copy hex)
```

---

## 4. Current Progress (as of 2026-07-29)

### ✅ Completed
- **Backend recommendation engine**: complete rule mappings — face shape → contour/blush/jewelry, facial features → eye makeup/brows/lips
- **Knowledge base**: 6 seasonal color palettes (cool/warm/neutral × light/deep), lip palettes categorized by undertone, and all form options (with labels and hints)
- **Express API**:
  - `GET /api/health` — health check (also reports whether AI is available)
  - `GET /api/options` — returns form options for dynamic frontend rendering
  - `POST /api/recommend` — core rule-based recommendation (with enum validation)
  - `POST /api/recommend/ai` — AI-refined recommendation; falls back to rule-based if no API key
- **AI enhancement (optional)**: `aiEnhance.ts` uses the Anthropic SDK (Claude `claude-opus-4-8`, structured outputs) to rewrite the prose in a warmer, personalized voice while keeping all color palettes deterministic. Fully optional — the app runs offline on rules when no `ANTHROPIC_API_KEY` is set.
- **Frontend (full flow)**: `types.ts` + `api.ts` data layer; `FeatureForm` with dynamic selectors and completion validation; submit flow with loading/error states; `Results` cards; `ColorSwatch` chips with click-to-copy; entrance animations; "✨ AI refine" toggle (shown only when AI is available) + "AI refined" badge
- **Tests**: `engine.test.ts` — 13 unit tests covering season mapping, jewelry metal, lip palettes, and per-face-shape advice (`npm test`)
- **Frontend–backend integration**: verified end-to-end — options load, recommendations return for all undertone/skin paths, AI endpoint falls back cleanly, Vite `/api` proxy works, both `npm run build` type-check with no errors
- **Docs**: `DEPLOYMENT.md` (local dev, tests, production build/hosting, env vars); all docs and code in English

### ✅ Project complete
All planned milestones (rule engine → full UI → integration → AI enhancement → tests → deployment docs) are done. Possible future work: image-based face-shape detection, saved profiles, more granular color analysis.

---

## 5. Work Log (2026-07-05 ~ 2026-07-29)

| Date | Phase | Details |
| --- | --- | --- |
| 07-05 | Requirements analysis | Defined product goal: recommend makeup/outfit/jewelry based on facial features; determined input dimensions (face shape, skin tone, undertone, eye shape, lip shape, brow shape) |
| 07-06 | Research | Researched the four-season color theory and the rules linking face shape to jewelry/contouring; organized recommendation rule sources |
| 07-08 | Tech selection | Chose React+Vite+TS frontend, Node+Express+TS backend, and a rule-based knowledge base for recommendations |
| 07-09 | Domain modeling | Defined `types.ts`: input features, makeup/outfit/jewelry advice, color swatches, and other data structures |
| 07-11 | Knowledge base | Wrote `knowledgeBase.ts`: form options, 6 seasonal color palettes, undertone-based lip palettes |
| 07-13 | Recommendation engine | Implemented `engine.ts`: rule mappings from face shape/facial features/undertone to each type of advice, plus season-type matching logic |
| 07-14 | Backend API | Built the Express service; implemented options / recommend / health endpoints + input validation |
| 07-15 | Frontend scaffold | Configured Vite + Tailwind v4, the API proxy, entry files, and type definitions |
| 07-16 | Localization & wrap-up | Translated all documentation and in-code comments/strings to English; wrapped up the week and pushed to GitHub |
| 07-17 | Frontend data layer | Wrote `types.ts` (synced with backend) and `api.ts` (getOptions / postRecommend); verified fetching options |
| 07-18 | Feature form | Built `FeatureForm` — dynamically renders the six feature selectors from the options API |
| 07-19 | Form interaction | Managed selection state, completion validation, and disabled/enabled submit button |
| 07-20 | Submit → result flow | Wired `App.tsx`: POST /api/recommend, loading/error states, smooth scroll to results, "Start over" |
| 07-21 | Result cards & swatches | Built `Results` (makeup/outfit/jewelry cards) and `ColorSwatch` (click-to-copy color chips) |
| 07-22 | Integration & verify | Installed deps, ran frontend + backend, verified full flow end-to-end and a clean production build |
| 07-23 | UI polish | Added entrance animations (fade-up + stagger, `prefers-reduced-motion` aware) to result cards; responsive tuning |
| 07-24 | UX touches | Loading/error copy, smooth scroll to results, "Start over"; QA across undertone/skin-tone combinations |
| 07-25 | AI enhancement — design | Designed the Claude refinement prompt + structured-output schema; keep palettes deterministic, refine prose only |
| 07-27 | AI enhancement — build | Implemented `aiEnhance.ts` + `POST /api/recommend/ai` with graceful fallback; added the frontend AI toggle + badge |
| 07-28 | Tests | Wrote `engine.test.ts` (13 tests, `node:test` via tsx); all passing |
| 07-29 | Deployment & wrap-up | Wrote `DEPLOYMENT.md` + `.env.example`, finalized README, and pushed to GitHub |

---

## 6. Plan (2026-07-23 ~ 2026-07-29) — ✅ complete

- [x] **07-23**: Extra UI polish — entrance animations, responsive tuning
- [x] **07-24**: UX touches — empty/error copy, result scrolling; QA across input combinations
- [x] **07-25**: AI enhancement — Claude-API prompt + structured-output schema for personalized copy
- [x] **07-27**: AI enhancement — `/api/recommend/ai` with fallback to rule-based results; frontend toggle
- [x] **07-28**: Unit tests for the recommendation engine
- [x] **07-29**: Deployment docs and final README update

---

## 7. How to Run (after installing dependencies)

```bash
# Backend
cd server && npm install && npm run dev      # http://localhost:4000

# Frontend (in a separate terminal)
cd client && npm install && npm run dev      # http://localhost:5173
```

The frontend forwards `/api` requests to the backend on port 4000 via the Vite proxy.
