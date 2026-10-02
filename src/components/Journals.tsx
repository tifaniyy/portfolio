import Link from "next/link";
import { BookOpen } from "lucide-react";
import { sortedJournals, formatDate } from "@/data/journals";
import { getPublishedJournals } from "@/data/journals.server";
import { SectionHeading } from "./SectionHeading";
import { Reveal, RevealItem, RevealStagger } from "./Reveal";

/**
 * Journals section on the home page.
 *
 * Renders nothing while there is no published entry, so the site stays clean
 * until there is a real publication. Tulisan dibuat & diterbitkan lewat halaman
 * /journals/kelola (data tersimpan di `data/journals.json`).
 */
export async function Journals() {
  const published = await getPublishedJournals();
  if (published.length === 0) return null;

  const items = sortedJournals(published).slice(0, 3);

  return (
    <section
      id="journals"
      aria-labelledby="journals-heading"
      className="section-padding border-t border-border bg-white"
    >
      <div className="section-shell">
        <Reveal>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <SectionHeading
              eyebrow="06 — Journals"
              title="Journals & Publications"
              description="Scientific publications, journal articles, and writings on data, visualization, and web development."
            />
            <Link
              href="/journals"
              className="inline-flex items-center gap-1.5 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary shadow-soft transition-colors hover:border-accent/40 hover:text-accent"
            >
              <BookOpen className="h-4 w-4" aria-hidden="true" />
              View all articles
            </Link>
          </div>
        </Reveal>

        <RevealStagger className="mt-12 grid gap-6">
          {items.map((journal) => {
            const date = formatDate(journal.date);

            return (
              <RevealItem key={journal.slug}>
                <article className="rounded-2xl border border-border bg-background p-6 shadow-soft transition-all duration-300 hover:border-accent/30 hover:shadow-lift sm:p-8">
                  <Link
                    href={`/journals/${journal.slug}`}
                    className="group block"
                  >
                    <div className="flex flex-wrap items-center gap-2">
                      {journal.type ? (
                        <span className="inline-flex items-center rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
                          {journal.type}
                        </span>
                      ) : null}
                      <span className="text-xs text-muted">
                        {date ?? journal.year}
                      </span>
                    </div>
                    <h3 className="mt-3 text-base font-semibold leading-snug text-primary transition-colors group-hover:text-accent sm:text-lg">
                      {journal.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">
                      {journal.authors.join(", ")}
                    </p>
                    <p className="mt-1 text-sm font-medium text-accent">
                      {journal.venue}
                    </p>
                    {journal.abstract ? (
                      <p className="mt-4 text-sm leading-relaxed text-muted">
                        {journal.abstract}
                      </p>
                    ) : null}
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent">
                      Read more
                      <span aria-hidden="true">→</span>
                    </span>
                  </Link>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
