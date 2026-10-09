import type { Metadata } from "next";
import type { ReactNode } from "react";
import { BookOpen } from "lucide-react";
import { profile } from "@/data/profile";

export const metadata: Metadata = {
  /*
   * Sengaja TANPA `title`: kalau segmen ini menetapkan judul, template judul
   * dari root layout (`%s | Tifani Yunitami`) tidak lagi berlaku untuk semua
   * halaman di bawahnya, sehingga `title` milik tiap page tampil polos
   * ("All Articles"). Cukup lengkapi description-nya saja.
   */
  description:
    "Journal blog Tifani Yunitami — Research notes, data analysis, visualization, and web development.",
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
          <div className="max-w-2xl">
            <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
              <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
              Journal &amp; Article
            </p>
            {/* Nama blog: teks identitas, bukan judul halaman — supaya setiap
                halaman di bawah /journals hanya punya satu <h1>. */}
            <p
              id="blog-title"
              className="mt-3 text-2xl font-bold tracking-tight text-white sm:text-3xl"
            >
              Journal Blog {profile.shortName}
            </p>
            <p className="mt-3 text-sm leading-relaxed text-slate-300">
              Research notes, data analysis, visualization, and web development
            </p>
          </div>
        </div>
      </div>

      <div>{children}</div>
    </div>
  );
}
