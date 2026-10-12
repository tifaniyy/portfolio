"use client";

import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import Link from "next/link";
import { navLinks } from "@/data/profile";

/**
 * Satu sumber untuk tautan navigasi — dipakai Navbar DAN Footer, supaya
 * keduanya tidak pernah berbeda isi maupun alamatnya.
 */

export type NavLink = { label: string; href: string };

/** Entri nav yang memiliki route /journals (tombol kanan atas, bukan anchor). */
export const JOURNALS_LABEL = "Journals";
export const JOURNALS_HREF = "/journals";

/**
 * `navLinks` hanya berisi anchor section (#home, #about, …). Anchor itu bekerja
 * di beranda, tetapi dari halaman lain seperti /journals sebuah "#about" polos
 * diresolusi terhadap URL saat itu dan tidak melakukan apa-apa — jadi di
 * halaman lain bentuknya menjadi "/#about".
 *
 * "Journals" sengaja tidak ada di `navLinks`: route-nya nyata (/journals) dan
 * dirender sebagai tombol kanan atas, jadi menaruhnya di sini akan tampil dua kali.
 */
export function buildNavLinks(pathname: string): NavLink[] {
  const isHome = pathname === "/";

  if (isHome) return navLinks.map(({ label, href }) => ({ label, href }));

  return navLinks.map(({ label, href }) => ({
    label,
    href: href.startsWith("#") ? `/${href}` : href,
  }));
}

/**
 * Entri nav yang dirender sebagai `next/link` ketika menuju route nyata
 * (prefetch, transisi instan) dan sebagai `<a>` biasa ketika hanya anchor
 * "#section" — lompat-ke-anchor milik browser harus tetap bekerja.
 */
export function NavItemLink({
  link,
  active,
  className,
  onClick,
  children,
}: {
  link: NavLink;
  active: boolean;
  className: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  const shared = {
    href: link.href,
    "aria-current": active ? ("true" as const) : undefined,
    className,
    onClick,
  };

  return link.href.startsWith("/") ? (
    <Link {...shared}>{children}</Link>
  ) : (
    <a {...shared}>{children}</a>
  );
}
