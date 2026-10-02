import Link from "next/link";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import { type Journal, archiveLabelOf, formatDate } from "@/data/journals";

type BlogSidebarProps = {
  /** Seluruh koleksi tulisan yang ditampilkan di halaman ini. */
  items: Journal[];
  query: string;
  activeTag: string;
  activeArchive: string;
  page: number;
  totalPages: number;
};

/**
 * Sidebar kanan halaman jurnal.
 *
 * Isinya sengaja tinggal dua widget: "Latest Articles" dan "Pages".
 * Widget "Cari tulisan", "Label", dan "Arsip" dihapus karena menumpuk
 * navigasi — filter label tetap bisa dipakai dari tombol #tag di tiap kartu
 * tulisan (URL /journals/browse?tag=…).
 *
 * Semuanya berupa <Link> biasa (tanpa state klien) supaya tetap berfungsi
 * sebelum JavaScript termuat.
 */
export function BlogSidebar({
  items,
  query,
  activeTag,
  activeArchive,
  page,
  totalPages,
}: BlogSidebarProps) {
  /* Tulisan terbaru diambil dari seluruh koleksi, bukan dari hasil filter. */
  const recent = [...items]
    .sort((a, b) => (b.date ?? b.year).localeCompare(a.date ?? a.year))
    .slice(0, 5);

  const keepParams = (overrides: {
    q?: string;
    tag?: string;
    archive?: string;
    page?: number;
  }) => {
    const params = new URLSearchParams();
    const q = overrides.q ?? query;
    const tag = overrides.tag ?? activeTag;
    const archive = overrides.archive ?? activeArchive;
    const nextPage = overrides.page ?? 1;
    if (q) params.set("q", q);
    if (tag) params.set("tag", tag);
    if (archive) params.set("arsip", archive);
    if (nextPage > 1) params.set("page", String(nextPage));
    const qs = params.toString();
    return qs ? `/journals/browse?${qs}` : "/journals/browse";
  };

  return (
    <aside className="space-y-5">
      {/* Tulisan terbaru */}
      {recent.length > 0 ? (
        <SidebarWidget title="Latest Articles">
          <ul className="space-y-3">
            {recent.map((journal) => (
              <li key={journal.slug}>
                <Link
                  href={`/journals/${journal.slug}`}
                  className="group block"
                >
                  <span className="block text-sm font-medium leading-snug text-secondary transition-colors group-hover:text-accent">
                    {journal.title}
                  </span>
                  <span className="mt-0.5 block text-xs text-muted">
                    {formatDate(journal.date) ?? journal.year}
                    {" · "}
                    {archiveLabelOf(journal)}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </SidebarWidget>
      ) : null}

      {/* Navigasi halaman — hanya tampil kalau lebih dari satu halaman */}
      {totalPages > 1 ? (
        <SidebarWidget title="Pages">
          <div className="flex items-center justify-between gap-2">
            {page > 1 ? (
              <Link
                href={keepParams({ page: page - 1 })}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                New
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted opacity-50">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                New
              </span>
            )}
            <span className="text-xs font-semibold text-muted">
              {page} / {totalPages}
            </span>
            {page < totalPages ? (
              <Link
                href={keepParams({ page: page + 1 })}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                Old
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted opacity-50">
                Old
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </span>
            )}
          </div>
        </SidebarWidget>
      ) : null}

      {/* Reset filter */}
      {query || activeTag || activeArchive ? (
        <Link
          href="/journals/browse"
          className="flex items-center justify-center gap-2 rounded-2xl border border-dashed border-border bg-white px-4 py-3 text-xs font-semibold text-muted transition-colors hover:border-accent/40 hover:text-accent"
        >
          <X className="h-3.5 w-3.5" aria-hidden="true" />
          Clear all filters
        </Link>
      ) : null}

      {/* Tautan cepat saat halaman daftar masih kosong */}
      {recent.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-3 text-xs leading-relaxed text-muted">
          No published articles yet. Write and publish them from the{" "}
          <Link
            href="/journals/kelola"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Manage Articles
          </Link>
          .
        </p>
      ) : null}
    </aside>
  );
}
