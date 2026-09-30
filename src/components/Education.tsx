import { GraduationCap, CheckCircle2 } from "lucide-react";
import { education } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Education() {
  return (
    <section
      id="education"
      aria-labelledby="education-heading"
      className="section-padding border-t border-border bg-white"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="05 — Education"
            title="Education"
            description="Latar belakang pendidikan formal dan fokus studi."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {education.map((item) => (
            <Reveal key={item.school} className="lg:col-span-2">
              <article className="h-full rounded-2xl border border-border bg-background p-6 shadow-soft sm:p-8">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="flex items-start gap-4">
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-accent text-white">
                      <GraduationCap className="h-5.5 w-5.5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold leading-snug text-primary">
                        {item.degree}
                      </h3>
                      <p className="mt-1 text-sm font-medium text-accent">
                        {item.school}
                      </p>
                    </div>
                  </div>

                  <span className="inline-flex items-center rounded-lg border border-border bg-white px-3 py-1.5 text-xs font-semibold text-muted">
                    {item.status}
                  </span>
                </div>

                <p className="mt-5 text-sm leading-relaxed text-muted">
                  {item.description}
                </p>

                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {item.highlights.map((highlight) => (
                    <li
                      key={highlight}
                      className="flex items-center gap-2 text-sm text-secondary"
                    >
                      <CheckCircle2
                        className="h-4 w-4 shrink-0 text-accent"
                        aria-hidden="true"
                      />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}

          <Reveal delay={0.08}>
            <aside className="h-full rounded-2xl border border-border bg-primary p-6 text-white shadow-soft sm:p-8">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-blue-300">
                Fokus Studi
              </p>
              <h3 className="mt-3 text-lg font-semibold leading-snug">
                Dari data mentah menjadi keputusan
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Selama kuliah saya mengerjakan tugas dan project yang menekankan
                pengolahan data, perancangan basis data, visualisasi, dan
                pengembangan aplikasi web — keterampilan yang saya lanjutkan di
                project pribadi maupun di tempat kerja.
              </p>
              <ul className="mt-5 space-y-2 text-sm text-slate-200">
                <li>• Basis data &amp; SQL</li>
                <li>• Analisis dan visualisasi data</li>
                <li>• Machine learning dasar</li>
                <li>• Pengembangan web</li>
              </ul>
            </aside>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
