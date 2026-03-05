# CLAUDE.md — UW Planner Reimagined

## What this project is

A React SPA that replaces the University of Waterloo's legacy UW Planner Annual Plan interface. It manages initiatives (projects with milestones, statuses, and progress tracking) for the VPRI-RO&I office.

## Tech stack

- **Vite** — build tool and dev server
- **React 19** — UI framework (no class components, hooks only)
- **Tailwind CSS v4** — styling via `@tailwindcss/vite` plugin
- **localStorage** — client-side persistence (no backend)
- **GitHub Pages** — deployment via `.github/workflows/deploy.yml`

## Architecture

```
src/
├── App.jsx                          # Root: Header + Dashboard
├── main.jsx                         # Entry point
├── index.css                        # Tailwind imports, keyframes, global styles
├── constants/index.js               # STATUS_COLORS, UNITS, OBJECTIVES, INITIAL_INITIATIVES
├── hooks/useInitiatives.js          # CRUD hook with localStorage sync
├── pages/Dashboard.jsx              # Main page: stat cards, filters, table, panels, toasts
├── components/
│   ├── common/SlideOver.jsx         # Shared slide-over panel wrapper
│   ├── common/Field.jsx             # Form label wrapper
│   ├── dashboard/StatCard.jsx       # Clickable status count card
│   ├── dashboard/StatusBadge.jsx    # Coloured status pill
│   ├── dashboard/ProgressBar.jsx    # Animated progress bar
│   ├── initiatives/InitiativeTable.jsx  # Sortable table with header
│   ├── initiatives/InitiativeRow.jsx    # Desktop row + mobile card (responsive)
│   ├── initiatives/InitiativeDetail.jsx # Read-only slide-over detail view
│   ├── initiatives/InitiativeForm.jsx   # Create/edit slide-over form
│   └── layout/Header.jsx           # Black top bar with UW branding
```

## Data model

Each initiative has:
```js
{
  id: number,              // Date.now() for new, sequential for seed
  title: string,
  objective: string,       // one of OBJECTIVES (excluding "All")
  unit: string,            // one of UNITS
  collaboratingUnit: string,
  endYear: string,         // "2024/25" format
  status: string,          // key of STATUS_COLORS
  milestoneProgress: number, // 0-100
  description: string,
  milestones: [{ year: string, text: string, done: boolean }]
}
```

## Design conventions

- **UW brand colours**: gold `#FFD54F`, black `#1A1A1A`, warm grey bg `#F5F3EE`
- **Fonts**: DM Sans (body), Fraunces (headings) — loaded via Google Fonts in `index.html`
- **Dynamic colours** (StatusBadge, StatCard, ProgressBar) use inline `style` since Tailwind can't generate classes from runtime values
- **No component libraries** — all UI is custom
- **Slide-over panels** for create/edit/view — no page navigation
- Toast notifications are CSS-only (keyframe animations, no library)

## Commands

- `npm run dev` — start dev server
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Key patterns

- `useInitiatives` hook is the single source of truth for initiative state
- All mutations sync to localStorage immediately
- Filtering (status, objective, search) happens in Dashboard.jsx
- Sorting happens in InitiativeTable.jsx
- SlideOver is a shared wrapper; InitiativeDetail and InitiativeForm compose inside it
