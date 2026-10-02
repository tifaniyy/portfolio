import { readFile } from "node:fs/promises";
import path from "node:path";

/**
 * Daftar bandara/verifikasi — hanya untuk server.
 * ---------------------------------------------------------------
 * Tujuan file ini HANYA memverifikasi kata sandi pengelola tulisan, yang
 * disimpan sebagai hash SHA-256 di `data/admin-auth.json` (file itu tidak ikut
 * di-commit). Tidak ada akun pengguna lain, tidak ada data pribadi.
 * ---------------------------------------------------------------
 */

const AUTH_FILE = path.join(process.cwd(), "data", "admin-auth.json");

type AuthFile = { passwordHash: string };

export type AuthConfig = {
  /** Benar kalau kata sandi pengelola sudah pernah diatur. */
  configured: boolean;
};

export async function getAuthConfig(): Promise<AuthConfig> {
  const config = await readAuthFile();
  return { configured: Boolean(config?.passwordHash) };
}

export async function verifyPassword(password: string): Promise<boolean> {
  const config = await readAuthFile();
  if (!config?.passwordHash) return false;
  const digest = await sha256(password);
  return timingSafeEqual(digest, config.passwordHash);
}

/** Menyimpan kata sandi baru (hash-nya saja) — dipakai hanya saat pertama kali. */
export async function savePassword(password: string): Promise<void> {
  const { writeFile, mkdir } = await import("node:fs/promises");
  await mkdir(path.dirname(AUTH_FILE), { recursive: true });
  const data: AuthFile = { passwordHash: await sha256(password) };
  await writeFile(AUTH_FILE, `${JSON.stringify(data, null, 2)}\n`, "utf8");
}

async function readAuthFile(): Promise<AuthFile | null> {
  try {
    const text = await readFile(AUTH_FILE, "utf8");
    const parsed = JSON.parse(text) as Partial<AuthFile>;
    if (typeof parsed.passwordHash !== "string") return null;
    return { passwordHash: parsed.passwordHash };
  } catch {
    return null;
  }
}

async function sha256(value: string): Promise<string> {
  const { createHash } = await import("node:crypto");
  return createHash("sha256").update(value, "utf8").digest("hex");
}

/** Bandingkan dua hash hex dengan waktu yang konstan. */
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i += 1) {
    diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return diff === 0;
}
