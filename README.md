# Tifani Yunitami — Personal Portfolio

A modern, responsive personal portfolio built with Next.js (App Router), TypeScript
and Tailwind CSS. Content lives in plain data files, so no component code needs to
be touched to update the profile, skills, experience or projects.

- **Stack:** Next.js 16 (App Router) · TypeScript · Tailwind CSS v4 · Motion · Lucide React · Radix Dialog
- **Design:** clean, data-oriented, light theme with the palette `#0F172A / #1E293B / #2563EB / #F8FAFC / #64748B`
- **Typeface:** Plus Jakarta Sans (self-hosted via `next/font`)
- **Deploy target:** Vercel (zero config)

---

## 1. Requirements

- Node.js 20.9+ (developed on Node 26)
- npm 10+

## 2. Run locally

```bash
npm install
npm run dev
```

Open <http://localhost:3000>.

## 3. Production build

```bash
npm run build     # type-checks + compiles; must finish with "Compiled successfully"
npm run start     # serves the production build on http://localhost:3000
npm run lint      # ESLint (next/core-web-vitals + TypeScript rules)
```

## 4. Folder structure

```
portfolio/
├─ public/
│  ├─ cv.pdf                     ← replace with your real CV (same file name)
│  ├─ favicon.svg                ← favicon placeholder
│  ├─ og-image.svg               ← Open Graph image (1200×630)
│  └─ projects/                  ← screenshot placeholders (replace with real PNG/JPG)
│     ├─ ump-dashboard.svg
│     ├─ ump-clustering.svg
│     ├─ ump-map.svg
│     ├─ carbon-dashboard.svg
│     ├─ carbon-route-map.svg
│     ├─ wifi7-research.svg
│     ├─ telkom-web.svg
│     └─ telkom-figma.svg
├─ scripts/
│  ├─ generate-placeholders.py   ← regenerates the SVG placeholders above
│  └─ generate-cv-placeholder.py ← regenerates public/cv.pdf
└─ src/
   ├─ app/
   │  ├─ layout.tsx              ← metadata, Open Graph, fonts, Navbar/Footer shell
   │  ├─ page.tsx                ← composes the sections + JSON-LD
   │  └─ globals.css             ← design tokens, base styles, helpers
   ├─ components/
   │  ├─ Navbar.tsx              ← sticky navbar, blur on scroll, mobile menu
   │  ├─ Hero.tsx                ← hero + CTA + social links
   │  ├─ About.tsx               ← two-column about + stat cards
   │  ├─ Skills.tsx              ← grouped skill cards
   │  ├─ Experience.tsx          ← vertical timeline
   │  ├─ Projects.tsx            ← projects grid + modal state
   │  ├─ ProjectCard.tsx         ← single project card (hover animation)
   │  ├─ ProjectModal.tsx        ← project detail dialog
   │  ├─ Education.tsx           ← education section
   │  ├─ Contact.tsx             ← contact channels + copy-email button
   │  ├─ Footer.tsx              ← footer navigation
   │  ├─ SectionHeading.tsx      ← shared eyebrow + title + description
   │  ├─ Reveal.tsx              ← reusable fade-in / slide-up on scroll
   │  └─ icons.tsx               ← GitHub / LinkedIn brand icons
   ├─ data/
   │  ├─ profile.ts              ← name, title, about, links, stats, education, nav
   │  ├─ skills.ts               ← skill categories
   │  ├─ experience.ts           ← timeline entries
   │  └─ projects.ts             ← projects (description, problem, solution, …)
   └─ lib/
      └─ utils.ts                ← `cn()` class-merge helper
```

## 5. Files to edit for your own content

| What | File |
| --- | --- |
| Name, title, hero text, about paragraphs, summary | `src/data/profile.ts` |
| **Email + LinkedIn (currently placeholders)** | `src/data/profile.ts` → `profile.email`, `profile.linkedin` |
| Education entries | `src/data/profile.ts` → `education` |
| About stat cards | `src/data/profile.ts` → `stats` |
| Navbar / footer menu items | `src/data/profile.ts` → `navLinks` |
| Skills per category | `src/data/skills.ts` |
| Experience timeline | `src/data/experience.ts` |
| Tulisan jurnal | halaman **`/journals/kelola`** di komputer → `data/journals.json` di-commit & push — lihat `PANDUAN-JURNAL.md` |
| Projects (all fields + links + screenshots) | `src/data/projects.ts` |
| Your real CV | replace `public/cv.pdf` |
| Real screenshots | replace the files in `public/projects/` |
| Site URL (canonical + OG) | `.env.local` → `NEXT_PUBLIC_SITE_URL` |
| Page title / meta description | `src/app/layout.tsx` |

### Placeholders that still need your input

- `public/cv.pdf` → replace whenever the CV is updated (keep the file name).
- `project.demo` → every project is `null`, so the cards show a **View Source**
  button pointing at GitHub instead of a dead "Live Demo" button. Set a real URL
  in `src/data/projects.ts` to turn a button into a working Live Demo.
- `project.deploymentNote` → optional note shown in the detail modal. Currently
  used on the UMP project to explain that its free Railway instance expired.
- Screenshots in `public/projects/` → generated wireframe placeholders.

## 6. Placeholder generators

Both scripts are dependency-free (standard library only):

```bash
python scripts/generate-placeholders.py   # rewrites public/projects/*.svg
python scripts/generate-cv-placeholder.py # rewrites public/cv.pdf
```

## 7. Deploy to Vercel

**Option A — Dashboard (easiest)**

1. Push this folder to a GitHub repository:
   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/tifaniyy/<repo-name>.git
   git push -u origin main
   ```
2. Go to <https://vercel.com/new>, import that repository.
3. Vercel auto-detects Next.js — leave Build Command (`next build`) and Output
   settings untouched.
4. (Optional) Add an environment variable `NEXT_PUBLIC_SITE_URL` with your final
   production URL, then redeploy.
5. Deploy. Every later push to `main` redeploys automatically.

**Option B — CLI**

```bash
npm i -g vercel
vercel        # preview deployment
vercel --prod # production deployment
```

## 8. Notes

- No secrets or API keys are used anywhere; `.env.local` is git-ignored and
  `.env.example` documents the only optional variable.
- No hardcoded `localhost` URLs — the site URL comes from `NEXT_PUBLIC_SITE_URL`
  with a Vercel fallback.
- Animations are subtle (small offsets, short durations) and are fully disabled
  under `prefers-reduced-motion: reduce`.
- Accessibility: semantic landmarks, one `h1`, labelled icon links, visible
  focus rings, a "skip to content" link, keyboard-operable cards and modals.
