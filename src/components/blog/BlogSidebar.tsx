import Link from "next/link";
import {
  Archive,
  ChevronLeft,
  ChevronRight,
  Search,
  Tag,
  X,
} from "lucide-react";
import { SidebarWidget } from "./SidebarWidget";
import {
  type Journal,
  allTags,
  archiveLabelOf,
  archives,
  formatDate,
} from "@/data/journals";

type BlogSidebarProps = {
  /** Jumlah tulisan per label arsip — dihitung dari daftar hasil filter. */
  items: Journal[];
  query: string;
  activeTag: string;
  activeArchive: string;
  page: number;
  totalPages: number;
};

/**
 * Sidebar blog ala Blogger: pencarian, label, arsip, dan tulisan terbaru.
 * Semuanya berupa <form>/<Link> biasa (tanpa state klien) supaya tetap
 * berfungsi sebelum JavaScript termuat.
 */
export function BlogSidebar({
  items,
  query,
  activeTag,
  activeArchive,
  page,
  totalPages,
}: BlogSidebarProps) {
  const tags = allTags(items);
  const archiveGroups = archives(items);

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
      {/* Pencarian */}
      <SidebarWidget title="Cari tulisan">
        <form action="/journals/browse" method="get" className="flex gap-2">
          {activeTag ? <input type="hidden" name="tag" value={activeTag} /> : null}
          {activeArchive ? (
            <input type="hidden" name="arsip" value={activeArchive} />
          ) : null}
          <label htmlFor="blog-search" className="sr-only">
            Kata kunci
          </label>
          <div className="relative flex-1">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
            <input
              id="blog-search"
              name="q"
              type="search"
              defaultValue={query}
              placeholder="Kata kunci…"
              className="w-full rounded-xl border border-border bg-background py-2 pl-9 pr-3 text-sm text-primary outline-none transition-colors placeholder:text-muted focus:border-accent"
            />
          </div>
          <button
            type="submit"
            className="rounded-xl bg-primary px-3 py-2 text-sm font-semibold text-white transition-colors hover:bg-secondary"
          >
            Cari
          </button>
        </form>
      </SidebarWidget>

      {/* Label */}
      {tags.length > 0 ? (
        <SidebarWidget title="Label">
          <ul className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isActive = activeTag === tag;
              return (
                <li key={tag}>
                  <Link
                    href={
                      isActive ? keepParams({ tag: "" }) : keepParams({ tag })
                    }
                    aria-current={isActive ? "true" : undefined}
                    className={
                      isActive
                        ? "inline-flex items-center gap-1.5 rounded-lg bg-accent px-2.5 py-1 text-xs font-semibold text-white"
                        : "inline-flex items-center gap-1.5 rounded-lg bg-background px-2.5 py-1 text-xs font-medium text-secondary ring-1 ring-border transition-colors hover:text-accent"
                    }
                  >
                    <Tag className="h-3 w-3" aria-hidden="true" />
                    {tag}
                  </Link>
                </li>
              );
            })}
          </ul>
        </SidebarWidget>
      ) : null}

      {/* Arsip */}
      {archiveGroups.length > 0 ? (
        <SidebarWidget title="Arsip">
          <ul className="space-y-1.5">
            {archiveGroups.map((group) => {
              const isActive = activeArchive === group.label;
              return (
                <li key={group.label}>
                  <Link
                    href={
                      isActive
                        ? keepParams({ archive: "" })
                        : keepParams({ archive: group.label })
                    }
                    aria-current={isActive ? "true" : undefined}
                    className={
                      isActive
                        ? "flex items-center justify-between gap-2 rounded-lg bg-accent-soft px-2.5 py-1.5 text-sm font-semibold text-accent"
                        : "flex items-center justify-between gap-2 rounded-lg px-2.5 py-1.5 text-sm text-muted transition-colors hover:bg-background hover:text-accent"
                    }
                  >
                    <span className="inline-flex items-center gap-2">
                      <Archive className="h-3.5 w-3.5" aria-hidden="true" />
                      {group.label}
                    </span>
                    <span className="text-xs font-semibold">
                      {group.items.length}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </SidebarWidget>
      ) : null}

      {/* Tulisan terbaru */}
      {recent.length > 0 ? (
        <SidebarWidget title="Tulisan terbaru">
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
        <SidebarWidget title="Halaman">
          <div className="flex items-center justify-between gap-2">
            {page > 1 ? (
              <Link
                href={keepParams({ page: page - 1 })}
                className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Baru
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted opacity-50">
                <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                Baru
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
                Lama
                <ChevronRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            ) : (
              <span className="inline-flex items-center gap-1.5 rounded-xl border border-border px-3 py-2 text-sm font-semibold text-muted opacity-50">
                Lama
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
          Hapus semua filter
        </Link>
      ) : null}

      {/* Tautan cepat saat halaman daftar masih kosong */}
      {tags.length === 0 && archiveGroups.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-border bg-white px-4 py-3 text-xs leading-relaxed text-muted">
          Belum ada tulisan yang diterbitkan. Tulis dan terbitkan dari halaman{" "}
          <Link
            href="/journals/kelola"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            Kelola Tulisan
          </Link>
          .
        </p>
      ) : null}
    </aside>
  );
}
