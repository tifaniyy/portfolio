import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Code2,
  FileText,
  Play,
} from "lucide-react";
import { GithubIcon } from "@/components/icons";
import { projects, projectBySlug } from "@/data/projects";
import {
  formatDate,
  isPublished,
  type Journal,
} from "@/data/journals";
import { getAllJournals } from "@/data/journals.server";

type PageParams = { slug: string };

/**
 * Halaman detail proyek: /projects/<slug>.
 *
 * Modal di beranda tetap jadi cara cepat membaca ringkasan; halaman ini adalah
 * alamat yang bisa dibagikan dan diindeks mesin pencari (modal tidak bisa).
 * Slug-nya sudah pasti semuanya, jadi `dynamicParams = false` — slug asing
 * langsung 404 dan tidak pernah dirender.
 */
export function generateStaticParams(): PageParams[] {
  return projects.map((project) => ({ slug: project.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<PageParams>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) return { title: "Project not found" };

  const cover = project.screenshots[0];

  return {
    title: project.title,
    description: project.summary,
    alternates: { canonical: `/projects/${project.slug}` },
    openGraph: {
      type: "article",
      title: project.title,
      description: project.summary,
      images: cover ? [{ url: cover.src, alt: cover.alt }] : undefined,
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const project = projectBySlug(slug);

  if (!project) notFound();

  /* Tulisan jurnal yang membahas proyek ini — hanya yang sudah terbit. */
  const allJournalEntries: Journal[] = await getAllJournals();
  const relatedJournals = (project.relatedJournals ?? [])
    .map((journalSlug) =>
      allJournalEntries.find((entry) => entry.slug === journalSlug),
    )
    .filter(
      (entry): entry is Journal => entry !== undefined && isPublished(entry),
    );

  /* Proyek berikutnya dalam urutan data (terbaru lebih dulu). */
  const index = projects.findIndex((item) => item.slug === project.slug);
  const next = projects[(index + 1) % projects.length];

  return (
    <article className="section-padding bg-background">
      <div className="section-shell max-w-3xl">
        <Link
          href="/#projects"
          className="tap inline-flex items-center gap-2 text-sm font-medium text-muted transition-colors hover:text-accent"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          All Projects
        </Link>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-semibold text-muted">
            {project.category}
          </span>
          <span className="text-xs text-muted">{project.period}</span>
        </div>

        {project.organization ? (
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-accent">
            {project.organization}
          </p>
        ) : null}

        <h1 className="mt-2 text-2xl font-bold leading-tight tracking-tight text-primary sm:text-3xl">
          {project.title}
        </h1>

        {project.subtitle ? (
          <p className="mt-2 text-sm text-muted">{project.subtitle}</p>
        ) : null}

        <p className="mt-4 text-base leading-relaxed text-muted">
          {project.summary}
        </p>

        <div className="mt-6 flex flex-wrap gap-3 border-y border-border py-5">
          {project.demo ? (
            <a
              href={project.demo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl bg-accent px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              <Play className="h-4 w-4" aria-hidden="true" />
              Live Demo
            </a>
          ) : null}

          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="tap inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
            >
              <GithubIcon className="h-4 w-4" />
              View Source
            </a>
          ) : (
            <span
              title="Repository not available yet"
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-xl border border-dashed border-border bg-background px-4 py-2 text-sm font-semibold text-muted"
            >
              <GithubIcon className="h-4 w-4" />
              Repository not available yet
            </span>
          )}

          {project.screenshots.length > 0 ? (
            <a
              href="#screenshots"
              className="tap inline-flex items-center gap-2 rounded-xl border border-border bg-white px-4 py-2 text-sm font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
            >
              <FileText className="h-4 w-4" aria-hidden="true" />
              Screenshots
            </a>
          ) : null}
        </div>

        <div className="mt-8 space-y-8">
          <Block title="Overview">
            <p className="text-sm leading-relaxed text-muted sm:text-base">
              {project.description}
            </p>
          </Block>

          <Block title="Details">
            <p className="text-sm leading-relaxed text-muted">
              {project.solution}
            </p>
          </Block>

          {project.deploymentNote ? (
            <p className="rounded-xl border border-dashed border-border bg-white px-4 py-3 text-xs leading-relaxed text-muted">
              <strong className="font-semibold text-secondary">
                Deployment note:
              </strong>{" "}
              {project.deploymentNote}
            </p>
          ) : null}

          <Block title="Technologies">
            <ul className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <li
                  key={tech}
                  className="rounded-lg border border-border bg-white px-2.5 py-1 text-xs font-medium text-secondary"
                >
                  {tech}
                </li>
              ))}
            </ul>
          </Block>

          <Block title="Features">
            <ul className="grid gap-2 sm:grid-cols-2">
              {project.features.map((feature) => (
                <li
                  key={feature}
                  className="flex items-start gap-2 text-sm text-muted"
                >
                  <span
                    aria-hidden="true"
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                  />
                  {feature}
                </li>
              ))}
            </ul>
          </Block>

          {project.screenshots.length > 0 ? (
            <section id="screenshots" className="scroll-mt-24">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
                Screenshots
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                {project.screenshots.map((shot) => (
                  <figure
                    key={shot.src}
                    className="overflow-hidden rounded-xl border border-border bg-white"
                  >
                    <Image
                      src={shot.src}
                      alt={shot.alt}
                      width={640}
                      height={400}
                      unoptimized={shot.src.endsWith(".svg")}
                      className="h-auto w-full object-cover"
                    />
                    <figcaption className="border-t border-border px-3 py-2 text-[11px] text-muted">
                      {shot.caption}
                    </figcaption>
                  </figure>
                ))}
              </div>
            </section>
          ) : null}

          {relatedJournals.length > 0 ? (
            <Block title="Related writing">
              <ul className="space-y-3">
                {relatedJournals.map((entry) => (
                  <li key={entry.slug}>
                    <Link
                      href={`/journals/${entry.slug}`}
                      className="group block rounded-xl border border-border bg-white p-4 transition-colors hover:border-accent/40"
                    >
                      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors group-hover:text-accent">
                        {entry.title}
                        <ArrowUpRight
                          className="h-4 w-4 shrink-0"
                          aria-hidden="true"
                        />
                      </span>
                      <span className="mt-1 block text-xs text-muted">
                        {[entry.type, formatDate(entry.date), entry.venue]
                          .filter(Boolean)
                          .join(" · ")}
                      </span>
                    </Link>
                  </li>
                ))}
              </ul>
            </Block>
          ) : null}
        </div>

        <nav
          aria-label="Other projects"
          className="mt-12 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6"
        >
          <Link
            href="/#projects"
            className="tap text-sm font-semibold text-muted transition-colors hover:text-accent"
          >
            ← All Projects
          </Link>
          <Link
            href={`/projects/${next.slug}`}
            className="tap inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-colors hover:text-accent"
          >
            Next: {next.title.length > 42 ? `${next.title.slice(0, 42)}…` : next.title}
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </Link>
        </nav>

        <p className="mt-8 flex items-center gap-2 text-xs text-muted">
          <Code2 className="h-3.5 w-3.5" aria-hidden="true" />
          Details are written from the project’s own documentation and README.
        </p>
      </div>
    </article>
  );
}

function Block({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <section>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}
