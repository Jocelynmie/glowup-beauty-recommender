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
├── server/                      # Backend (Express + TS)
│   ├── package.json
│   ├── tsconfig.json
│   └── src/
│       ├── index.ts             # Express entry + routes + input validation
│       └── recommendation/
│           ├── types.ts         # Domain model / type definitions
│           ├── knowledgeBase.ts # Form options + seasonal color palettes + lip palettes
│           └── engine.ts        # Core recommendation engine logic
└── client/                      # Frontend (React + Vite + TS)
    ├── package.json
    ├── vite.config.ts           # Includes /api proxy configuration
    ├── tsconfig.json
    ├── index.html
    └── src/
        ├── main.tsx
        ├── index.css            # Tailwind + gradient background
        ├── types.ts             # Frontend types [to do]
        └── App.tsx              # Main UI (form + results display) [to do]
```

---

## 4. Current Progress (as of 2026-07-16)

### ✅ Completed
- **Backend recommendation engine**: complete rule mappings — face shape → contour/blush/jewelry, facial features → eye makeup/brows/lips
- **Knowledge base**: 6 seasonal color palettes (cool/warm/neutral × light/deep), lip palettes categorized by undertone, and all form options (with labels and hints)
- **Express API**:
  - `GET /api/health` — health check
  - `GET /api/options` — returns form options for dynamic frontend rendering
  - `POST /api/recommend` — core recommendation endpoint (with enum validation)
- **Frontend scaffold**: Vite + React + TS + Tailwind v4 configuration, entry file, and API proxy

- **Documentation & code language**: all docs and in-code comments/strings translated to English

### ⏳ To Do (next week)
- Frontend main UI `App.tsx` (feature form + result cards)
- Dependency installation and end-to-end run verification of frontend + backend
- Color-swatch visualization components, loading/error states

---

## 5. Work Log (2026-07-05 ~ 2026-07-16)

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
| 07-16 | Localization & wrap-up | Translated all documentation and in-code comments/strings to English; wrapped up this week's work and pushed to GitHub |

---

## 6. Next Week's Plan (2026-07-17 ~ 2026-07-23)

- [ ] **07-17**: Finish the frontend main UI `App.tsx` — feature form, submit interaction, result cards
- [ ] **07-18**: Implement color-swatch visualization components, loading/error states; complete frontend–backend integration
- [ ] **07-19**: Install dependencies, run frontend + backend locally, and verify the recommendation flow end-to-end
- [ ] **07-21**: Polish the UI — responsive layout, animations, mobile adaptation
- [ ] **07-22**: (Optional) Add AI enhancement: use an LLM to personalize/refine the rule-based results, or add image-based face-shape detection
- [ ] **07-23**: Add unit tests, write deployment docs, and prepare a demo

---

## 7. How to Run (after installing dependencies)

```bash
# Backend
cd server && npm install && npm run dev      # http://localhost:4000

# Frontend (in a separate terminal)
cd client && npm install && npm run dev      # http://localhost:5173
```

The frontend forwards `/api` requests to the backend on port 4000 via the Vite proxy.
