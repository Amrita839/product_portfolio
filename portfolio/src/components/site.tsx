import * as React from "react";
import { ArrowUpRight, Mail } from "lucide-react";

import { cn } from "@/lib/utils";
import { profile } from "@/data/content";

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.92c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

const links = [
  { to: "#work", label: "Case studies" },
  { to: "#projects", label: "Projects" },
  { to: "#experience", label: "Experience" },
  { to: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const on = () => setScrolled(window.scrollY > 24);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-colors duration-300",
        scrolled ? "bg-background/80 border-b border-[var(--border)] backdrop-blur-md" : "bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <a href="#top" className="font-display flex items-center gap-2 text-sm tracking-[0.2em] uppercase">
          <span className="bg-accent inline-block size-2 rounded-full shadow-[0_0_12px_2px_rgba(239,68,68,0.6)]" />
          Amrita
        </a>
        <div className="flex items-center gap-1 sm:gap-6">
          {links.map((l) => (
            <a
              key={l.to}
              href={l.to}
              className="text-muted-foreground hover:text-foreground hidden text-sm transition-colors md:inline"
            >
              {l.label}
            </a>
          ))}
          <a
            href={profile.resume}
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-red-500/30 px-4 py-1.5 text-sm text-red-200 transition-colors hover:border-red-400 hover:text-white"
          >
            Resume
          </a>
        </div>
      </nav>
    </header>
  );
}

/** Section header shared by every page so they read as one system. */
export function SectionHead({ eyebrow, title, children }: { eyebrow: string; title: string; children?: React.ReactNode }) {
  return (
    <div className="mb-10 max-w-3xl">
      <div className="mb-4 flex items-center gap-4 text-xs tracking-[0.3em] text-red-400/70 uppercase">
        <span className="h-px w-10 bg-gradient-to-r from-transparent to-red-500/50" />
        {eyebrow}
      </div>
      <h2 className="font-display text-3xl tracking-tight sm:text-5xl">{title}</h2>
      {children ? <p className="text-muted-foreground mt-4 text-base leading-relaxed sm:text-lg">{children}</p> : null}
    </div>
  );
}

export function Footer() {
  return (
    <footer id="contact" className="border-t border-[var(--border)]">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:px-6">
        <SectionHead eyebrow="Contact" title="Let's build something people use.">
          Open to product roles and internships. The fastest way to reach me is email.
        </SectionHead>
        <div className="flex flex-wrap gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group relative inline-flex items-center gap-2 overflow-hidden border border-red-500/30 px-6 py-3 text-sm tracking-wider text-red-200 uppercase transition-all duration-500 hover:border-red-400 hover:text-white"
          >
            <Mail className="size-4" /> Email me
            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 transition-transform duration-1000 group-hover:translate-x-full" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 px-5 py-3 text-sm transition-colors hover:border-red-400 hover:text-red-300">
            <LinkedinIcon className="size-4" /> LinkedIn
          </a>
          <a href={profile.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 rounded-full border-2 border-white/15 px-5 py-3 text-sm transition-colors hover:border-red-400 hover:text-red-300">
            <GithubIcon className="size-4" /> GitHub
          </a>
        </div>
        <div className="text-muted-foreground mt-16 flex flex-wrap items-center justify-between gap-4 text-xs">
          <span>© 2026 Amrita Kumari</span>
          <a href="#top" className="hover:text-foreground inline-flex items-center gap-1">
            Back to top <ArrowUpRight className="size-3" />
          </a>
        </div>
      </div>
    </footer>
  );
}

/** Tiny hash router: "#/case/<slug>" is a case study page, anything else is
    the home page (and a plain "#section" scrolls to that section). Hash
    routing works anywhere the site is hosted - no server rewrites needed. */
export function useHashRoute() {
  const [hash, setHash] = React.useState(() => window.location.hash);
  React.useEffect(() => {
    const on = () => setHash(window.location.hash);
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  const caseSlug = hash.startsWith("#/case/") ? hash.slice(7) : null;
  React.useEffect(() => {
    if (caseSlug) {
      window.scrollTo(0, 0);
      return;
    }
    const id = hash.slice(1);
    if (!id || id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    requestAnimationFrame(() => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" }));
  }, [hash, caseSlug]);
  return { caseSlug };
}
