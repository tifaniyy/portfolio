import type { Metadata } from "next";
import { EditorPanel } from "./EditorPanel";
import { LoginPanel } from "./LoginPanel";
import { authIsConfigured, isAdmin } from "./auth-actions";
import { getAllJournals } from "@/data/journals.server";

export const metadata: Metadata = {
  title: "Kelola Tulisan",
  description: "Halaman pemilik situs untuk menulis dan menerbitkan tulisan jurnal.",
  /* Halaman pribadi: jangan diindeks mesin pencari. */
  robots: { index: false, follow: false },
};

/**
 * Halaman kelola tulisan — satu-satunya tempat menulis & menerbitkan jurnal.
 * Bukan halaman publik: wajib masuk dengan kata sandi pengelola.
 */
export default async function KelolaPage() {
  const [configured, admin] = await Promise.all([
    authIsConfigured(),
    isAdmin(),
  ]);

  if (!admin) return <LoginPanel configured={configured} />;

  const journals = await getAllJournals();
  return <EditorPanel initial={journals} />;
}
