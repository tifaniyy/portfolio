"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin, Phone } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { profile } from "@/data/profile";
import { SectionHeading } from "./SectionHeading";
import { Reveal } from "./Reveal";

export function Contact() {
  const [copied, setCopied] = useState(false);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* Clipboard unavailable (e.g. insecure context) — the mailto link still works. */
      setCopied(false);
    }
  };

  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      icon: Mail,
      external: false,
    },
    {
      label: "WhatsApp",
      value: profile.phoneDisplay,
      href: `https://wa.me/${profile.phoneHref.replace(/^\+/, "")}`,
      icon: Phone,
      external: true,
    },
    {
      label: "LinkedIn",
      value: profile.linkedin.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.linkedin,
      icon: LinkedinIcon,
      external: true,
    },
    {
      label: "GitHub",
      value: profile.github.replace(/^https?:\/\/(www\.)?/, ""),
      href: profile.github,
      icon: GithubIcon,
      external: true,
    },
  ];

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      className="section-padding bg-background"
    >
      <div className="section-shell">
        <Reveal>
          <SectionHeading
            eyebrow="06 — Contact"
            title="Let's Connect"
            description="Terbuka untuk peluang internship, posisi junior di bidang data/teknologi, maupun kolaborasi project."
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* CTA panel */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-primary p-6 text-white shadow-soft sm:p-8">
              <h3 id="contact-heading" className="text-xl font-semibold">
                Punya posisi atau project yang cocok?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Kirimkan pesan singkat berisi posisi, kebutuhan, dan linimasa.
                Saya akan membalas secepatnya.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={`mailto:${profile.email}?subject=Opportunity%20for%20Tifani%20Yunitami`}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Kirim Email
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/25 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
                >
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <Copy className="h-4 w-4" aria-hidden="true" />
                  )}
                  {copied ? "Tersalin!" : "Copy Email"}
                </button>
              </div>

              <p className="mt-6 flex items-center gap-2 text-xs text-slate-400">
                <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                {profile.location} · Open to remote / hybrid
              </p>
            </div>
          </Reveal>

          {/* Channels */}
          <Reveal delay={0.08}>
            <div className="grid h-full gap-4">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <a
                    key={channel.label}
                    href={channel.href}
                    {...(channel.external
                      ? { target: "_blank", rel: "noopener noreferrer" }
                      : {})}
                    className="group flex items-center justify-between gap-4 rounded-2xl border border-border bg-white p-5 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-lift"
                  >
                    <span className="flex items-center gap-4">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-white">
                        <Icon className="h-5 w-5" aria-hidden="true" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-primary">
                          {channel.label}
                        </span>
                        <span className="block break-all text-xs text-muted">
                          {channel.value}
                        </span>
                      </span>
                    </span>
                    <span
                      aria-hidden="true"
                      className="text-xs font-semibold text-muted opacity-0 transition-opacity group-hover:opacity-100"
                    >
                      Buka →
                    </span>
                  </a>
                );
              })}

              <p className="rounded-xl border border-dashed border-border bg-white/70 px-4 py-3 text-xs leading-relaxed text-muted">
                Data kontak di atas diambil dari CV. Untuk mengubahnya, edit{" "}
                <code className="text-secondary">src/data/profile.ts</code> →{" "}
                <code className="text-secondary">profile.email</code>,{" "}
                <code className="text-secondary">profile.phoneDisplay</code>,{" "}
                <code className="text-secondary">profile.linkedin</code>.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
