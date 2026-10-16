"use client";

import { useMemo, useState } from "react";
import { projects as allProjects, type Project } from "@/data/projects";
import { SectionHeading } from "./SectionHeading";
import { ProjectCard } from "./ProjectCard";
import { ProjectModal } from "./ProjectModal";
import { RevealStagger, RevealItem } from "./Reveal";
import { cn } from "@/lib/utils";

const ALL_LABEL = "All";

export function Projects() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [open, setOpen] = useState(false);
  const [filter, setFilter] = useState<string>(ALL_LABEL);

  /*
   * Kategori diambil dari data, bukan ditulis ulang di sini: menambah proyek
   * dengan `category` baru otomatis memunculkan tombol filternya. Daftarnya
   * diurutkan alfabetis supaya tidak berubah-ubah antar build.
   */
  const categories = useMemo(() => {
    const counts = new Map<string, number>();
    for (const project of allProjects) {
      counts.set(project.category, (counts.get(project.category) ?? 0) + 1);
    }
    return [
      { label: ALL_LABEL, count: allProjects.length },
      ...[...counts.entries()]
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([label, count]) => ({ label, count })),
    ];
  }, []);

  const visible =
    filter === ALL_LABEL
      ? allProjects
      : allProjects.filter((project) => project.category === filter);

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

        {/* Filter kategori — tombolnya dibuat dari kategori yang benar-benar ada. */}
        <div className="mt-10 flex flex-wrap items-center gap-2">
          {categories.map((category) => {
            const active = filter === category.label;
            return (
              <button
                key={category.label}
                type="button"
                onClick={() => setFilter(category.label)}
                aria-pressed={active}
                className={cn(
                  "tap inline-flex items-center gap-2 rounded-lg border px-3.5 py-2 text-sm font-medium transition-colors",
                  active
                    ? "border-accent bg-accent text-white"
                    : "border-border bg-white text-secondary hover:border-accent/40 hover:text-accent",
                )}
              >
                {category.label}
                <span
                  className={cn(
                    "text-xs font-semibold",
                    active ? "text-white/75" : "text-muted",
                  )}
                >
                  {category.count}
                </span>
              </button>
            );
          })}
        </div>

        <p aria-live="polite" className="mt-4 text-xs text-muted">
          Showing {visible.length} of {allProjects.length} projects
          {filter === ALL_LABEL ? "" : ` in ${filter}`}.
        </p>

        {/* Kartu proyek — grid yang sama, isinya mengikuti filter terpilih.
            `key` membuat animasi reveal berjalan lagi setiap filter berubah. */}
        <RevealStagger key={filter} className="mt-8 grid gap-6 sm:grid-cols-2">
          {visible.map((project) => (
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
            className="inline-block py-2 font-semibold text-accent underline-offset-4 hover:underline"
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
