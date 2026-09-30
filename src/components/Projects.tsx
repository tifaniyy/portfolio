"use client";

import { useState } from "react";
import { projects as allProjects, type Project } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { RevealStagger, RevealItem } from "./Reveal";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);

  const featured = allProjects.filter((project) => project.featured);
  const others = allProjects.filter((project) => !project.featured);

  const openProject = (project: Project) => {
    setSelected(project);
    setOpen(true);
  };

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="section-padding bg-background"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="04 — Projects"
          title="Projects"
          description="Kumpulan project data dan web yang saya kerjakan — mulai dari dashboard visualisasi hingga riset teknologi. Klik salah satu kartu untuk melihat detailnya."
        />

        {/* Featured projects — 2 per row on desktop */}
        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {featured.map((project) => (
            <RevealItem key={project.slug} className="h-full">
              <ProjectCard project={project} onOpen={openProject} />
            </RevealItem>
          ))}
        </RevealStagger>

        {/* Remaining projects */}
        {others.length > 0 ? (
          <>
            <h3 className="mt-14 text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Other Projects
            </h3>
            <RevealStagger className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
              {others.map((project) => (
                <RevealItem key={project.slug} className="h-full">
                  <ProjectCard project={project} onOpen={openProject} />
                </RevealItem>
              ))}
            </RevealStagger>
          </>
        ) : null}

        <p className="mt-10 text-sm text-muted">
          Repository lainnya tersedia di{" "}
          <a
            href="https://github.com/tifaniyy"
            target="_blank"
            rel="noopener noreferrer"
            className="font-semibold text-accent underline-offset-4 hover:underline"
          >
            github.com/tifaniyy
          </a>
          .
        </p>
      </div>

      <ProjectModal project={selected} open={open} onOpenChange={setOpen} />
    </section>
  );
}
