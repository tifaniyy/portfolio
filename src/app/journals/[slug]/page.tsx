import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Calendar, FileText, Link2 } from "lucide-react";
import { JournalMarkdown } from "@/components/JournalMarkdown";
import { formatDate, isPublished, readingMinutes } from "@/data/journals";
import { getAllJournals, getPublishedJournals } from "@/data/journals.server";
import { projectsForJournal } from "@/data/projects";
import { journalFeedAlternate } from "@/lib/site";

type PageParams = { slug: string };

/** Sediakan semua slug jurnal supaya halamannya jadi statis saat build. */
export async function generateStaticParams(): Promise<PageParams[]> {
  const published = await getPublishedJournals();
  return published.map((journal) => ({ slug: journal.slug }));
}

/*
 * Tulisan baru diterbitkan setelah build (lewat /journals/kelola), jadi
 * slug yang belum ada di daftar statis tetap dirender saat diminta —
 * tanpa ini, tulisan baru akan 404 sampai website di-build ulang.
 */
export const dynamicParams = true;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const journal = (await getAllJournals()).find((item) => item.slug === slug);

  /* Draf: judulnya belum boleh muncul di metadata/SEO. */
  if (!journal || !isPublished(journal)) {
    return { title: "Tulisan tidak ditemukan" };
  }

  return {
    title: journal.title,
    description: journal.abstract,
    alternates: { canonical: `/journals/${journal.slug}`, ...journalFeedAlternate },
    openGraph: {
      type: "article",
      title: journal.title,
      description: journal.abstract,
      images: journal.cover ? [journal.cover] : undefined,
    },
  };
}

export default async function JournalDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const journal = (await getAllJournals()).find((item) => item.slug === slug);

  /* Draf (tanpa tanggal) tidak boleh bisa dibuka lewat URL-nya. */
  if (!journal || !isPublished(journal)) notFound();

  const date = formatDate(journal.date);
  const minutes = readingMinutes(journal.content);
  /* Proyek yang membahas tulisan ini — hubungannya ditulis di src/data/projects.ts. */
  const relatedProjects = projectsForJournal(journal.slug);

  return (
    <article className="section-padding bg-background">
      <div className="section-shell max-w-3xl">
        <Link
          href="/journals"
          className="tap inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All Articles
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          {journal.type ? (
            <span className="inline-flex items-center rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
              {journal.type}
            </span>
          ) : null}
          {date ? (
            <span className="inline-flex items-center gap-1.5 text-xs text-muted">
              <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
              {date}
            </span>
          ) : null}
          {minutes ? (
            <span className="text-xs text-muted">· {minutes} min read</span>
          ) : null}
        </div>

        <h1
          lang="id"
          className="mt-4 text-2xl font-bold leading-tight tracking-tight text-primary sm:text-3xl"
        >
          {journal.title}
        </h1>
        <p className="mt-3 text-sm text-muted">{journal.authors.join(", ")}</p>
        <p className="mt-1 text-sm font-medium text-accent">{journal.venue}</p>

        {journal.pdf || journal.doi || journal.url ? (
          <div className="mt-6 flex flex-wrap gap-3 border-y border-border py-5">
            {journal.pdf ? (
              <a
                href={journal.pdf}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
              >
                <FileText className="h-4 w-4" aria-hidden="true" />
                Read PDF
              </a>
            ) : null}
            {journal.doi ? (
              <a
                href={`https://doi.org/${journal.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
                DOI
              </a>
            ) : null}
            {journal.url ? (
              <a
                href={journal.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <Link2 className="h-4 w-4" aria-hidden="true" />
                Source
              </a>
            ) : null}
          </div>
        ) : null}

        {journal.cover ? (
          <div className="mt-8 overflow-hidden rounded-2xl border border-border bg-white">
            <Image
              src={journal.cover}
              alt={`Sampul — ${journal.title}`}
              width={1200}
              height={630}
              className="h-auto w-full object-cover"
            />
          </div>
        ) : null}

        {journal.content ? (
          /* Isi tulisan ditulis dalam bahasa Indonesia; chrome situs berbahasa
             Inggris, jadi bahasanya ditandai di sini supaya pembaca layar tidak
             melafalkan kata Indonesia dengan pelafalan Inggris. */
          <div className="mt-8" lang="id">
            <JournalMarkdown content={journal.content} />
          </div>
        ) : journal.abstract ? (
          <p className="mt-8 text-base leading-relaxed text-muted" lang="id">
            {journal.abstract}
          </p>
        ) : null}

        {relatedProjects.length > 0 ? (
          <section className="mt-10">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
              Related project
            </h2>
            <ul className="mt-3 space-y-3">
              {relatedProjects.map((project) => (
                <li key={project.slug}>
                  <Link
                    href={`/projects/${project.slug}`}
                    className="group block rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/40"
                  >
                    <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                      {project.title}
                      <ArrowUpRight
                        className="h-4 w-4 shrink-0"
                        aria-hidden="true"
                      />
                    </span>
                    <span className="mt-1 block text-xs text-muted">
                      {project.category} · {project.period}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        {journal.tags && journal.tags.length > 0 ? (
          <ul className="mt-10 flex flex-wrap gap-2 border-t border-border pt-6">
            {journal.tags.map((tag) => (
              <li
                key={tag}
                className="tap rounded-lg bg-white px-2.5 py-1 text-xs font-medium text-secondary ring-1 ring-border"
              >
                {tag}
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </article>
  );
}
