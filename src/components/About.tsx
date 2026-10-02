import {
  Briefcase,
  Code2,
  GraduationCap,
  LineChart,
  type LucideIcon,
} from "lucide-react";
import { interests, organizations, profile, stats } from "@/data/profile";
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
            description="My background, interests, and approach to working with data and code."
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

        {/* Organizational experience — from the CV */}
        <div className="mt-16">
          <Reveal>
            <h3 className="text-sm font-semibold uppercase tracking-[0.18em] text-muted">
              Organizational Experience
            </h3>
          </Reveal>

          <div className="mt-6 grid gap-5 md:grid-cols-2">
            {organizations.map((item, index) => (
              <Reveal key={item.organization} delay={index * 0.06}>
                <article className="flex h-full flex-col rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h4 className="text-sm font-semibold leading-snug text-primary">
                        {item.organization}
                      </h4>
                      <p className="mt-1 text-xs font-medium text-accent">
                        {item.role}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center rounded-lg border border-border bg-white px-2.5 py-1 text-[11px] font-semibold text-muted">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-muted">{item.location}</p>

                  <ul className="mt-4 space-y-2">
                    {item.points.map((point) => (
                      <li
                        key={point}
                        className="flex items-start gap-2 text-xs leading-relaxed text-muted"
                      >
                        <span
                          aria-hidden="true"
                          className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
                        />
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
