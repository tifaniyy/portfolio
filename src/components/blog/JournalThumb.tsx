import Image from "next/image";

/**
 * Sampul satu tulisan jurnal — dipakai di /journals dan /journals/browse.
 *
 * Dua keadaan:
 * 1. `cover` diisi (mis. "/journals/sampul-magang.png") -> gambarnya ditampilkan.
 *    Taruh berkasnya di `public/journals/`, ukuran ideal 1120x700 px (rasio 16:10).
 * 2. `cover` kosong -> dibuat "sampul bawaan": gradasi warna situs + inisial judul,
 *    supaya kartunya tetap terlihat sengaja dirancang, bukan ikon abu-abu.
 *    Warnanya dipilih otomatis dari slug, jadi tiap tulisan dapat nuansa berbeda
 *    dan tidak berubah-ubah setiap kali halaman dibuka.
 */

/** Tiga nuansa dari palet situs (navy -> biru), tanpa warna baru di luar tema. */
const TONES = [
  "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 62%, var(--color-accent) 100%)",
  "linear-gradient(150deg, var(--color-secondary) 0%, var(--color-primary) 70%, var(--color-accent) 100%)",
  "linear-gradient(120deg, var(--color-primary) 0%, var(--color-accent) 100%)",
];

/** Pilih nuansa secara tetap (deterministik) dari slug tulisan. */
function toneFor(key: string): number {
  let total = 0;
  for (let i = 0; i < key.length; i += 1) {
    total = (total + key.charCodeAt(i) * (i + 1)) % 9973;
  }
  return total % TONES.length;
}

export function JournalThumb({
  cover,
  title,
  slug,
  sizes,
  variant = "card",
}: {
  /** Path gambar sampul di `public/`, mis. "/journals/sampul.png". */
  cover?: string;
  title: string;
  /** Dipakai sebagai penentu nuansa sampul bawaan. */
  slug: string;
  /** Atribut `sizes` untuk next/image. */
  sizes: string;
  /** "card" = kartu daftar (w-56), "grid" = kartu arsip (w-52). */
  variant?: "card" | "grid";
}) {
  if (cover) {
    return (
      <Image
        src={cover}
        alt={`Sampul — ${title}`}
        fill
        sizes={sizes}
        className="object-cover transition-transform duration-500 hover:scale-[1.03]"
      />
    );
  }

  const initial = title.trim().charAt(0).toUpperCase() || "J";

  return (
    <span
      aria-hidden="true"
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      style={{ backgroundImage: TONES[toneFor(slug)] }}
    >
      {/* Lingkaran cahaya tipis sebagai aksen, bukan pola yang ramai. */}
      <span className="absolute -right-6 -top-8 h-24 w-24 rounded-full bg-white/10" />
      <span className="absolute -bottom-10 -left-4 h-28 w-28 rounded-full bg-white/5" />
      <span
        className={
          variant === "card"
            ? "relative text-5xl font-bold leading-none text-white/90"
            : "relative text-4xl font-bold leading-none text-white/90"
        }
      >
        {initial}
      </span>
      <span className="absolute inset-x-6 bottom-4 h-px bg-white/30" />
    </span>
  );
}
