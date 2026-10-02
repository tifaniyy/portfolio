"use client";

import { useEffect, useState } from "react";
import type { MouseEvent as ReactMouseEvent, ReactNode } from "react";
import { AnimatePresence, motion } from "motion/react";
import { BookOpen, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { navLinks, profile } from "@/data/profile";
import { cn } from "@/lib/utils";

type NavLink = { label: string; href: string };

/** The nav entry that owns the standalone /journals blog route. */
const JOURNALS_LABEL = "Journals";

/**
 * A nav entry that renders as next/link when it targets a real route
 * (prefetched, instant transition) and as a plain <a> when it is a bare
 * "#section" anchor — the browser's own jump-to-anchor must keep working,
 * and a detached link inside the collapsing mobile menu does not complete
 * fragment navigation.
 */
function NavItemLink({
  link,
  active,
  className,
  onClick,
  children,
}: {
  link: NavLink;
  active: boolean;
  className: string;
  onClick?: (event: ReactMouseEvent<HTMLAnchorElement>) => void;
  children: ReactNode;
}) {
  const shared = {
    href: link.href,
    "aria-current": active ? ("true" as const) : undefined,
    className,
    onClick,
  };

  return link.href.startsWith("/") ? (
    <Link {...shared}>{children}</Link>
  ) : (
    <a {...shared}>{children}</a>
  );
}

/**
 * `navLinks` holds in-page section anchors only (#home, #about, …, #contact).
 * Those work as-is on the home page, but from a sub-page such as /journals a
 * bare "#about" resolves against the current URL and does nothing — so on a
 * sub-page they become "/#about".
 *
 * "Journals" is intentionally absent from `navLinks`: it is a real route
 * (/journals) rendered as the top-right action button, so listing it here too
 * would show it twice.
 */
function buildNavLinks(pathname: string): NavLink[] {
  const isHome = pathname === "/";

  if (isHome) return navLinks.map(({ label, href }) => ({ label, href }));

  return navLinks.map(({ label, href }) => ({
    label,
    href: href.startsWith("#") ? `/${href}` : href,
  }));
}

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const links = buildNavLinks(pathname);
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState(isHome ? "#home" : "");

  /* Journals owns the /journals route, so it is lit there and nowhere else. */
  const journalsActive =
    pathname === "/journals" || pathname.startsWith("/journals/");

  /*
   * "Cari & arsip" (/journals/browse) adalah entri route di `navLinks`, jadi
   * sorotannya diambil dari `pathname`, bukan dari scroll-spy.
   */
  const browseActive = pathname.startsWith("/journals/browse");

  /*
   * Every entry in `navLinks` is an in-page anchor, so the highlighted one is
   * simply the section currently in view. Dua entri route (Journals button dan
   * "Cari & arsip") tidak ikut scroll-spy: keduanya punya sorotan sendiri dari
   * `pathname`.
   */
  const isLinkActive = (link: NavLink) =>
    link.href.startsWith("/") ? browseActive : active === link.href;

  /* Blur / background kicks in after a short scroll. */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  /* Highlight the section currently in view (home page only — the sections
     that the observer watches only exist there). */
  useEffect(() => {
    if (!isHome) return;

    const ids = navLinks.map((link) => link.href.slice(1));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(`#${visible.target.id}`);
      },
      { rootMargin: "-45% 0px -50% 0px", threshold: [0, 0.25, 0.5, 1] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [isHome]);

  /* Close the mobile menu with Escape. */
  useEffect(() => {
    if (!mobileOpen) return;
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileOpen]);

  /*
   * Mobile menu navigation.
   *
   * Lessons learned the hard way — do not "improve" this back:
   *  1. Do NOT scroll-lock the body while this dropdown is open. The menu is a
   *     panel under the fixed navbar, not a full-screen overlay, and
   *     `overflow: hidden` swallows the first anchor navigation entirely.
   *  2. Do NOT call `history.replaceState(..., href)` in the handler. Setting
   *     the hash up front turns the browser's own jump-to-anchor into a no-op,
   *     so the page never scrolls.
   *  3. Do NOT rely on the native `#hash` jump here either: closing the menu
   *     unmounts this very <a> element, and a detached link does not complete
   *     its fragment navigation. So we preventDefault and scroll explicitly —
   *     one tick later, once the menu has been removed and the layout settled.
   *     `scroll-padding-top` in globals.css keeps the heading clear of the
   *     navbar.
   */
  const handleMobileNavigate = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
  ) => {
    /* Real routes (e.g. /journals) must keep their normal navigation. */
    if (!href.startsWith("#")) {
      setMobileOpen(false);
      return;
    }

    event.preventDefault();
    setMobileOpen(false);

    const target = document.querySelector<HTMLElement>(href);
    if (!target) return;

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    window.setTimeout(() => {
      target.scrollIntoView({
        behavior: prefersReducedMotion ? "auto" : "smooth",
        block: "start",
      });
      window.history.replaceState(null, "", href);
    }, 0);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-300",
        scrolled
          ? "border-b border-border bg-background/80 backdrop-blur-md supports-[backdrop-filter]:bg-background/70"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav
        aria-label="Main navigation"
        className="section-shell flex h-16 items-center justify-between gap-4 md:h-18"
      >
        {/* Brand */}
        <NavItemLink
          link={{ label: profile.name, href: isHome ? "#home" : "/" }}
          active={false}
          className="flex items-center gap-2.5 text-sm font-bold tracking-tight text-primary"
        >
          <span
            aria-hidden="true"
            className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-xs font-bold text-white"
          >
            TY
          </span>
          <span className="hidden sm:inline">{profile.name}</span>
        </NavItemLink>

        {/* Desktop links */}
        <ul className="hidden items-center gap-1 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <NavItemLink
                link={link}
                active={isLinkActive(link)}
                className={cn(
                  "relative rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                  isLinkActive(link)
                    ? "text-accent"
                    : "text-muted hover:text-primary",
                )}
              >
                {link.label}
                {isLinkActive(link) ? (
                  <motion.span
                    layoutId="nav-active"
                    aria-hidden="true"
                    className="absolute inset-x-2 -bottom-0.5 h-0.5 rounded-full bg-accent"
                    transition={{ duration: 0.25, ease: "easeOut" }}
                  />
                ) : null}
              </NavItemLink>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          {/*
            The top-right action is the Journals route, not the CV download.
            It is driven by the same `JOURNALS_LABEL` entry that owns the
            route in `buildNavLinks`, so the two can never drift apart.
            (The CV download still lives in the hero — `profile.cvUrl`.)
          */}
          <NavItemLink
            link={{ label: JOURNALS_LABEL, href: "/journals" }}
            active={journalsActive}
            className={cn(
              "hidden items-center gap-1.5 rounded-lg border border-border bg-white/80 px-3 py-2 text-xs font-semibold shadow-soft transition-colors hover:border-accent/40 hover:text-accent sm:inline-flex",
              journalsActive ? "text-accent" : "text-primary",
            )}
          >
            <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
            {JOURNALS_LABEL}
          </NavItemLink>

          <button
            type="button"
            onClick={() => setMobileOpen((open) => !open)}
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-white/80 text-primary shadow-soft transition-colors hover:text-accent md:hidden"
          >
            {mobileOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence initial={false}>
        {mobileOpen ? (
          <motion.div
            id="mobile-menu"
            key="mobile-menu"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-b border-border bg-background/95 backdrop-blur-md md:hidden"
          >
            <ul className="section-shell flex flex-col gap-1 py-4">
              {links.map((link) => (
                <li key={link.href}>
                  <NavItemLink
                    link={link}
                    active={isLinkActive(link)}
                    onClick={(event) => handleMobileNavigate(event, link.href)}
                    className={cn(
                      "block rounded-lg px-3 py-3 text-base font-medium transition-colors",
                      isLinkActive(link)
                        ? "bg-accent-soft text-accent"
                        : "text-secondary hover:bg-slate-100",
                    )}
                  >
                    {link.label}
                  </NavItemLink>
                </li>
              ))}
              <li className="pt-2">
                <NavItemLink
                  link={{ label: JOURNALS_LABEL, href: "/journals" }}
                  active={journalsActive}
                  onClick={() => setMobileOpen(false)}
                  className="flex items-center justify-center gap-2 rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
                >
                  <BookOpen className="h-4 w-4" aria-hidden="true" />
                  {JOURNALS_LABEL}
                </NavItemLink>
              </li>
            </ul>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
