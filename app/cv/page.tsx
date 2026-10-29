import type { Metadata } from "next";
import type { ReactNode } from "react";
import { honors, robotics, speaking } from "@/content/activities";
import { coursework, degree, skills } from "@/content/education";
import { experience } from "@/content/experience";
import { interests, outputs } from "@/content/research";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "CV",
  description: "Curriculum vitae of Siddharth Paul: education, research, experience, leadership, honors, and skills.",
  alternates: { canonical: "/cv/" },
};

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="mt-10 grid gap-x-10 gap-y-3 border-t border-rule pt-5 break-inside-avoid sm:grid-cols-[10rem_minmax(0,1fr)] print:mt-5 print:pt-3">
      <h2 className="kicker pt-1 text-ink">{title}</h2>
      <div className="min-w-0 space-y-5 print:space-y-3">{children}</div>
    </section>
  );
}

function Item({ title, org, period, children }: { title: string; org: string; period: string; children?: ReactNode }) {
  return (
    <div className="break-inside-avoid">
      <div className="flex flex-wrap items-baseline justify-between gap-x-4">
        <p>
          <span className="font-medium">{title}</span>
          <span className="text-muted"> · {org}</span>
        </p>
        <p className="kicker">{period}</p>
      </div>
      {children}
    </div>
  );
}

function Bullets({ items }: { items: string[] }) {
  return (
    <ul className="mt-2 space-y-1.5 text-[1rem] leading-snug print:space-y-0.5">
      {items.map((b) => (
        <li key={b} className="relative pl-4 before:absolute before:top-[0.65em] before:left-0 before:h-px before:w-2 before:bg-muted">
          {b}
        </li>
      ))}
    </ul>
  );
}

export default function CVPage() {
  const research = experience.filter((e) => e.kind === "Research");
  const work = experience.filter((e) => e.kind !== "Research");

  return (
    <div className="pt-14 sm:pt-20 print:pt-0">
      <header className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="kicker">Curriculum vitae</p>
          <h1 className="mt-2 text-[2.6rem] leading-none font-medium tracking-tight">{site.name}</h1>
          <p className="mt-3 text-[1rem] text-muted">
            <a className="link" href={`mailto:${site.email}`}>{site.email}</a> · <a className="link" href={site.url}>sidp24.github.io</a> ·{" "}
            <a className="link" href={site.links.github}>github.com/sidp24</a> ·{" "}
            <a className="link" href={site.links.linkedin}>linkedin.com/in/siddharth-paul24</a>
          </p>
        </div>
        <div className="no-print flex flex-wrap gap-3">
          <a href={site.cv} className="rounded-full border border-accent bg-accent-soft px-4 py-1.5 font-mono text-[0.8rem] text-accent hover:bg-accent hover:text-paper">
            Academic CV (PDF)
          </a>
          <a href={site.resume} className="rounded-full border border-rule px-4 py-1.5 font-mono text-[0.8rem] text-muted hover:border-ink/40 hover:text-ink">
            Industry résumé (PDF)
          </a>
        </div>
      </header>

      <Block title="Education">
        <Item title={degree.school} org={degree.location} period={degree.period}>
          <p className="mt-1">{degree.degrees.join(" · ")}</p>
          <p className="mt-2 text-[1rem] leading-snug text-muted">
            {coursework.map((g) => (
              <span key={g.field} className="block">
                <span className="text-ink">{g.field}:</span> {g.courses.join(", ")}
              </span>
            ))}
          </p>
        </Item>
      </Block>

      <Block title="Research interests">
        <p className="text-[1.02rem] leading-relaxed">{interests}</p>
      </Block>

      <Block title="Research">
        {research.map((e) => (
          <Item key={e.org} title={e.role} org={`${e.org}${e.detail ? ` (${e.detail.replace("Advisor: ", "advisor ")})` : ""}`} period={e.period}>
            <Bullets items={e.bullets} />
          </Item>
        ))}
      </Block>

      <Block title="Talks & reports">
        <ul className="space-y-1.5 text-[1rem] leading-snug">
          {outputs.map((o) => (
            <li key={o.title}>
              <span className="text-muted">{o.kind}:</span> {o.title}. <span className="text-muted">{o.venue}, {o.date}.</span>
            </li>
          ))}
          {speaking.map((s) => (
            <li key={s.org}>
              <span className="text-muted">{s.title}:</span> {s.org}. <span className="text-muted">{s.year}.</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Experience">
        {work.map((e) => (
          <Item key={`${e.role}-${e.period}`} title={e.role} org={e.org} period={e.period}>
            <Bullets items={e.bullets} />
          </Item>
        ))}
      </Block>

      <Block title="Leadership">
        <Item title={robotics.role} org={`${robotics.team} (${robotics.org})`} period={robotics.period}>
          <Bullets items={robotics.bullets} />
        </Item>
      </Block>

      <Block title="Honors">
        <ul className="space-y-1.5 text-[1rem] leading-snug">
          {honors.map((h) => (
            <li key={`${h.title}-${h.year}`} className="flex flex-wrap justify-between gap-x-4">
              <span>
                {h.title} <span className="text-muted">· {h.org}</span>
              </span>
              <span className="kicker">{h.year}</span>
            </li>
          ))}
        </ul>
      </Block>

      <Block title="Skills">
        <dl className="space-y-1.5 text-[1rem] leading-snug">
          {skills.map((s) => (
            <div key={s.title}>
              <dt className="inline text-ink">{s.title}: </dt>
              <dd className="inline text-muted">{s.items.join(", ")}</dd>
            </div>
          ))}
        </dl>
      </Block>
    </div>
  );
}
