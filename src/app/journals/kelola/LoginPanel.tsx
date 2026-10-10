"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Loader2, LockKeyhole } from "lucide-react";
import { login, setupPassword } from "./auth-actions";

/**
 * Panel masuk untuk halaman Kelola Tulisan.
 * Kalau kata sandi belum pernah diatur, panel ini meminta membuatnya dulu
 * (hanya bisa dilakukan sekali; berikutnya harus masuk dengan kata sandi itu).
 */
export function LoginPanel({ configured }: { configured: boolean }) {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (!configured && password !== confirm) {
      setError("Ulangi kata sandi belum sama.");
      return;
    }

    setBusy(true);
    const result = configured
      ? await login(password)
      : await setupPassword(password);
    setBusy(false);

    if (result.error) {
      setError(result.error);
      return;
    }

    setPassword("");
    setConfirm("");
    router.refresh();
  }

  return (
    <div className="section-shell py-14 sm:py-20">
      <div className="mx-auto max-w-md rounded-2xl border border-border bg-white p-6 shadow-soft sm:p-8">
        <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-accent-soft text-accent">
          <LockKeyhole className="h-5 w-5" aria-hidden="true" />
        </span>

        <h1 className="mt-4 text-lg font-bold tracking-tight text-primary">
          {configured ? "Masuk pengelola tulisan" : "Buat kata sandi pengelola"}
        </h1>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          {configured
            ? "Halaman ini hanya untuk pemilik situs. Masukkan kata sandi pengelola."
            : "Kata sandi ini melindungi halaman kelola tulisan. Hanya hash-nya yang disimpan, dan tidak ikut ke GitHub. Simpan di tempat aman — tidak ada fitur lupa kata sandi."}
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-xs font-semibold text-secondary"
            >
              Kata sandi
            </label>
            <input
              id="password"
              type="password"
              autoComplete={configured ? "current-password" : "new-password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent"
              placeholder={configured ? "Kata sandi" : "Minimal 6 karakter"}
            />
          </div>

          {!configured ? (
            <div>
              <label
                htmlFor="password-confirm"
                className="block text-xs font-semibold text-secondary"
              >
                Ulangi kata sandi
              </label>
              <input
                id="password-confirm"
                type="password"
                autoComplete="new-password"
                value={confirm}
                onChange={(event) => setConfirm(event.target.value)}
                className="mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent"
                placeholder="Ulangi kata sandi"
              />
            </div>
          ) : null}

          {error ? (
            <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
              {error}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={busy || password.length === 0}
            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
          >
            {busy ? (
              <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
            ) : null}
            {configured ? "Masuk" : "Simpan & masuk"}
          </button>
        </form>

        <p className="mt-4 text-xs leading-relaxed text-muted">
          Halaman ini hanya tersedia saat website dijalankan sebagai aplikasi
          Next.js (komputer sendiri atau hosting yang mendukung menyimpan file).
        </p>
      </div>
    </div>
  );
}
