import { ArrowLeft, ArrowRight, FileText } from "lucide-react";

import { SectionHead } from "@/components/site";
import { caseStudies } from "@/data/content";

export default function CaseStudy({ slug }: { slug: string }) {
  const index = caseStudies.findIndex((c) => c.slug === slug);
  const c = caseStudies[index];

  if (!c) {
    return (
      <main className="mx-auto flex min-h-screen max-w-6xl flex-col items-start justify-center px-4 sm:px-6">
        <h1 className="font-display mb-6 text-4xl">Case study not found</h1>
        <a href="#work" className="text-red-300 hover:text-white">← Back to case studies</a>
      </main>
    );
  }

  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <main className="pt-28 pb-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <a href="#work" className="text-muted-foreground hover:text-foreground mb-10 inline-flex items-center gap-2 text-sm transition-colors">
          <ArrowLeft className="size-4" /> All case studies
        </a>

        <div className="mb-4 text-xs tracking-[0.3em] text-red-400/70 uppercase">
          0{index + 1} · {c.kind}
        </div>
        <h1 className="font-display mb-6 text-5xl leading-[0.95] tracking-tighter sm:text-7xl">
          <span className="bg-gradient-to-b from-red-100 via-red-400 to-red-700 bg-clip-text text-transparent">{c.title}</span>
        </h1>
        <p className="text-muted-foreground mb-10 max-w-3xl text-lg leading-relaxed sm:text-xl">{c.summary}</p>

        <a
          href={c.pdf}
          target="_blank"
          rel="noreferrer"
          className="group relative mb-14 inline-flex items-center gap-2 overflow-hidden border border-red-500/30 px-6 py-3 text-sm tracking-wider text-red-200 uppercase transition-all duration-500 hover:border-red-400 hover:text-white"
        >
          <FileText className="size-4" /> Read the full deck (PDF)
          <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-red-600/0 via-red-500/20 to-red-600/0 transition-transform duration-1000 group-hover:translate-x-full" />
        </a>

        <img
          src={c.image}
          alt={`${c.title} cover`}
          className="mb-20 w-full rounded-2xl border border-white/10 shadow-[0_40px_100px_-40px_rgba(239,68,68,0.45)]"
        />

        <section className="mb-20">
          <SectionHead eyebrow="The problem" title="What's getting in the user's way" />
          <div className="grid gap-5 md:grid-cols-2">
            {c.problems.map((p, i) => (
              <div key={p.title} className="bg-muted rounded-2xl border border-white/10 p-7">
                <div className="mb-3 text-xs tracking-[0.3em] text-red-400/70 uppercase">Problem {i + 1}</div>
                <h3 className="font-display mb-3 text-xl tracking-tight">{p.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{p.detail}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mb-20">
          <SectionHead eyebrow="The ideas" title="What I'd change" />
          <ol className="space-y-4">
            {c.ideas.map((idea, i) => (
              <li key={idea} className="flex gap-5 border-b border-[var(--border)] pb-4 text-lg leading-relaxed text-white/85">
                <span className="font-display text-red-400 tabular-nums">0{i + 1}</span>
                {idea}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-24">
          <SectionHead eyebrow="Measuring it" title="Metrics that should move" />
          <div className="flex flex-wrap gap-3">
            {c.metrics.map((m) => (
              <span key={m} className="rounded-full border border-red-500/30 bg-red-500/5 px-4 py-2 text-sm text-red-100">
                {m}
              </span>
            ))}
          </div>
        </section>

        <a
          href={`#/case/${next.slug}`}
          className="group bg-muted flex items-center justify-between rounded-2xl border border-white/10 p-8 transition-colors hover:border-red-400/60"
        >
          <span>
            <span className="text-muted-foreground block text-xs tracking-[0.3em] uppercase">Next case study</span>
            <span className="font-display mt-2 block text-2xl tracking-tight sm:text-4xl">{next.title}</span>
          </span>
          <ArrowRight className="size-6 transition-transform duration-500 group-hover:translate-x-2" />
        </a>
      </div>
    </main>
  );
}
