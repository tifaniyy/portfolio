"use server";

import { revalidatePath } from "next/cache";
import { isAdmin } from "./auth-actions";
import { getAllJournals, writeJournals } from "@/data/journals.server";
import { isPublished, type Journal } from "@/data/journals";
import { slugify } from "@/lib/slug";

/**
 * Simpan / hapus tulisan jurnal.
 * ---------------------------------------------------------------
 * Semua fungsi di file ini HANYA berjalan di server dan selalu memeriksa sesi
 * pengelola lebih dulu. Datanya disimpan ke `data/journals.json`.
 * ---------------------------------------------------------------
 */

export type JournalInput = {
  /** Slug lama — dipakai saat mengubah tulisan yang sudah ada. */
  originalSlug?: string;
  title: string;
  slug?: string;
  authors: string;
  venue: string;
  year: string;
  date?: string;
  type?: string;
  abstract?: string;
  content?: string;
  tags?: string;
  pdf?: string;
  doi?: string;
  url?: string;
  cover?: string;
};

export type SaveResult = {
  ok: boolean;
  error?: string;
  /** Slug yang tersimpan (untuk membuka pratinjau). */
  slug?: string;
  /** Apakah tulisan tersimpan sebagai draf (belum tampil di website). */
  draft?: boolean;
};

function optional(value?: string): string | undefined {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? undefined : trimmed;
}

function toJournal(input: JournalInput, slug: string): Journal {
  return {
    slug,
    title: input.title.trim(),
    authors: (input.authors ?? "")
      .split(",")
      .map((author) => author.trim())
      .filter(Boolean),
    venue: optional(input.venue) ?? "Catatan Pribadi",
    year: optional(input.year) ?? String(new Date().getFullYear()),
    date: optional(input.date),
    type: optional(input.type),
    abstract: optional(input.abstract),
    content: optional(input.content),
    tags: (input.tags ?? "")
      .split(",")
      .map((tag) => tag.trim())
      .filter(Boolean),
    pdf: optional(input.pdf),
    doi: optional(input.doi),
    url: optional(input.url),
    cover: optional(input.cover),
  };
}

/** Segarkan semua halaman yang menampilkan tulisan. */
function refresh(): void {
  revalidatePath("/", "layout");
}

export async function saveJournal(input: JournalInput): Promise<SaveResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Sesi berakhir. Muat ulang halaman lalu masuk lagi." };
  }

  const title = input.title.trim();
  if (!title) return { ok: false, error: "Judul wajib diisi." };

  const authors = (input.authors ?? "")
    .split(",")
    .map((author) => author.trim())
    .filter(Boolean);
  if (authors.length === 0) return { ok: false, error: "Penulis wajib diisi." };

  const slug = slugify(input.slug?.trim() || title);
  if (!slug) {
    return { ok: false, error: "Slug tidak valid. Pakai huruf/angka." };
  }

  const all = await getAllJournals();
  const oldSlug = input.originalSlug?.trim();

  /* Slug tidak boleh dipakai tulisan lain. */
  const clash = all.find(
    (journal) => journal.slug === slug && journal.slug !== oldSlug,
  );
  if (clash) {
    return { ok: false, error: `Slug "${slug}" sudah dipakai tulisan lain.` };
  }

  const entry = toJournal(input, slug);
  const index = oldSlug
    ? all.findIndex((journal) => journal.slug === oldSlug)
    : -1;

  if (index >= 0) all[index] = entry;
  else all.push(entry);

  try {
    await writeJournals(all);
  } catch {
    return {
      ok: false,
      error:
        "Server ini tidak mengizinkan penyimpanan file, jadi tulisan tidak bisa disimpan dari halaman ini. Pakai cara mengedit data/journals.json lalu commit & push (lihat PANDUAN-JURNAL.md).",
    };
  }
  refresh();

  return { ok: true, slug, draft: !isPublished(entry) };
}

export async function deleteJournal(slug: string): Promise<SaveResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Sesi berakhir. Muat ulang halaman lalu masuk lagi." };
  }

  const all = await getAllJournals();
  const next = all.filter((journal) => journal.slug !== slug);
  if (next.length === all.length) {
    return { ok: false, error: "Tulisan tidak ditemukan." };
  }

  try {
    await writeJournals(next);
  } catch {
    return {
      ok: false,
      error:
        "Server ini tidak mengizinkan penyimpanan file, jadi tulisan tidak bisa dihapus dari halaman ini. Hapus entrinya di data/journals.json lalu commit & push.",
    };
  }
  refresh();

  return { ok: true };
}
