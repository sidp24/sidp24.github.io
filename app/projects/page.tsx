import type { Metadata } from "next";
import PageHeader from "@/components/PageHeader";
import ProjectEntry from "@/components/ProjectEntry";
import ProjectList from "@/components/ProjectList";
import Section from "@/components/Section";
import { projects } from "@/content/projects";

export const metadata: Metadata = {
  title: "Projects",
  description: "Research tools, quant and data projects, software, robotics, and hackathon builds.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  const current = projects.filter((p) => !p.archive);
  const archive = projects.filter((p) => p.archive);

  return (
    <>
      <PageHeader kicker="Projects" title="Things I've built">
        <p>Lab tools, quant and data work, software, and robotics. Physics tools link to the research write-up; everything else has public code.</p>
      </PageHeader>

      <div className="mt-10">
        <ProjectList projects={current} />
      </div>

      <Section id="archive" n="A" title="Archive: high school robotics and early work">
        <div className="border-t border-rule">
          {archive.map((p) => (
            <ProjectEntry key={p.slug} project={p} />
          ))}
        </div>
      </Section>
    </>
  );
}
