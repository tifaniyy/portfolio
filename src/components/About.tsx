import {
  Briefcase,
  Code2,
  GraduationCap,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { interests, profile, stats } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

const statIcons: Record<string, LucideIcon> = {
  GraduationCap,
  LineChart,
  Code2,
  Briefcase,
};

export function About() {
  return (
    <section
      id="about"
      aria-labelledby="about-heading"
      className="section-padding border-t border-border bg-white"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="01 — About"
            title="About Me"
            description="Background, minat, dan cara saya bekerja dengan data maupun kode."
          />
        </Reveal>

        <div className="mt-12 grid gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Left column — narrative */}
          <Reveal delay={0.05}>
            <div className="space-y-5">
              <h3 id="about-heading" className="sr-only">
                About Me
              </h3>
              {profile.about.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 32)}
                  className="text-base leading-relaxed text-muted"
                >
                  {paragraph}
                </p>
              ))}

              <div className="rounded-2xl border border-border bg-background p-5">
                <p className="text-sm font-semibold text-primary">
                  Area yang saya kerjakan
                </p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {interests.map((interest) => (
                    <li
                      key={interest}
                      className="rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-medium text-secondary"
                    >
                      {interest}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>

          {/* Right column — stats */}
          <Reveal delay={0.12}>
            <div className="grid gap-4 sm:grid-cols-2">
              {stats.map((stat) => {
                const Icon = statIcons[stat.icon] ?? GraduationCap;
                return (
                  <div
                    key={stat.label}
                    className="group rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
                  >
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <p className="mt-4 text-sm font-semibold leading-snug text-primary">
                      {stat.label}
                    </p>
                    <p className="mt-1.5 text-xs leading-relaxed text-muted">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
