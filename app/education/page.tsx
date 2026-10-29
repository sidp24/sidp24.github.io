import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import { coursework, degree, skills } from "@/content/education";

export const metadata: Metadata = {
  title: "Education",
  description: "B.S. Physics and B.S. Computer Science with a minor in Mathematics at Rutgers University–New Brunswick, Class of 2027.",
  alternates: { canonical: "/education/" },
};

export default function EducationPage() {
  return (
    <>
      <PageHeader kicker="Education" title={degree.school}>
        <p>Two bachelor&apos;s degrees, physics and computer science, with a minor in mathematics. Class of 2027.</p>
      </PageHeader>

      <Section id="degree" n={1} title="Degree">
        <div className="grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-3">
          {degree.degrees.map((d) => (
            <div key={d} className="bg-paper p-4">
              <p className="text-[1.15rem] font-medium">{d}</p>
            </div>
          ))}
        </div>
        <p className="kicker mt-4 flex flex-wrap gap-x-4 gap-y-1">
          <span>{degree.period}</span>
          <span>{degree.location}</span>
        </p>
      </Section>

      <Section id="coursework" n={2} title="Coursework">
        <div className="grid gap-8 sm:grid-cols-3">
          {coursework.map((g) => (
            <div key={g.field}>
              <h3 className="kicker border-b border-rule pb-2 text-ink">{g.field}</h3>
              <ul className="mt-3 space-y-2 text-[1.02rem] leading-snug">
                {g.courses.map((c) => (
                  <li key={c}>{c}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </Section>

      <Section id="skills" n={3} title="Skills">
        <dl className="border-t border-rule">
          {skills.map((s) => (
            <div key={s.title} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[12rem_minmax(0,1fr)] sm:gap-6">
              <dt className="kicker pt-1">{s.title}</dt>
              <dd className="text-[1.02rem] leading-relaxed">{s.items.join(" · ")}</dd>
            </div>
          ))}
        </dl>
      </Section>
    </>
  );
}
