/**
 * Satu sumber URL situs untuk seluruh aplikasi: canonical, Open Graph,
 * JSON-LD, sitemap, dan robots.
 *
 * Ubah lewat `NEXT_PUBLIC_SITE_URL` — di `.env.local` saat lokal, atau di
 * Environment Variables Vercel untuk production. Nilai cadangan di bawah
 * HARUS domain production yang benar-benar hidup, karena itulah yang dipakai
 * Google sebagai alamat kanonis halaman ini.
 */
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://portfolio-tifani.vercel.app"
).replace(/\/$/, "");

/**
 * Tautan feed untuk bagian jurnal.
 *
 * Metadata Next digabung dangkal per field, jadi setiap halaman yang menulis
 * `alternates` sendiri (untuk canonical-nya) akan MENGGANTI `alternates` milik
 * layout — termasuk tautan feed-nya. Karena itu nilai ini disebar ulang di tiap
 * halaman jurnal dari satu definisi di sini, bukan ditulis terpisah-pisah.
 */
export const journalFeedAlternate = {
  types: { "application/rss+xml": "/journals/feed.xml" },
};
