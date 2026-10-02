"use server";

import { cookies } from "next/headers";
import {
  getAuthConfig,
  savePassword as savePasswordHash,
  verifyPassword,
} from "@/data/auth.server";

/**
 * Sesi pengelola tulisan.
 * ---------------------------------------------------------------
 * Hanya untuk halaman /journals/kelola — situs ini tidak punya akun pengguna
 * lain. Kata sandinya diatur sendiri saat pertama kali membuka halaman itu,
 * dan yang tersimpan hanya hash-nya (data/admin-auth.json, tidak di-commit).
 * ---------------------------------------------------------------
 */

const COOKIE_NAME = "journal_admin";
const COOKIE_VALUE = "ok";
const MAX_AGE = 60 * 60 * 24 * 7; // 7 hari

/** Apakah kata sandi pengelola sudah diatur? Dipakai halaman kelola. */
export async function authIsConfigured(): Promise<boolean> {
  const config = await getAuthConfig();
  return config.configured;
}

/** Apakah sesi di browser ini sudah login sebagai pengelola? */
export async function isAdmin(): Promise<boolean> {
  const store = await cookies();
  return store.get(COOKIE_NAME)?.value === COOKIE_VALUE;
}

/**
 * Simpan kata sandi — hanya boleh kalau belum pernah diatur. Kalau sudah ada,
 * pengguna harus login dulu (mencegah orang lain mengganti kata sandinya).
 */
export async function setupPassword(
  password: string,
): Promise<{ error?: string }> {
  const config = await getAuthConfig();
  if (config.configured) {
    return { error: "Kata sandi sudah diatur. Masuk dulu untuk mengubahnya." };
  }
  if (password.trim().length < 6) {
    return { error: "Kata sandi minimal 6 karakter." };
  }

  await savePasswordHash(password);
  await startSession();
  return {};
}

/** Masuk dengan kata sandi pengelola. */
export async function login(password: string): Promise<{ error?: string }> {
  const config = await getAuthConfig();
  if (!config.configured) {
    return { error: "Kata sandi belum diatur. Atur dulu di halaman ini." };
  }
  if (!(await verifyPassword(password))) {
    return { error: "Kata sandi salah." };
  }

  await startSession();
  return {};
}

/** Keluar dari sesi pengelola. */
export async function logout(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}

async function startSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE_NAME, COOKIE_VALUE, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: MAX_AGE,
  });
}
