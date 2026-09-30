"use client";

import Image from "next/image";
import * as Dialog from "@radix-ui/react-dialog";
import { AnimatePresence, motion } from "motion/react";
import { Play, X } from "lucide-react";
import { GithubIcon } from "./icons";
import type { Project } from "@/data/projects";

type ProjectModalProps = {
  project: Project | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function ProjectModal({
  project,
  open,
  onOpenChange,
}: ProjectModalProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <AnimatePresence>
        {open && project ? (
          <Dialog.Portal forceMount>
            <Dialog.Overlay asChild forceMount>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="fixed inset-0 z-60 bg-primary/50 backdrop-blur-sm"
              />
            </Dialog.Overlay>

            <Dialog.Content asChild forceMount>
              <motion.div
                initial={{ opacity: 0, y: 24, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.98 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="fixed inset-x-3 top-[4vh] z-70 mx-auto max-h-[92vh] w-auto max-w-3xl overflow-y-auto rounded-2xl border border-border bg-white p-5 shadow-lift sm:inset-x-6 sm:p-7"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    {project.organization ? (
                      <p className="text-xs font-semibold uppercase tracking-wider text-accent">
                        {project.organization}
                      </p>
                    ) : null}
                    <Dialog.Title className="mt-1 text-xl font-bold leading-snug tracking-tight text-primary sm:text-2xl">
                      {project.title}
                    </Dialog.Title>
                    <Dialog.Description className="mt-2 text-sm leading-relaxed text-muted">
                      {project.summary}
                    </Dialog.Description>
                  </div>

                  <Dialog.Close
                    aria-label="Tutup detail project"
                    className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-border bg-white text-muted transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <X className="h-4.5 w-4.5" aria-hidden="true" />
                  </Dialog.Close>
                </div>

                <div className="mt-5 flex flex-wrap gap-2">
                  {project.demo ? (
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg bg-accent px-3.5 py-2 text-xs font-semibold text-white transition-colors hover:bg-blue-700"
                    >
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      Live Demo
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-border bg-background px-3.5 py-2 text-xs font-semibold text-muted">
                      <Play className="h-3.5 w-3.5" aria-hidden="true" />
                      Live Demo (URL menyusul)
                    </span>
                  )}

                  {project.github ? (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3.5 py-2 text-xs font-semibold text-primary transition-colors hover:border-accent/40 hover:text-accent"
                    >
                      <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      GitHub Repository
                    </a>
                  ) : (
                    <span className="inline-flex cursor-not-allowed items-center gap-1.5 rounded-lg border border-dashed border-border bg-background px-3.5 py-2 text-xs font-semibold text-muted">
                      <GithubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                      Repository belum tersedia
                    </span>
                  )}
                </div>

                <div className="mt-7 space-y-6">
                  <Block title="Deskripsi">
                    <p className="text-sm leading-relaxed text-muted">
                      {project.description}
                    </p>
                  </Block>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <Block title="Problem">
                      <p className="text-sm leading-relaxed text-muted">
                        {project.problem}
                      </p>
                    </Block>
                    <Block title="Solution">
                      <p className="text-sm leading-relaxed text-muted">
                        {project.solution}
                      </p>
                    </Block>
                  </div>

                  <Block title="Technologies">
                    <ul className="flex flex-wrap gap-2">
                      {project.tech.map((tech) => (
                        <li
                          key={tech}
                          className="rounded-lg border border-border bg-background px-2.5 py-1 text-xs font-medium text-secondary"
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

                  <Block title="Screenshots">
                    <div className="grid gap-3 sm:grid-cols-2">
                      {project.screenshots.map((shot) => (
                        <figure
                          key={shot.src}
                          className="overflow-hidden rounded-xl border border-border bg-background"
                        >
                          <Image
                            src={shot.src}
                            alt={shot.alt}
                            width={640}
                            height={400}
                            unoptimized={shot.src.endsWith(".svg")}
                            className="h-auto w-full object-cover"
                          />
                          <figcaption className="border-t border-border bg-white px-3 py-2 text-[11px] text-muted">
                            {shot.caption}
                          </figcaption>
                        </figure>
                      ))}
                    </div>
                    <p className="mt-3 text-xs text-muted">
                      Gambar di atas adalah placeholder. Ganti dengan screenshot
                      asli di <code className="text-secondary">public/projects/</code>.
                    </p>
                  </Block>
                </div>
              </motion.div>
            </Dialog.Content>
          </Dialog.Portal>
        ) : null}
      </AnimatePresence>
    </Dialog.Root>
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
      <h3 className="text-xs font-semibold uppercase tracking-wider text-primary">
        {title}
      </h3>
      <div className="mt-3">{children}</div>
    </section>
  );
}
