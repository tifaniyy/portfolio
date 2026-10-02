/**
 * Bentuk data + fungsi bantu untuk tulisan jurnal (blog).
 * ---------------------------------------------------------------
 * Isi tulisan TIDAK ditulis di file ini. Semua tulisan tersimpan sebagai JSON
 * di `data/journals.json` dan diubah lewat halaman /journals/kelola langsung
 * dari browser (tanpa menyentuh kode).
 *
 * File ini hanya berisi tipe data + fungsi murni (tanpa akses berkas), jadi
 * aman dipakai di server maupun di browser.
 * ---------------------------------------------------------------
 */

export type Journal = {
  /** Wajib unik — jadi alamat URL: /journals/<slug>. */
  slug: string;
  title: string;
  authors: string[];
  /** Nama jurnal / konferensi / penerbit, atau "Catatan Pribadi". */
  venue: string;
  year: string;
  /**
   * Tanggal publikasi "YYYY-MM-DD".
   * Tulisan TANPA tanggal = DRAF: belum tampil untuk pengunjung, hanya muncul
   * di halaman /journals/kelola.
   */
  date?: string;
  /** Bebas: "Journal", "Conference", "Catatan", "Preprint". */
  type?: string;
  /** Ringkasan 1–3 kalimat — tampil di daftar dan jadi meta description. */
  abstract?: string;
  /** Isi tulisan. Lihat cara menulisnya di src/components/JournalMarkdown.tsx. */
  content?: string;
  /** Link PDF — lokal (letakkan di public/journals/) atau URL penuh. */
  pdf?: string;
  /** DOI, tulis angkanya saja (tanpa https://doi.org/). */
  doi?: string;
  /** Link publikasi / sumber. */
  url?: string;
  /** Gambar sampul — letakkan di public/journals/. */
  cover?: string;
  tags?: string[];
};

/** Tulisan tanpa tanggal = draf; belum tampil untuk pengunjung. */
export function isPublished(journal: Journal): boolean {
  return Boolean(journal.date && journal.date.trim());
}

function sortKey(journal: Journal): number {
  if (journal.date) {
    const parsed = Date.parse(journal.date);
    if (!Number.isNaN(parsed)) return parsed;
  }
  const year = Number(journal.year);
  return Number.isFinite(year) ? Date.parse(`${year}-01-01`) : 0;
}

/** Tulisan terbaru lebih dulu. */
export function sortedJournals(entries: Journal[]): Journal[] {
  return [...entries].sort((a, b) => sortKey(b) - sortKey(a));
}

const MONTHS_ID = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

/**
 * Format "2026-03-14" -> "14 Maret 2026".
 * Sengaja tidak memakai `toLocaleDateString` supaya hasilnya identik di server
 * dan di browser (menghindari hydration mismatch) tanpa bergantung data ICU.
 */
export function formatDate(date?: string): string | null {
  if (!date) return null;
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day || month < 1 || month > 12) return date;
  return `${day} ${MONTHS_ID[month - 1]} ${year}`;
}

/** Perkiraan waktu baca dalam menit (asumsi 200 kata/menit). */
export function readingMinutes(content?: string): number | null {
  if (!content) return null;
  const words = content.trim().split(/\s+/).filter(Boolean).length;
  if (words === 0) return null;
  return Math.max(1, Math.round(words / 200));
}

/** Hitungan kata isi tulisan. */
export function wordCount(content?: string): number {
  if (!content) return 0;
  return content.trim().split(/\s+/).filter(Boolean).length;
}

/**
 * Ringkasan untuk daftar: pakai `abstract` kalau ada, kalau tidak ambil
 * potongan awal `content` supaya kartu tidak pernah kosong.
 */
export function journalExcerpt(
  journal: Journal,
  maxLength = 220,
): string | null {
  const source = journal.abstract ?? stripMarkdown(journal.content);
  if (!source) return null;
  const clean = source.replace(/\s+/g, " ").trim();
  if (clean.length <= maxLength) return clean;
  return `${clean.slice(0, maxLength).trimEnd()}…`;
}

/** Buang penanda markdown supaya teksnya enak dibaca di ringkasan. */
function stripMarkdown(content?: string): string | null {
  if (!content) return null;
  return content
    .replace(/^#{1,6}\s+/gm, "")
    .replace(/^\s*[-*]\s+/gm, "")
    .replace(/^\s*\d+\.\s+/gm, "")
    .replace(/\*\*([^*]+)\*\*/g, "$1")
    .replace(/`([^`]+)`/g, "$1");
}

export type JournalPage = {
  journals: Journal[];
  page: number;
  totalPages: number;
  total: number;
};

/** Paginasi daftar tulisan — untuk navigasi "Postingan Lama/Baru". */
export function paginate(
  all: Journal[],
  page: number,
  perPage = 5,
): JournalPage {
  const total = all.length;
  const totalPages = Math.max(1, Math.ceil(total / perPage));
  const current = Math.min(Math.max(1, page), totalPages);
  const start = (current - 1) * perPage;
  return {
    journals: all.slice(start, start + perPage),
    page: current,
    totalPages,
    total,
  };
}

/** Filter berdasarkan label. */
export function filterByTag(entries: Journal[], tag: string): Journal[] {
  return sortedJournals(entries).filter((journal) =>
    journal.tags?.includes(tag),
  );
}

/** Label arsip untuk satu tulisan, mis. "Maret 2026" (atau tahun saja). */
export function archiveLabelOf(journal: Journal): string {
  const [yearPart, monthPart] = (journal.date ?? "").split("-");
  const monthName =
    Number(monthPart) >= 1 && Number(monthPart) <= 12
      ? MONTHS_ID[Number(monthPart) - 1]
      : null;
  return monthName && yearPart ? `${monthName} ${yearPart}` : journal.year;
}

/** Filter berdasarkan label arsip ("Maret 2026" atau "2026"). */
export function filterByArchive(entries: Journal[], label: string): Journal[] {
  return sortedJournals(entries).filter(
    (journal) => archiveLabelOf(journal) === label,
  );
}

/** Cari di judul, penulis, venue, abstrak, isi, dan label. */
export function searchJournals(entries: Journal[], query: string): Journal[] {
  const q = query.trim().toLowerCase();
  if (!q) return sortedJournals(entries);
  return sortedJournals(entries).filter((journal) => {
    const haystack = [
      journal.title,
      journal.abstract ?? "",
      journal.content ?? "",
      journal.venue,
      journal.authors.join(" "),
      (journal.tags ?? []).join(" "),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(q);
  });
}

/** URL daftar dengan parameter pencarian/halaman yang sudah disusun. */
export function browseHref(options: {
  q?: string;
  tag?: string;
  archive?: string;
  page?: number;
}): string {
  const params = new URLSearchParams();
  if (options.q) params.set("q", options.q);
  if (options.tag) params.set("tag", options.tag);
  if (options.archive) params.set("arsip", options.archive);
  if (options.page && options.page > 1)
    params.set("page", String(options.page));
  const query = params.toString();
  return query ? `/journals/browse?${query}` : "/journals/browse";
}

function toIso(date?: string): string | null {
  if (!date) return null;
  const [year, month, day] = date.split("-").map(Number);
  if (!year || !month || !day) return null;
  return `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
}

/** Dipakai agar tanggal di kartu bisa dicetak sebagai atribut <time>. */
export function journalDateTime(date?: string): string | undefined {
  return toIso(date) ?? undefined;
}
