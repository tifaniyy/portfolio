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
│  ├─ favicon.svg                ← mark situs — sumber semua ikon di bawah
│  ├─ favicon.ico                ← 16/24/32/48 px untuk tab browser & feed reader
│  ├─ apple-touch-icon.png       ← 180×180 px untuk "Add to Home Screen" di iOS
│  ├─ og-image.png               ← Open Graph image (1200×630), dari og-image.svg
│  ├─ og-image.svg               ← sumber desain og-image.png
│  └─ projects/                  ← real screenshots (PNG)
│     ├─ emisi-beranda.png
│     ├─ emisi-admin.png
│     ├─ ump-beranda.png
│     ├─ ump-cluster.png
│     ├─ ump-map.png
│     ├─ streamlit-ump.png
│     ├─ web-shoes-store.png
│     ├─ design-oldmarket.png
│     └─ ml-hand-gesture.png
├─ scripts/
│  ├─ generate-cv-placeholder.py ← regenerates public/cv.pdf
│  └─ generate-favicon.py        ← regenerates favicon.ico + apple-touch-icon.png
└─ src/
   ├─ app/
   │  ├─ layout.tsx              ← metadata, Open Graph, fonts, Navbar/Footer shell
   │  ├─ page.tsx                ← composes the sections + JSON-LD
   │  ├─ not-found.tsx           ← halaman 404 kustom
   │  ├─ sitemap.ts              ← /sitemap.xml (dari data jurnal yang terbit)
   │  ├─ robots.ts               ← /robots.txt (larang /journals/kelola)
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
   │  ├─ Contact.tsx             ← contact channels + Send Email / copy
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
      ├─ utils.ts                ← `cn()` class-merge helper
      └─ site.ts                 ← satu sumber URL situs (sitemap, canonical, OG)
```

## 5. Files to edit for your own content

| What | File |
| --- | --- |
| Name, title, hero text, about paragraphs, summary | `src/data/profile.ts` |
| About stat cards | `src/data/profile.ts` → `stats` |
| Education entries | `src/data/profile.ts` → `education` |
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
  used on the UMP project (free Railway instance expired) and on the AirNav
  carbon-emission dashboard (internship project, run locally/internal).
- Screenshots in `public/projects/` → real captures of each project (PNG).

## 6. Generator berkas biner

Kedua skrip di `scripts/` bersifat opsional — hanya perlu dijalankan kalau
sumber desainnya berubah.

`scripts/generate-cv-placeholder.py` tanpa dependensi (pustaka standar saja):

```bash
python scripts/generate-cv-placeholder.py # rewrites public/cv.pdf
```

`scripts/generate-favicon.py` membuat ulang `favicon.ico` + `apple-touch-icon.png`
dari geometri di dalamnya, yang disalin dari `favicon.svg` (butuh Pillow):

```bash
python scripts/generate-favicon.py        # rewrites public/favicon.ico + apple-touch-icon.png
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
- Contact CTA has two email actions: **Send Email** and **Copy Email**. Every
  email link on the site points at Gmail's web composer
  (`mail.google.com/mail/?view=cm&fs=1&to=…`, built by `gmailComposeUrl()` in
  `src/data/profile.ts`) so a click always opens a compose window with the
  address filled in — `mailto:` was dropped because it only works when the
  visitor has a mail client configured, and does nothing at all when they don't.
- No hardcoded `localhost` URLs — the site URL comes from `NEXT_PUBLIC_SITE_URL`
  with a fallback in `src/lib/site.ts` (used by canonical, OG, JSON-LD, sitemap
  and robots).
- SEO: `/sitemap.xml` and `/robots.txt` are generated (`src/app/sitemap.ts`,
  `src/app/robots.ts`). Only unfiltered page 1 of `/journals/browse` is
  indexable — filtered and paginated variants carry `noindex, follow`.
- `public/cv.pdf` memuat nama, email, LinkedIn, dan GitHub saja: nomor HP dan
  alamat rumah sudah dihapus dari berkasnya, jadi tidak ikut terunduh publik.
  Kalau CV-nya diperbarui, pastikan berkas baru juga tanpa data itu.
- Animations are subtle (small offsets, short durations) and are fully disabled
  under `prefers-reduced-motion: reduce`.
- Accessibility: semantic landmarks, one `h1`, labelled icon links, visible
  focus rings, a "skip to content" link, keyboard-operable cards and modals.
