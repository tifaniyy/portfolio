import { CalendarDays, Building2, ExternalLink, MapPin } from "lucide-react";
import { experiences } from "@/data/experience";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";
import { cn } from "@/lib/utils";

export function Experience() {
  return (
    <section
      id="experience"
      aria-labelledby="experience-heading"
      className="section-padding border-t border-border bg-white"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="03 — Experience"
            title="Experience"
            description="Work experience and internships in the fields of information technology, data and web development."
          />
        </Reveal>

        <ol className="relative mt-12 space-y-8 border-l border-border pl-6 sm:pl-8">
          {experiences.map((item, index) => (
            <Reveal as="li" key={item.company} delay={index * 0.08}>
              <article className="relative">
                {/* Timeline dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    "absolute -left-[31px] top-1.5 flex h-3.5 w-3.5 items-center justify-center rounded-full border-2 border-white bg-accent sm:-left-[39px]",
                  )}
                />

                <div className="rounded-2xl border border-border bg-background p-6 shadow-soft transition-shadow duration-300 hover:shadow-lift sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <h3 className="text-lg font-semibold leading-snug text-primary">
                        {item.role}
                      </h3>
                      <p className="mt-1 flex items-center gap-2 text-sm font-medium text-accent">
                        <Building2 className="h-4 w-4" aria-hidden="true" />
                        {item.fullCompany ?? item.company}
                      </p>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                      <CalendarDays
                        className="h-3.5 w-3.5"
                        aria-hidden="true"
                      />
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-3 flex items-center gap-2 text-xs text-muted">
                    <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                    {item.location}
                    <span className="rounded-md bg-accent-soft px-2 py-0.5 font-medium text-accent">
                      {item.type}
                    </span>
                  </p>

                  <p className="mt-4 text-sm leading-relaxed text-muted">
                    {item.description}
                  </p>

                  {item.activities.length > 0 ? (
                    <div className="mt-5 border-t border-border pt-5">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                        Projects &amp; Activities
                      </p>
                      <ul className="mt-3 space-y-4">
                        {item.activities.map((activity) => (
                          <li
                            key={activity.title}
                            className="rounded-xl border border-border bg-white p-4"
                          >
                            <p className="text-sm font-semibold text-primary">
                              {activity.href ? (
                                <a
                                  href={activity.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="group inline-flex items-start gap-1.5 underline-offset-4 hover:text-accent hover:underline"
                                >
                                  <span>{activity.title}</span>
                                  <ExternalLink
                                    className="mt-0.5 h-3.5 w-3.5 shrink-0 text-accent transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                                    aria-hidden="true"
                                  />
                                  <span className="sr-only">
                                    (buka sertifikat, tab baru)
                                  </span>
                                </a>
                              ) : (
                                activity.title
                              )}
                            </p>
                            <p className="mt-1.5 text-xs leading-relaxed text-muted">
                              {activity.description}
                            </p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
