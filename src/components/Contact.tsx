"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./icons";
import { gmailComposeUrl, profile } from "@/data/profile";
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
      /* Clipboard unavailable (e.g. insecure context) — the email link still works. */
      setCopied(false);
    }
  };

  /*
   * Every "email" affordance on the page opens Gmail's web composer with
   * `profile.email` already in the To: field (see `gmailComposeUrl`), so a
   * click always lands in a compose window instead of depending on a mail
   * client the visitor may not have configured.
   */
  const composeUrl = gmailComposeUrl(profile.emailSubject);

  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: composeUrl,
      icon: Mail,
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
            eyebrow="07 — Contact"
            title="Get in Touch"
            description="Open to opportunities, collaborations, and conversations. Feel free to reach out!"
          />
        </Reveal>

        <div className="mt-12 grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
          {/* CTA panel */}
          <Reveal>
            <div className="flex h-full flex-col rounded-2xl border border-border bg-primary p-6 text-white shadow-soft sm:p-8">
              <h3 id="contact-heading" className="text-xl font-semibold">
                Have a position or project in mind?
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-300">
                Let&apos;s connect and discuss how I can help.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href={composeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-primary transition-transform duration-200 hover:-translate-y-0.5"
                >
                  <Mail className="h-4 w-4" aria-hidden="true" />
                  Send Email
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
                      Open →
                    </span>
                  </a>
                );
              })}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
