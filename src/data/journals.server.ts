import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { isPublished, type Journal } from "./journals";

/**
 * Akses data tulisan jurnal — HANYA untuk server.
 * ---------------------------------------------------------------
 * Tulisan disimpan di `data/journals.json` (satu file JSON di luar folder
 * `src/`, jadi ikut terbaca saat aplikasi jalan). File itu diubah lewat
 * halaman /journals/kelola, bukan dengan mengedit kode.
 *
 * Saat pertama kali dijalankan dan file belum ada, isinya dibuat otomatis dari
 * satu contoh tulisan (DRAF — tanpa tanggal) supaya halaman /journals/kelola
 * tidak kosong dan bisa langsung diklik "Terbitkan".
 * ---------------------------------------------------------------
 */

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "journals.json");

function seed(): Journal[] {
  return [
    {
      slug: "contoh-tulisan-pertama",
      title: "Contoh Tulisan Pertama",
      authors: ["Tifani Yunitami"],
      venue: "Catatan Pribadi",
      year: String(new Date().getFullYear()),
      type: "Catatan",
      abstract:
        "Ini contoh tulisan yang dibuat otomatis saat pertama kali dijalankan. Ubah atau hapus dari halaman Kelola Tulisan, lalu isi tanggalnya untuk menerbitkan.",
      tags: ["Contoh"],
      content: `Ini contoh isi tulisan. Semuanya bisa diubah dari halaman Kelola Tulisan.

## Cara menulis isi

Pisahkan paragraf dengan satu baris kosong.

1. Daftar bernomor ditulis dengan angka di awal baris.
2. **Tebal** dan \`kode\` juga didukung.

- Daftar berbutir ditulis dengan tanda hubung
- Isi tanggal di halaman Kelola Tulisan untuk menerbitkan tulisan ini`,
    },
  ];
}

function normalise(raw: unknown): Journal[] {
  if (!Array.isArray(raw)) return [];
  return raw
    .filter((item): item is Record<string, unknown> => {
      return Boolean(item) && typeof item === "object";
    })
    .map((item) => ({
      ...(item as unknown as Journal),
      authors: Array.isArray(item.authors)
        ? (item.authors as string[])
        : typeof item.authors === "string"
          ? [item.authors as string]
          : [],
      tags: Array.isArray(item.tags) ? (item.tags as string[]) : [],
    }));
}

/** Semua tulisan (termasuk draf). Hanya boleh dipanggil di server. */
export async function getAllJournals(): Promise<Journal[]> {
  try {
    const text = await readFile(DATA_FILE, "utf8");
    return normalise(JSON.parse(text));
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code;
    if (code === "ENOENT") {
      const seeded = seed();
      await writeJournals(seeded);
      return seeded;
    }
    throw error;
  }
}

/** Tulisan yang sudah terbit saja (punya tanggal) — untuk pengunjung. */
export async function getPublishedJournals(): Promise<Journal[]> {
  return (await getAllJournals()).filter(isPublished);
}

/** Satu tulisan berdasarkan slug. */
export async function getJournalBySlug(
  slug: string,
): Promise<Journal | undefined> {
  return (await getAllJournals()).find((journal) => journal.slug === slug);
}

/**
 * Tulis ulang seluruh file data (atomik: ditulis ke file sementara lalu
 * dipindahkan, supaya file tidak pernah setengah jadi).
 */
export async function writeJournals(entries: Journal[]): Promise<void> {
  await mkdir(DATA_DIR, { recursive: true });
  const temporary = `${DATA_FILE}.tmp`;
  await writeFile(temporary, `${JSON.stringify(entries, null, 2)}\n`, "utf8");
  await rename(temporary, DATA_FILE);
}
