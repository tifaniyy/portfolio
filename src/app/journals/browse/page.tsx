import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  BookOpen,
  ChevronLeft,
  ChevronRight,
  FileText,
  Search,
} from "lucide-react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  archiveLabelOf,
  browseHref,
  filterByArchive,
  filterByTag,
  formatDate,
  journalDateTime,
  journalExcerpt,
  paginate,
  readingMinutes,
  searchJournals,
  sortedJournals,
} from "@/data/journals";
import { getPublishedJournals } from "@/data/journals.server";

export const metadata: Metadata = {
  title: "All Articles",
  description: "All journal articles by Tifani Yunitami, filterable by tag.",
  alternates: { canonical: "/journals/browse" },
};

const PER_PAGE = 5;

type SearchParams = Promise<{
  q?: string;
  tag?: string;
  arsip?: string;
  page?: string;
}>;

/**
 * Halaman daftar dengan filter. Sengaja memakai searchParams (bukan state
 * klien) supaya setiap kombinasi filter punya URL sendiri, bisa di-bookmark,
 * dan tetap jalan tanpa JavaScript.
 */
export default async function JournalsBrowsePage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;
  const query = (params.q ?? "").trim();
  const activeTag = (params.tag ?? "").trim();
  const activeArchive = (params.arsip ?? "").trim();
  const requestedPage = Number.parseInt(params.page ?? "1", 10) || 1;

  const published = await getPublishedJournals();

  /* Filter berurutan: kata kunci -> label -> arsip. */
  let results = searchJournals(published, query);
  if (activeTag) {
    results = filterByTag(published, activeTag).filter((j) =>
      results.includes(j),
    );
  }
  if (activeArchive) {
    results = filterByArchive(published, activeArchive).filter((j) =>
      results.includes(j),
    );
  }

  const {
    journals: items,
    page,
    totalPages,
    total,
  } = paginate(results, requestedPage, PER_PAGE);

  const hasFilter = Boolean(query || activeTag || activeArchive);
  const filterLabel = [
    query ? `kata kunci “${query}”` : null,
    activeTag ? `label “${activeTag}”` : null,
    activeArchive ? `arsip “${activeArchive}”` : null,
  ]
    .filter(Boolean)
    .join(", ");

  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="min-w-0">
          <div className="flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
            <div>
              <h1 className="text-lg font-bold tracking-tight text-primary">
                All Articles
              </h1>
              <p className="mt-1 text-xs text-muted">
                {total} articles
                {hasFilter ? ` for ${filterLabel}` : ""}
              </p>
            </div>
            <Link
              href="/journals"
              className="text-sm font-semibold text-accent hover:underline"
            >
              ← List Latest
            </Link>
          </div>

          {items.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <Search className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">
                No articles found
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                {hasFilter
                  ? `No results for ${filterLabel}. Try different keywords or remove the filters.`
                  : "No articles published yet."}
              </p>
              {hasFilter ? (
                <Link
                  href="/journals/browse"
                  className="mt-5 inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
                >
                  Clear all filters
                </Link>
              ) : null}
            </div>
          ) : (
            <ol className="mt-8 space-y-8">
              {items.map((journal, index) => {
                const date = formatDate(journal.date);
                const minutes = readingMinutes(journal.content);
                const excerpt = journalExcerpt(journal);
                const iso = journalDateTime(journal.date);
                const position = (page - 1) * PER_PAGE + index + 1;

                return (
                  <li key={journal.slug}>
                    <article className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:shadow-lift">
                      <div className="flex flex-col sm:flex-row">
                        <Link
                          href={`/journals/${journal.slug}`}
                          className="relative block aspect-16/10 shrink-0 overflow-hidden border-b border-border bg-slate-100 sm:aspect-auto sm:w-52 sm:border-b-0 sm:border-r"
                        >
                          {journal.cover ? (
                            <Image
                              src={journal.cover}
                              alt={`Sampul — ${journal.title}`}
                              fill
                              sizes="(min-width: 640px) 208px, 100vw"
                              className="object-cover"
                            />
                          ) : (
                            <span className="flex h-full min-h-28 w-full items-center justify-center">
                              <BookOpen
                                className="h-7 w-7 text-slate-300"
                                aria-hidden="true"
                              />
                            </span>
                          )}
                        </Link>

                        <div className="min-w-0 flex-1 p-5">
                          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
                            <span className="font-semibold text-accent">
                              #{position}
                            </span>
                            {journal.type ? (
                              <span className="rounded-lg border border-border bg-background px-2 py-0.5 font-semibold">
                                {journal.type}
                              </span>
                            ) : null}
                            {iso ? (
                              <time dateTime={iso}>{date}</time>
                            ) : (
                              journal.year
                            )}
                            <span>· {archiveLabelOf(journal)}</span>
                            {minutes ? <span>· {minutes} menit</span> : null}
                          </div>

                          <h3 className="mt-2 text-base font-semibold leading-snug text-primary sm:text-lg">
                            <Link
                              href={`/journals/${journal.slug}`}
                              className="transition-colors hover:text-accent"
                            >
                              {journal.title}
                            </Link>
                          </h3>

                          <p className="mt-1 text-sm text-muted">
                            {journal.authors.join(", ")} · {journal.venue}
                          </p>

                          {excerpt ? (
                            <p className="mt-2 text-sm leading-relaxed text-muted">
                              {excerpt}
                            </p>
                          ) : null}

                          <div className="mt-3 flex flex-wrap items-center gap-3">
                            <Link
                              href={`/journals/${journal.slug}`}
                              className="text-sm font-semibold text-accent hover:underline"
                            >
                              Read →
                            </Link>
                            {journal.tags?.map((tag) => (
                              <Link
                                key={tag}
                                href={browseHref({ tag })}
                                className="text-xs font-medium text-secondary transition-colors hover:text-accent"
                              >
                                #{tag}
                              </Link>
                            ))}
                            {journal.pdf ? (
                              <a
                                href={journal.pdf}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition-colors hover:text-accent"
                              >
                                <FileText
                                  className="h-3.5 w-3.5"
                                  aria-hidden="true"
                                />
                                PDF
                              </a>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </article>
                  </li>
                );
              })}
            </ol>
          )}

          {totalPages > 1 ? (
            <nav
              aria-label="Navigasi halaman"
              className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
            >
              {page > 1 ? (
                <Link
                  href={browseHref({
                    q: query,
                    tag: activeTag,
                    archive: activeArchive,
                    page: page - 1,
                  })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Newer posts
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted opacity-50">
                  <ChevronLeft className="h-4 w-4" aria-hidden="true" />
                  Newer posts
                </span>
              )}

              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (p) => (
                    <Link
                      key={p}
                      href={browseHref({
                        q: query,
                        tag: activeTag,
                        archive: activeArchive,
                        page: p,
                      })}
                      aria-current={p === page ? "page" : undefined}
                      className={
                        p === page
                          ? "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
                          : "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
                      }
                    >
                      {p}
                    </Link>
                  ),
                )}
              </div>

              {page < totalPages ? (
                <Link
                  href={browseHref({
                    q: query,
                    tag: activeTag,
                    archive: activeArchive,
                    page: page + 1,
                  })}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
                >
                  Older posts
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ) : (
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted opacity-50">
                  Older posts
                  <ChevronRight className="h-4 w-4" aria-hidden="true" />
                </span>
              )}
            </nav>
          ) : null}
        </div>

        <BlogSidebar
          items={sortedJournals(published)}
          query={query}
          activeTag={activeTag}
          activeArchive={activeArchive}
          page={page}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
