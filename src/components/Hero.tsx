import { gmailComposeUrl, profile } from "@/data/profile";
import { cn } from "@/lib/utils";
import { Download, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { Reveal } from "./Reveal";

type HeroProps = {
  className?: string;
};

export function Hero({ className }: HeroProps) {
  return (
    <section
      id="home"
      aria-labelledby="hero-heading"
      className={cn(
        "relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24",
        className,
      )}
    >
      {/* Background wash + dotted grid (single, subtle) */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute inset-0 bg-white" />
        <div className="bg-dot-grid absolute inset-0" />
        <div className="absolute -top-40 right-[-10%] h-[28rem] w-[28rem] rounded-full bg-accent/10 blur-3xl" />
      </div>

      <div className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div className="max-w-2xl">
            <Reveal>
              <span className="inline-flex items-center gap-2 rounded-full border border-border bg-white px-3 py-1 text-xs font-medium text-muted shadow-soft">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
                </span>
                {profile.title}
              </span>
            </Reveal>

            <Reveal delay={0.06}>
              <h1
                id="hero-heading"
                className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight text-primary sm:text-5xl lg:text-6xl"
              >
                {profile.headline}
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-4 text-xl font-semibold text-secondary sm:text-2xl">
                {profile.subheadline}
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <p className="mt-5 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
                {profile.summary}
              </p>
            </Reveal>

            <Reveal delay={0.24}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-accent px-5 py-3 text-sm font-semibold text-white shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:bg-blue-700 hover:shadow-lift"
                >
                  View My Projects
                </a>
                <a
                  href={profile.cvUrl}
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-white px-5 py-3 text-sm font-semibold text-primary shadow-soft transition-all duration-200 hover:-translate-y-0.5 hover:border-accent/40 hover:text-accent hover:shadow-lift"
                >
                  <Download className="h-4 w-4" aria-hidden="true" />
                  Download CV
                </a>
              </div>
            </Reveal>

            <Reveal delay={0.3}>
              <ul className="mt-8 flex items-center gap-3">
                <li>
                  <a
                    href={profile.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile (opens in a new tab)"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted shadow-soft transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <GithubIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile (opens in a new tab)"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted shadow-soft transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <LinkedinIcon className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
                <li>
                  <a
                    href={gmailComposeUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Email Tifani (opens Gmail compose in a new tab)"
                    className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border bg-white text-muted shadow-soft transition-colors hover:border-accent/40 hover:text-accent"
                  >
                    <Mail className="h-5 w-5" aria-hidden="true" />
                  </a>
                </li>
              </ul>
            </Reveal>
          </div>

          {/* Decorative profile card — no photo placeholder image, just typography */}
          <Reveal delay={0.2} className="lg:justify-self-end">
            <div className="relative w-full max-w-sm rounded-2xl border border-border bg-white p-6 shadow-lift">
              <div className="flex items-center gap-4">
                <div
                  aria-hidden="true"
                  className="flex h-14 w-14 items-center justify-center rounded-xl bg-primary text-lg font-bold text-white"
                >
                  TY
                </div>
                <div>
                  <p className="text-sm font-semibold text-primary">
                    {profile.name}
                  </p>
                  <p className="text-xs text-muted">
                    S1 Informatika · Universitas Gunadarma
                  </p>
                </div>
              </div>

              <dl className="mt-6 space-y-3 text-sm">
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="text-muted">Focus</dt>
                  <dd className="font-medium text-primary">
                    Data &amp; Web Development
                  </dd>
                </div>
                <div className="flex items-center justify-between border-b border-border pb-3">
                  <dt className="text-muted">Core stack</dt>
                  <dd className="font-medium text-primary">Python · SQL</dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-muted">Status</dt>
                  <dd className="inline-flex items-center gap-1.5 font-medium text-accent">
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                    Open to opportunities
                  </dd>
                </div>
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
