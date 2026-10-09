import Link from "next/link";
import { House, NotebookText } from "lucide-react";

/**
 * Halaman 404 kustom. Tanpa ini Next memakai halaman bawaannya
 * ("404: This page could not be found.") yang tampil polos di tengah halaman —
 * terlihat seperti situs yang rusak, bukan situs yang selesai.
 */
export default function NotFound() {
  return (
    <section className="section-shell flex min-h-[70vh] flex-col items-center justify-center py-20 text-center">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
        404
      </p>
      <h1 className="mt-3 text-3xl font-bold tracking-tight text-primary sm:text-4xl">
        Halaman tidak ditemukan
      </h1>
      <p className="mt-4 max-w-md text-base leading-relaxed text-muted">
        Alamat yang kamu buka tidak ada atau sudah dipindahkan. Coba kembali ke
        beranda, atau lihat daftar tulisan jurnal.
      </p>
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700"
        >
          <House className="h-4 w-4" aria-hidden="true" />
          Kembali ke beranda
        </Link>
        <Link
          href="/journals"
          className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent"
        >
          <NotebookText className="h-4 w-4" aria-hidden="true" />
          Baca tulisan jurnal
        </Link>
      </div>
    </section>
  );
}
