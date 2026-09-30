import {
  BarChart3,
  BrainCircuit,
  Code2,
  Terminal,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import { skillCategories } from "@/data/skills";
import { SectionHeading } from "./SectionHeading";
import { RevealStagger, RevealItem } from "./Reveal";

const iconMap: Record<string, LucideIcon> = {
  Terminal,
  BarChart3,
  Code2,
  Wrench,
  BrainCircuit,
};

/** Accent tints keep the cards distinct without adding more colours. */
const accentMap: Record<string, { chip: string; icon: string }> = {
  blue: {
    chip: "bg-white border-border text-secondary hover:border-accent/40 hover:text-accent",
    icon: "bg-accent-soft text-accent",
  },
  violet: {
    chip: "bg-white border-border text-secondary hover:border-violet-300 hover:text-violet-700",
    icon: "bg-violet-50 text-violet-600",
  },
  emerald: {
    chip: "bg-white border-border text-secondary hover:border-emerald-300 hover:text-emerald-700",
    icon: "bg-emerald-50 text-emerald-600",
  },
  amber: {
    chip: "bg-white border-border text-secondary hover:border-amber-300 hover:text-amber-700",
    icon: "bg-amber-50 text-amber-600",
  },
};

export function Skills() {
  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      className="section-padding bg-background"
    >
      <div className="section-shell">
        <SectionHeading
          eyebrow="02 — Skills"
          title="Skills & Tools"
          description="Kemampuan yang saya gunakan sehari-hari untuk mengolah data, membangun visualisasi, dan mengembangkan web."
        />

        <RevealStagger className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {skillCategories.map((category) => {
            const Icon = iconMap[category.icon] ?? Terminal;
            const tint = accentMap[category.accent] ?? accentMap.blue;

            return (
              <RevealItem key={category.title} className="h-full">
                <article className="flex h-full flex-col rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-lift">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${tint.icon}`}
                  >
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>

                  <h3 className="mt-4 text-base font-semibold text-primary">
                    {category.title}
                  </h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-muted">
                    {category.description}
                  </p>

                  <ul className="mt-4 flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <li
                        key={skill}
                        className={`rounded-lg border px-2.5 py-1 text-xs font-medium transition-colors ${tint.chip}`}
                      >
                        {skill}
                      </li>
                    ))}
                  </ul>
                </article>
              </RevealItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
