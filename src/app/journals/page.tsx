import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { BookOpen, FileText, Link2 } from "lucide-react";
import { BlogSidebar } from "@/components/blog/BlogSidebar";
import {
  archiveLabelOf,
  browseHref,
  formatDate,
  journalDateTime,
  journalExcerpt,
  paginate,
  readingMinutes,
  sortedJournals,
  wordCount,
} from "@/data/journals";
import { getPublishedJournals } from "@/data/journals.server";

export const metadata: Metadata = {
  title: "Daftar Tulisan",
  description:
    "Semua tulisan blog jurnal Tifani Yunitami — penelitian, analisis data, visualisasi, dan pengembangan web.",
  alternates: { canonical: "/journals" },
};

const PER_PAGE = 5;

export default async function JournalsIndexPage() {
  const published = await getPublishedJournals();
  const all = sortedJournals(published);
  const { journals: items, totalPages, total } = paginate(all, 1, PER_PAGE);

  return (
    <div className="section-shell py-10 sm:py-14">
      <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px]">
        {/* Kolom utama — daftar postingan */}
        <div className="min-w-0">
          <div className="border-b border-border pb-4">
            <h1
              id="journals-list-heading"
              className="text-lg font-bold tracking-tight text-primary"
            >
              Postingan terbaru
            </h1>
            <p className="mt-1 text-xs text-muted">
              {total} tulisan
              {totalPages > 1 ? ` · ${totalPages} halaman` : ""}
            </p>
          </div>

          {items.length === 0 ? (
            <div className="mt-10 rounded-2xl border border-dashed border-border bg-white px-6 py-14 text-center">
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-accent-soft text-accent">
                <BookOpen className="h-6 w-6" aria-hidden="true" />
              </span>
              <h3 className="mt-4 text-base font-semibold text-primary">
                Belum ada tulisan
              </h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
                Tulisan dibuat dan diterbitkan dari halaman{" "}
                <Link
                  href="/journals/kelola"
                  className="font-semibold text-accent underline-offset-4 hover:underline"
                >
                  Kelola Tulisan
                </Link>
                .
              </p>
            </div>
          ) : (
            <div className="mt-8 space-y-8">
              {items.map((journal) => {
                const date = formatDate(journal.date);
                const minutes = readingMinutes(journal.content);
                const words = wordCount(journal.content);
                const excerpt = journalExcerpt(journal);
                const iso = journalDateTime(journal.date);

                return (
                  <article
                    key={journal.slug}
                    className="overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:border-accent/30 hover:shadow-lift"
                  >
                    <div className="flex flex-col sm:flex-row">
                      {/* Thumbnail */}
                      <Link
                        href={`/journals/${journal.slug}`}
                        className="relative block aspect-16/10 shrink-0 overflow-hidden border-b border-border bg-slate-100 sm:aspect-auto sm:w-56 sm:border-b-0 sm:border-r"
                      >
                        {journal.cover ? (
                          <Image
                            src={journal.cover}
                            alt={`Sampul — ${journal.title}`}
                            fill
                            sizes="(min-width: 640px) 224px, 100vw"
                            className="object-cover transition-transform duration-500 hover:scale-[1.03]"
                          />
                        ) : (
                          <span className="flex h-full min-h-32 w-full items-center justify-center">
                            <BookOpen
                              className="h-8 w-8 text-slate-300"
                              aria-hidden="true"
                            />
                          </span>
                        )}
                      </Link>

                      {/* Isi postingan */}
                      <div className="min-w-0 flex-1 p-5 sm:p-6">
                        <div className="flex flex-wrap items-center gap-2">
                          {journal.type ? (
                            <span className="inline-flex items-center rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-semibold text-muted">
                              {journal.type}
                            </span>
                          ) : null}
                          <span className="inline-flex items-center gap-1.5 text-xs text-muted">
                            {iso ? (
                              <time dateTime={iso}>{date}</time>
                            ) : (
                              journal.year
                            )}
                          </span>
                          <span className="text-xs text-muted">
                            · {archiveLabelOf(journal)}
                          </span>
                          {minutes ? (
                            <span className="text-xs text-muted">
                              · {minutes} menit baca
                            </span>
                          ) : null}
                        </div>

                        <h3 className="mt-3 text-lg font-semibold leading-snug text-primary sm:text-xl">
                          <Link
                            href={`/journals/${journal.slug}`}
                            className="transition-colors hover:text-accent"
                          >
                            {journal.title}
                          </Link>
                        </h3>

                        <p className="mt-1.5 text-sm text-muted">
                          {journal.authors.join(", ")}
                        </p>
                        <p className="mt-0.5 text-sm font-medium text-accent">
                          {journal.venue}
                        </p>

                        {excerpt ? (
                          <p className="mt-3 text-sm leading-relaxed text-muted">
                            {excerpt}
                          </p>
                        ) : null}

                        {journal.tags && journal.tags.length > 0 ? (
                          <ul className="mt-3 flex flex-wrap gap-2">
                            {journal.tags.map((tag) => (
                              <li key={tag}>
                                <Link
                                  href={browseHref({ tag })}
                                  className="rounded-lg bg-background px-2.5 py-1 text-xs font-medium text-secondary ring-1 ring-border transition-colors hover:text-accent"
                                >
                                  #{tag}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        ) : null}

                        <div className="mt-4 flex flex-wrap items-center gap-3">
                          <Link
                            href={`/journals/${journal.slug}`}
                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent hover:underline"
                          >
                            Baca selengkapnya →
                          </Link>
                          {words > 0 ? (
                            <span className="text-xs text-muted">
                              {words.toLocaleString("id-ID")} kata
                            </span>
                          ) : null}
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
                          {journal.doi ? (
                            <a
                              href={`https://doi.org/${journal.doi}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1.5 text-xs font-semibold text-secondary transition-colors hover:text-accent"
                            >
                              <Link2
                                className="h-3.5 w-3.5"
                                aria-hidden="true"
                              />
                              DOI
                            </a>
                          ) : null}
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Paginasi bawah */}
          {totalPages > 1 ? (
            <nav
              aria-label="Navigasi halaman"
              className="mt-10 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
            >
              <span className="text-sm font-semibold text-muted opacity-50">
                ← Postingan baru
              </span>
              <div className="flex flex-wrap items-center gap-2">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <Link
                    key={p}
                    href={browseHref({ page: p })}
                    aria-current={p === 1 ? "page" : undefined}
                    className={
                      p === 1
                        ? "inline-flex h-9 w-9 items-center justify-center rounded-xl bg-primary text-sm font-semibold text-white"
                        : "inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-white text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
                    }
                  >
                    {p}
                  </Link>
                ))}
              </div>
              <Link
                href={browseHref({ page: 2 })}
                className="text-sm font-semibold text-primary transition-colors hover:text-accent"
              >
                Postingan lama →
              </Link>
            </nav>
          ) : null}

          {/* Tautan cari & arsip tidak diulang di sini — sudah ada di navbar. */}
        </div>

        {/* Sidebar */}
        <BlogSidebar
          items={all}
          query=""
          activeTag=""
          activeArchive=""
          page={1}
          totalPages={totalPages}
        />
      </div>
    </div>
  );
}
