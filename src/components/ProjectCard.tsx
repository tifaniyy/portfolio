"use client";

import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/projects";

type ProjectCardProps = {
  project: Project;
  onOpen: (project: Project) => void;
};

export function ProjectCard({ project, onOpen }: ProjectCardProps) {
  const cover = project.screenshots[0];

  return (
    <article
      onClick={() => onOpen(project)}
      className="group flex h-full cursor-pointer flex-col overflow-hidden rounded-2xl border border-border bg-white shadow-soft transition-all duration-300 hover:-translate-y-1.5 hover:border-accent/30 hover:shadow-lift"
    >
      {/* Cover / screenshot placeholder */}
      <div className="relative aspect-16/10 w-full overflow-hidden border-b border-border bg-slate-100">
        {cover ? (
          <Image
            src={cover.src}
            alt={cover.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            unoptimized={cover.src.endsWith(".svg")}
            className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : null}

        <span className="absolute left-3 top-3 rounded-lg border border-border/70 bg-white/90 px-2.5 py-1 text-[11px] font-semibold text-secondary backdrop-blur-sm">
          {project.category}
        </span>
        <span className="absolute right-3 top-3 rounded-lg bg-primary/90 px-2.5 py-1 text-[11px] font-semibold text-white">
          {project.year}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {project.organization ? (
          <p className="text-xs font-semibold uppercase tracking-wider text-accent">
            {project.organization}
          </p>
        ) : null}

        <h3 className="mt-1.5 text-base font-semibold leading-snug text-primary transition-colors group-hover:text-accent sm:text-lg">
          {project.title}
        </h3>

        <p className="mt-2.5 line-clamp-3 text-sm leading-relaxed text-muted">
          {project.summary}
        </p>

        <ul className="mt-4 flex flex-wrap gap-1.5">
          {project.tech.slice(0, 5).map((tech) => (
            <li
              key={tech}
              className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-secondary"
            >
              {tech}
            </li>
          ))}
          {project.tech.length > 5 ? (
            <li className="rounded-md border border-border bg-background px-2 py-1 text-[11px] font-medium text-muted">
              +{project.tech.length - 5}
            </li>
          ) : null}
        </ul>

        <div className="mt-auto pt-5">
          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              onOpen(project);
            }}
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-accent underline-offset-4 transition-colors hover:text-blue-700 hover:underline"
            aria-label={`Lihat detail project ${project.title}`}
          >
            Lihat Detail
            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          </button>

          <div className="mt-4 flex flex-wrap gap-2 border-t border-border pt-4">
            {project.demo ? (
              <a
                href={project.demo}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Live Demo
              </a>
            ) : (
              <span
                title="URL deployment belum tersedia"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-xs font-semibold text-muted"
              >
                <Play className="h-3.5 w-3.5" aria-hidden="true" />
                Live Demo (segera)
              </span>
            )}

            {project.github ? (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(event) => event.stopPropagation()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </a>
            ) : (
              <span
                title="Repository belum tersedia"
                className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-border bg-background px-3 py-2 text-xs font-semibold text-muted"
              >
                <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                GitHub
              </span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}
