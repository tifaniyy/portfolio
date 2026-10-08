# Panduan Upload ke GitHub & Deploy ke Vercel

Semua perintah di bawah dijalankan di **Git Bash** (atau PowerShell — perintahnya sama).

Folder proyek: `T:\FOLDER TIFANI\portfolio`

> Repo lokal sudah siap: branch `main`, 5 commit, working tree bersih, 46 file ter-track.
> Yang belum ada cuma **repo di GitHub** dan **remote**-nya.

---

## Langkah 1 — Buat repo kosong di GitHub

1. Buka <https://github.com/new> (login sebagai `tifaniyy`).
2. **Repository name:** `portfolio`
3. **Description** (opsional): `Personal portfolio — Next.js, TypeScript, Tailwind CSS`
4. Pilih **Public**.
5. **JANGAN centang** "Add a README file", "Add .gitignore", atau "Choose a license".
   (Repo harus benar-benar kosong, kalau tidak nanti bentrok saat push.)
6. Klik **Create repository**.

Setelah dibuat, catat URL-nya. Untuk akun `tifaniyy`:

```
https://github.com/tifaniyy/portfolio.git
```

---

## Langkah 2 — Hubungkan folder lokal ke repo itu, lalu push

```bash
cd "T:/FOLDER TIFANI/portfolio"

# daftarkan remote (sekali saja)
git remote add origin https://github.com/tifaniyy/portfolio.git

# pastikan benar
git remote -v

# kirim semua commit
git push -u origin main
```

Saat push pertama, Git akan minta login GitHub:

- **Cara termudah:** pakai **Git Credential Manager** — akan muncul jendela browser,
  klik *Sign in with your browser* → login → selesai. Git menyimpan kredensialnya, jadi
  push berikutnya tidak ditanya lagi. Kalau jendela itu tidak muncul otomatis, jalankan:
  ```bash
  git config --global credential.helper manager
  ```
- **Alternatif:** Personal Access Token (PAT). Buat di
  <https://github.com/settings/tokens> → *Generate new token (classic)* → centang
  scope **`repo`** → copy token. Saat Git minta password, tempel token itu
  (bukan password akun). Simpan tokennya baik-baik, tidak bisa dilihat lagi.

Kalau sudah terlanjur salah pilih remote:

```bash
git remote set-url origin https://github.com/tifaniyy/portfolio.git
```

Kalau repo di GitHub tidak kosong (misal tidak sengaja dibuat README):

```bash
git pull --rebase origin main
git push -u origin main
```

---

## Langkah 3 — Deploy ke Vercel

### Cara A — Dashboard (paling mudah, tanpa terminal)

1. Buka <https://vercel.com/signup> → **Continue with GitHub** → authorize.
2. Di dashboard Vercel: **Add New… → Project**.
3. Pilih repo **portfolio** → klik **Import**.
4. Vercel otomatis mendeteksi Next.js. **Biarkan semua default**
   (Framework Preset: Next.js, Build Command: `next build`, Output: `.next`).
5. (Opsional tapi disarankan) buka **Environment Variables**, tambahkan:
   | Name | Value |
   | --- | --- |
   | `NEXT_PUBLIC_SITE_URL` | `https://<nama-project>.vercel.app` |
   Isi nilai ini **sesudah** kamu tahu domain finalnya (lihat Langkah 4), lalu redeploy.
6. Klik **Deploy**. Tunggu ±1–2 menit.
7. Selesai — dapat URL `https://portfolio-xxxx.vercel.app`.

Setiap `git push` ke branch `main` berikutnya akan **otomatis redeploy**.

### Cara B — CLI

```bash
npm i -g vercel
cd "T:/FOLDER TIFANI/portfolio"
vercel          # preview deployment, ikuti prompt login
vercel --prod   # deployment production
```

---

## Langkah 4 — Setelah live

1. Salin URL production (mis. `https://portfolio-tifani.vercel.app`).
2. Buka **Vercel → Project → Settings → Environment Variables**, set
   `NEXT_PUBLIC_SITE_URL` ke URL itu → **Save** → **Deployments → Redeploy**
   supaya canonical URL dan Open Graph memakai alamat yang benar.
3. Buka websitenya, cek: navbar, tombol Download CV di hero, tombol Journals di
   kanan atas, menu mobile, klik kartu project.

---

## Sebelum publikasi — WAJIB diganti dulu

Masih ada placeholder di dalam project. Ganti semua ini supaya website tidak
menampilkan data palsu:

| Yang masih placeholder | File |
| --- | --- |
| CV (PDF asli sudah terpasang) | `public/cv.pdf` — ganti bila CV diperbarui |
| URL Live Demo semua project (masih `null`) | `src/data/projects.ts` → `demo` |
| Judul & meta description (kalau perlu) | `src/app/layout.tsx` |

Screenshot di `public/projects/` sudah memakai tangkapan asli tiap project (9
berkas PNG), jadi daftar placeholder di atas tidak lagi menyertakannya.

Catatan: project UMP pernah di-deploy di Railway, tapi instance gratisnya sudah
berakhir. Di modal detail sudah ada penjelasan otomatis
(`src/data/projects.ts` → `deploymentNote`). Hal yang sama berlaku untuk dashboard
emisi karbon AirNav: itu project magang, dijalankan lokal/internal, dan
`deploymentNote`-nya menjelaskan hal itu. Kalau nanti ada yang di-deploy lagi
(Railway, Render, Fly.io, dsb.), cukup isi URL-nya di `demo` dan hapus
`deploymentNote`-nya.

Setelah mengedit data:

```bash
cd "T:/FOLDER TIFANI/portfolio"
npm run dev      # cek di http://localhost:3000
npm run build    # pastikan tetap "Compiled successfully"
git add -A
git commit -m "Update data pribadi"
git push
```

---

## Ringkasan perintah (kalau sudah paham)

```bash
cd "T:/FOLDER TIFANI/portfolio"
git remote add origin https://github.com/tifaniyy/portfolio.git
git push -u origin main
```

Lalu import di <https://vercel.com/new> → Deploy.
