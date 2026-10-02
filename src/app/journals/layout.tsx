import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { BookOpen } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  title: "Jurnal & Tulisan",
  description:
    "Blog jurnal Tifani Yunitami — catatan penelitian, analisis data, visualisasi, dan pengembangan web.",
  alternates: { canonical: "/journals" },
};

/**
 * Layout khusus blog untuk semua halaman di bawah /journals.
 *
 * Navbar & Footer global dari root layout tetap dipakai, hanya isi <main>
 * yang memakai kerangka blog sendiri (masthead + lebar baca yang nyaman).
 */
export default function JournalsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-dvh bg-background">
      {/* Masthead blog */}
      <div className="border-b border-border bg-primary">
        <div className="section-shell py-10 sm:py-14">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="max-w-2xl">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
                Jurnal &amp; Tulisan
              </p>
              {/* Nama blog: teks identitas, bukan judul halaman — supaya setiap
                  halaman di bawah /journals hanya punya satu <h1>. */}
              <p
                id="blog-title"
                className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
              >
                Blog Jurnal {profile.shortName}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Catatan penelitian, analisis data, visualisasi, dan pengembangan
                web — ditulis dengan format jurnal.
              </p>
            </div>

            <nav
              aria-label="Navigasi blog"
              className="flex flex-wrap items-center gap-2"
            >
              <Link
                href="/journals"
                className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Daftar tulisan
              </Link>
              <Link
                href="/journals/browse"
                className="rounded-xl border border-white/25 px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                Cari &amp; arsip
              </Link>
              <Link
                href="/"
                className="rounded-xl bg-white px-4 py-2 text-sm font-semibold text-primary transition-transform duration-200 hover:-translate-y-0.5"
              >
                Beranda portfolio
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
