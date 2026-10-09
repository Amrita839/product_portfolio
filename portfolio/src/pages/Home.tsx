import { ArrowDown, ArrowUpRight, Award } from "lucide-react";

import { ParticleHero } from "@/components/ui/animated-hero";
import { WorksWheel, type WorksWheelItem } from "@/components/ui/works-wheel";
import { GithubIcon, SectionHead } from "@/components/site";
import { achievements, caseStudies, experience, profile, projects, skills } from "@/data/content";

const WORKS: WorksWheelItem[] = caseStudies.map((c) => ({
  title: c.title,
  image: c.image,
  href: `#/case/${c.slug}`,
  caption: c.kind,
}));

export default function Home() {
  return (
    <main>
      {/* Landing - kept deliberately simple: name, role, one line, two actions. */}
      <ParticleHero particleCount={12}>
        <div className="mx-auto max-w-4xl text-center">
          <div className="mb-8 text-xs tracking-[0.4em] text-red-400/60 uppercase">Portfolio · 2026</div>
          <h1 className="font-display mb-6 text-6xl leading-[0.85] font-bold tracking-tighter sm:text-8xl lg:text-[9rem]">
            <span className="bg-gradient-to-b from-red-200 via-red-500 to-red-800 bg-clip-text text-transparent drop-shadow-2xl">
              Amrita Kumari
            </span>
          </h1>
          <h2 className="text-xl font-thin tracking-[0.25em] text-red-200/90 uppercase sm:text-3xl">{profile.role}</h2>
          <div className="mx-auto my-8 h-px w-24 bg-gradient-to-r from-transparent via-red-400 to-transparent" />
          <p className="mx-auto mb-12 max-w-2xl text-base leading-relaxed font-light text-red-100/60 sm:text-xl">
            {profile.tagline}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row sm:gap-6">
            <a
              href="#work"
              className="group relative overflow-hidden border border-red-500/30 px-10 py-5 text-sm font-medium tracking-wider text-red-200 uppercase transition-all duration-500 hover:border-red-400 hover:text-white sm:text-base"
            >
              <span className="relative z-10">View case studies</span>
              <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 transition-transform duration-1000 group-hover:translate-x-full" />
            </a>
            <a
              href="#contact"
              className="rounded-full border-2 border-white/20 px-8 py-3.5 font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-red-400 hover:text-red-400"
            >
              Get in touch
            </a>
          </div>
          <div className="mt-14 flex items-center justify-center gap-6 text-xs tracking-[0.3em] text-red-400/40 uppercase">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500/30" />
            <span className="inline-flex animate-pulse items-center gap-2">
              Move to interact <ArrowDown className="size-3" />
            </span>
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500/30" />
          </div>
        </div>
      </ParticleHero>

      {/* Case studies - the looping works wheel */}
      <section id="work" className="scroll-mt-16 border-t border-[var(--border)] pt-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <SectionHead eyebrow="Case studies" title="Teardowns & product thinking">
            Three deep dives - discovery, search, trust and a new fintech feature. Scroll or drag the wheel; it loops. Click a card to read it.
          </SectionHead>
        </div>
        <div className="h-[80vh] min-h-[520px] w-full">
          <WorksWheel items={WORKS} label="Case Studies '26" action="Read case study" />
        </div>
      </section>

      {/* Projects - animated cards straight to GitHub */}
      <section id="projects" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
        <SectionHead eyebrow="Projects" title="Things I've built">
          AI and interaction prototypes. Each card opens the code on GitHub.
        </SectionHead>
        <div className="grid gap-6 md:grid-cols-2">
          {projects.map((p, i) => (
            <a
              key={p.title}
              href={p.href}
              target="_blank"
              rel="noreferrer"
              className="group relative block overflow-hidden rounded-2xl p-px transition-transform duration-500 hover:-translate-y-1.5"
            >
              {/* animated ember border */}
              <span
                className="absolute inset-[-150%] animate-[spin_6s_linear_infinite] bg-[conic-gradient(from_0deg,transparent_0%,rgba(239,68,68,0.9)_10%,transparent_22%,transparent_50%,rgba(251,146,60,0.7)_60%,transparent_72%)] opacity-40 transition-opacity duration-500 group-hover:opacity-100"
                style={{ animationDelay: `${i * -2}s` }}
              />
              <span className="bg-muted relative flex h-full flex-col rounded-[calc(1rem-1px)] p-7 sm:p-8">
                <span className="mb-10 flex items-start justify-between">
                  <span className="text-xs tracking-[0.3em] text-red-400/70 uppercase">0{i + 1} · {p.year}</span>
                  <span className="flex size-10 items-center justify-center rounded-full border border-white/10 transition-all duration-500 group-hover:rotate-45 group-hover:border-red-400 group-hover:bg-red-500/10">
                    <ArrowUpRight className="size-4" />
                  </span>
                </span>
                <span className="font-display mb-3 text-2xl tracking-tight sm:text-3xl">{p.title}</span>
                <span className="mb-4 inline-flex w-fit rounded-full bg-red-500/10 px-3 py-1 text-xs text-red-300">{p.highlight}</span>
                <span className="text-muted-foreground mb-8 leading-relaxed">{p.description}</span>
                <span className="mt-auto flex flex-wrap items-center gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/70">
                      {s}
                    </span>
                  ))}
                  <span className="text-muted-foreground group-hover:text-foreground ml-auto inline-flex items-center gap-1.5 text-sm transition-colors">
                    <GithubIcon className="size-4" /> View repo
                  </span>
                </span>
              </span>
            </a>
          ))}
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="mx-auto max-w-6xl scroll-mt-16 px-4 py-24 sm:px-6">
        <SectionHead eyebrow="Experience" title="Where I've worked">
          {profile.summary}
        </SectionHead>
        <ol className="relative border-l border-[var(--border)]">
          {experience.map((e) => (
            <li key={e.company} className="relative mb-12 pl-8 last:mb-0">
              <span className="bg-accent absolute top-2 -left-[5px] size-2.5 rounded-full shadow-[0_0_12px_2px_rgba(239,68,68,0.5)]" />
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h3 className="font-display text-xl tracking-tight sm:text-2xl">
                  {e.role} <span className="text-muted-foreground">· {e.company}</span>
                </h3>
                <span className="text-xs tracking-[0.2em] text-red-400/70 uppercase">{e.period}</span>
              </div>
              <ul className="text-muted-foreground mt-3 space-y-2 leading-relaxed">
                {e.points.map((pt) => (
                  <li key={pt}>{pt}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>

        <div className="mt-20 grid gap-10 md:grid-cols-2">
          <div>
            <h3 className="mb-5 text-xs tracking-[0.3em] text-red-400/70 uppercase">Skills</h3>
            <div className="space-y-4">
              {Object.entries(skills).map(([group, list]) => (
                <div key={group}>
                  <div className="mb-2 text-sm text-white/80">{group}</div>
                  <div className="flex flex-wrap gap-2">
                    {list.map((s) => (
                      <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/70">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h3 className="mb-5 text-xs tracking-[0.3em] text-red-400/70 uppercase">Achievements & education</h3>
            <ul className="space-y-3">
              {achievements.map((a) => (
                <li key={a} className="flex gap-3 text-white/80">
                  <Award className="mt-0.5 size-4 shrink-0 text-red-400" /> {a}
                </li>
              ))}
              <li className="text-muted-foreground pt-3 text-sm">B.Tech, Computer Science & Engineering · VIT Vellore · 2023 – 2027</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
