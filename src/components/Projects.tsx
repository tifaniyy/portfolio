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
          description="A collection of data and web projects I’ve worked on. Ranging from visualisation dashboards to technology research. Click on any card to view the details."
        />

        {/* All projects in one grid — 2 per row on desktop */}
        <RevealStagger className="mt-12 grid gap-6 sm:grid-cols-2">
          {allProjects.map((project) => (
            <RevealItem key={project.slug} className="h-full">
              <ProjectCard project={project} onOpen={openProject} />
            </RevealItem>
          ))}
        </RevealStagger>

        <p className="mt-10 text-sm text-muted">
          Other repositories are available at{" "}
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
