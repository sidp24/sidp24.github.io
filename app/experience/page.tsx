import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import { experience } from "@/content/experience";

export const metadata: Metadata = {
  title: "Experience",
  description: "Undergraduate research at Rutgers' Q-Sim Lab, software engineering internships at Iconectiv (Ericsson), a startup, and teaching.",
  alternates: { canonical: "/experience/" },
};

export default function ExperiencePage() {
  return (
    <>
      <PageHeader kicker="Experience" title="Research, industry, and teaching">
        <p>A physics lab, two summers of software engineering at Iconectiv, a startup I co-founded in high school, and a few years of teaching programming.</p>
      </PageHeader>

      <ol className="mt-12 border-t border-rule">
        {experience.map((e) => (
          <li key={`${e.role}-${e.period}`} className="grid gap-x-12 gap-y-2 border-b border-rule py-8 lg:grid-cols-[14rem_minmax(0,1fr)]">
            <div className="flex flex-wrap items-baseline gap-x-3 lg:block">
              <p className="kicker">{e.period}</p>
              <p className="font-mono text-[0.72rem] tracking-wide text-margin uppercase lg:mt-2">{e.kind}</p>
              {e.location && <p className="kicker lg:mt-2">{e.location}</p>}
            </div>
            <div className="max-w-[42rem]">
              <h2 className="text-[1.4rem] leading-tight font-medium tracking-tight">{e.role}</h2>
              <p className="mt-1 text-muted">
                {e.org}
                {e.detail && <> · {e.detail}</>}
              </p>
              <ul className="mt-4 space-y-2.5 text-[1.02rem] leading-relaxed">
                {e.bullets.map((b) => (
                  <li key={b} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-muted">
                    {b}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </>
  );
}
