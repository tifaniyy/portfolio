"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";

/**
 * Tombol "kembali ke atas".
 *
 * Hanya muncul setelah pengunjung menggulir cukup jauh (beranda ±10.000 px di
 * desktop, ±15.000 px di ponsel), jadi tidak menutupi konten saat halaman baru
 * dibuka. Menghormati `prefers-reduced-motion`: pengguna yang mematikan animasi
 * langsung dipindahkan tanpa efek gulir halus.
 */
export function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      onClick={() => {
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)",
        ).matches;
        window.scrollTo({
          top: 0,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });
      }}
      aria-label="Back to top"
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-white text-primary shadow-lift transition-all duration-300 hover:border-accent/40 hover:text-accent print:hidden ${
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp className="h-5 w-5" aria-hidden="true" />
    </button>
  );
}
