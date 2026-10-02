"use client";

import { useMemo, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  AlertTriangle,
  Eye,
  FileText,
  Loader2,
  LogOut,
  Plus,
  Save,
  Trash2,
} from "lucide-react";
import { formatDate, isPublished, type Journal } from "@/data/journals";
import { slugify } from "@/lib/slug";
import { deleteJournal, saveJournal, type JournalInput } from "./journal-actions";
import { logout } from "./auth-actions";

type Draft = JournalInput & { originalSlug?: string };

const EMPTY: Draft = {
  title: "",
  slug: "",
  authors: "Tifani Yunitami",
  venue: "Catatan Pribadi",
  year: String(new Date().getFullYear()),
  date: "",
  type: "Catatan",
  abstract: "",
  content: "",
  tags: "",
  pdf: "",
  doi: "",
  url: "",
  cover: "",
};

function toDraft(journal: Journal): Draft {
  return {
    originalSlug: journal.slug,
    title: journal.title,
    slug: journal.slug,
    authors: journal.authors.join(", "),
    venue: journal.venue,
    year: journal.year,
    date: journal.date ?? "",
    type: journal.type ?? "",
    abstract: journal.abstract ?? "",
    content: journal.content ?? "",
    tags: (journal.tags ?? []).join(", "),
    pdf: journal.pdf ?? "",
    doi: journal.doi ?? "",
    url: journal.url ?? "",
    cover: journal.cover ?? "",
  };
}

const inputClass =
  "mt-1.5 w-full rounded-xl border border-border bg-background px-3 py-2 text-sm text-primary outline-none transition-colors focus:border-accent";

const labelClass = "block text-xs font-semibold text-secondary";

export function EditorPanel({ initial }: { initial: Journal[] }) {
  const router = useRouter();
  const [draft, setDraft] = useState<Draft>(EMPTY);
  const [status, setStatus] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const sorted = useMemo(
    () =>
      [...initial].sort((a, b) =>
        (b.date ?? "").localeCompare(a.date ?? "") ||
        a.title.localeCompare(b.title),
      ),
    [initial],
  );

  const finalSlug = draft.slug?.trim() ? slugify(draft.slug) : slugify(draft.title);
  const willBeDraft = !draft.date?.trim();

  function update<K extends keyof Draft>(key: K, value: Draft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  function reset() {
    setDraft(EMPTY);
    setStatus(null);
    setError(null);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setBusy(true);
    setError(null);
    setStatus(null);

    const result = await saveJournal(draft);
    setBusy(false);

    if (!result.ok) {
      setError(result.error ?? "Gagal menyimpan.");
      return;
    }

    setStatus(
      result.draft
        ? `Tersimpan sebagai draf (${result.slug}). Isi tanggal publikasi untuk menampilkannya di website.`
        : `Tersimpan dan terbit di /journals/${result.slug}`,
    );
    setDraft((current) => ({ ...current, originalSlug: result.slug, slug: result.slug }));
    router.refresh();
  }

  async function handleDelete(slug: string, title: string) {
    if (!window.confirm(`Hapus tulisan "${title}"? Tindakan ini tidak bisa dibatalkan.`)) {
      return;
    }
    setBusy(true);
    const result = await deleteJournal(slug);
    setBusy(false);
    if (!result.ok) {
      setError(result.error ?? "Gagal menghapus.");
      return;
    }
    if (draft.originalSlug === slug) reset();
    setStatus("Tulisan dihapus.");
    router.refresh();
  }

  async function handleLogout() {
    await logout();
    router.refresh();
  }

  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight text-primary">
            Kelola Tulisan
          </h2>
          <p className="mt-1 text-xs text-muted">
            {initial.length} tulisan tersimpan · tulisan tanpa tanggal = draf
          </p>
        </div>
        <button
          type="button"
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
        >
          <LogOut className="h-3.5 w-3.5" aria-hidden="true" />
          Keluar
        </button>
      </div>

      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Form tulisan */}
        <form onSubmit={handleSubmit} className="min-w-0 space-y-5">
          <div className="rounded-2xl border border-border bg-white p-5 shadow-soft sm:p-6">
            <div className="flex items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-primary">
                {draft.originalSlug ? "Ubah tulisan" : "Tulisan baru"}
              </h3>
              {draft.originalSlug ? (
                <button
                  type="button"
                  onClick={reset}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
                >
                  <Plus className="h-3.5 w-3.5" aria-hidden="true" />
                  Buat tulisan baru
                </button>
              ) : null}
            </div>

            <div className="mt-5 space-y-4">
              <div>
                <label htmlFor="title" className={labelClass}>
                  Judul
                </label>
                <input
                  id="title"
                  value={draft.title}
                  onChange={(event) => update("title", event.target.value)}
                  className={inputClass}
                  placeholder="Judul tulisan"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="slug" className={labelClass}>
                    Slug (alamat URL)
                  </label>
                  <input
                    id="slug"
                    value={draft.slug}
                    onChange={(event) => update("slug", event.target.value)}
                    className={inputClass}
                    placeholder="otomatis dari judul"
                  />
                  <p className="mt-1 text-[11px] text-muted">
                    /journals/{finalSlug || "…"}
                  </p>
                </div>
                <div>
                  <label htmlFor="authors" className={labelClass}>
                    Penulis (pisahkan dengan koma)
                  </label>
                  <input
                    id="authors"
                    value={draft.authors}
                    onChange={(event) => update("authors", event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="date" className={labelClass}>
                    Tanggal publikasi
                  </label>
                  <input
                    id="date"
                    type="date"
                    value={draft.date ?? ""}
                    onChange={(event) => update("date", event.target.value)}
                    className={inputClass}
                  />
                  <p className="mt-1 text-[11px] text-muted">
                    Kosong = draf (belum tampil)
                  </p>
                </div>
                <div>
                  <label htmlFor="venue" className={labelClass}>
                    Venue / asal tulisan
                  </label>
                  <input
                    id="venue"
                    value={draft.venue}
                    onChange={(event) => update("venue", event.target.value)}
                    className={inputClass}
                    placeholder="Catatan Pribadi / nama jurnal"
                  />
                </div>
                <div>
                  <label htmlFor="year" className={labelClass}>
                    Tahun
                  </label>
                  <input
                    id="year"
                    value={draft.year}
                    onChange={(event) => update("year", event.target.value)}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="type" className={labelClass}>
                    Jenis
                  </label>
                  <input
                    id="type"
                    value={draft.type ?? ""}
                    onChange={(event) => update("type", event.target.value)}
                    className={inputClass}
                    placeholder="Catatan / Journal"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="tags" className={labelClass}>
                    Label (pisahkan dengan koma)
                  </label>
                  <input
                    id="tags"
                    value={draft.tags ?? ""}
                    onChange={(event) => update("tags", event.target.value)}
                    className={inputClass}
                    placeholder="Data Analysis, Python"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="abstract" className={labelClass}>
                  Ringkasan singkat (tampil di daftar tulisan)
                </label>
                <textarea
                  id="abstract"
                  rows={3}
                  value={draft.abstract ?? ""}
                  onChange={(event) => update("abstract", event.target.value)}
                  className={inputClass}
                  placeholder="1–3 kalimat tentang isi tulisan"
                />
              </div>

              <div>
                <label htmlFor="content" className={labelClass}>
                  Isi tulisan
                </label>
                <textarea
                  id="content"
                  rows={16}
                  value={draft.content ?? ""}
                  onChange={(event) => update("content", event.target.value)}
                  className={`${inputClass} font-mono text-[13px] leading-relaxed`}
                  placeholder={
                    "Paragraf pertama.\n\n## Sub-judul\n\n- poin daftar\n\n**tebal** dan `kode`"
                  }
                />
                <p className="mt-1.5 text-[11px] leading-relaxed text-muted">
                  Pisahkan paragraf dengan baris kosong. “## ” untuk sub-judul,
                  “- ” untuk daftar berbutir, “1. ” untuk daftar bernomor, **tebal**
                  dan `kode` juga didukung.
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-3">
                <div>
                  <label htmlFor="pdf" className={labelClass}>
                    Link PDF (opsional)
                  </label>
                  <input
                    id="pdf"
                    value={draft.pdf ?? ""}
                    onChange={(event) => update("pdf", event.target.value)}
                    className={inputClass}
                    placeholder="/journals/namafile.pdf"
                  />
                </div>
                <div>
                  <label htmlFor="doi" className={labelClass}>
                    DOI (opsional)
                  </label>
                  <input
                    id="doi"
                    value={draft.doi ?? ""}
                    onChange={(event) => update("doi", event.target.value)}
                    className={inputClass}
                    placeholder="10.1234/abcd"
                  />
                </div>
                <div>
                  <label htmlFor="url" className={labelClass}>
                    Link sumber (opsional)
                  </label>
                  <input
                    id="url"
                    value={draft.url ?? ""}
                    onChange={(event) => update("url", event.target.value)}
                    className={inputClass}
                    placeholder="https://…"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cover" className={labelClass}>
                  Gambar sampul (opsional)
                </label>
                <input
                  id="cover"
                  value={draft.cover ?? ""}
                  onChange={(event) => update("cover", event.target.value)}
                  className={inputClass}
                  placeholder="/journals/sampul.png"
                />
              </div>
            </div>

            {error ? (
              <p className="mt-5 flex items-start gap-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-xs text-red-700">
                <AlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                {error}
              </p>
            ) : null}

            {status ? (
              <p className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs text-emerald-800">
                {status}
              </p>
            ) : null}

            <div className="mt-6 flex flex-wrap items-center gap-3 border-t border-border pt-5">
              <button
                type="submit"
                disabled={busy || !draft.title.trim()}
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
              >
                {busy ? (
                  <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />
                ) : (
                  <Save className="h-4 w-4" aria-hidden="true" />
                )}
                {willBeDraft ? "Simpan sebagai draf" : "Simpan & terbitkan"}
              </button>

              {finalSlug ? (
                <Link
                  href={`/journals/${finalSlug}`}
                  target="_blank"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
                >
                  <Eye className="h-4 w-4" aria-hidden="true" />
                  Pratinjau
                </Link>
              ) : null}
            </div>
          </div>

          {/* Catatan penyimpanan */}
          <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-3 text-xs leading-relaxed text-muted">
            Tulisan disimpan di berkas{" "}
            <code className="rounded bg-slate-100 px-1.5 py-0.5 font-mono text-[0.85em] text-secondary">
              data/journals.json
            </code>{" "}
            — bukan di dalam kode, jadi tidak perlu mengedit program. Halaman ini
            butuh website berjalan sebagai aplikasi Next.js (komputer sendiri atau
            hosting yang mendukung penyimpanan file).
          </p>
        </form>

        {/* Daftar tulisan */}
        <aside className="space-y-3">
          <div className="rounded-2xl border border-border bg-white p-4 shadow-soft">
            <h3 className="text-sm font-bold text-primary">Daftar tulisan</h3>
            {sorted.length === 0 ? (
              <p className="mt-3 text-xs leading-relaxed text-muted">
                Belum ada tulisan. Isi formulir di samping untuk membuat yang
                pertama.
              </p>
            ) : (
              <ul className="mt-3 space-y-2">
                {sorted.map((journal) => {
                  const published = isPublished(journal);
                  const active = draft.originalSlug === journal.slug;
                  return (
                    <li
                      key={journal.slug}
                      className={
                        active
                          ? "rounded-xl border border-accent/40 bg-accent-soft p-3"
                          : "rounded-xl border border-border bg-background p-3"
                      }
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <p className="truncate text-xs font-semibold text-primary">
                            {journal.title}
                          </p>
                          <p className="mt-0.5 text-[11px] text-muted">
                            {published
                              ? formatDate(journal.date) ?? journal.date
                              : "Draf — belum tampil"}
                          </p>
                        </div>
                        <span
                          className={
                            published
                              ? "shrink-0 rounded-md bg-emerald-50 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-700"
                              : "shrink-0 rounded-md bg-amber-50 px-1.5 py-0.5 text-[10px] font-semibold text-amber-700"
                          }
                        >
                          {published ? "Terbit" : "Draf"}
                        </span>
                      </div>
                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <button
                          type="button"
                          onClick={() => {
                            setDraft(toDraft(journal));
                            setStatus(null);
                            setError(null);
                          }}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-accent hover:underline"
                        >
                          <FileText className="h-3 w-3" aria-hidden="true" />
                          Ubah
                        </button>
                        <Link
                          href={`/journals/${journal.slug}`}
                          target="_blank"
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-secondary hover:text-accent"
                        >
                          <Eye className="h-3 w-3" aria-hidden="true" />
                          Lihat
                        </Link>
                        <button
                          type="button"
                          onClick={() => handleDelete(journal.slug, journal.title)}
                          className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-600 hover:underline"
                        >
                          <Trash2 className="h-3 w-3" aria-hidden="true" />
                          Hapus
                        </button>
                      </div>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </aside>
      </div>
    </div>
  );
}
