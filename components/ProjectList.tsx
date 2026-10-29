"use client";

import { useState } from "react";
import { projectAreas, type Project, type ProjectArea } from "@/content/projects";
import ProjectEntry from "./ProjectEntry";

export default function ProjectList({ projects }: { projects: Project[] }) {
  const [area, setArea] = useState<ProjectArea | "All">("All");
  const shown = area === "All" ? projects : projects.filter((p) => p.areas.includes(area));

  return (
    <div>
      <div role="group" aria-label="Filter projects by area" className="flex flex-wrap gap-2">
        {(["All", ...projectAreas] as const).map((a) => (
          <button
            key={a}
            type="button"
            aria-pressed={area === a}
            onClick={() => setArea(a)}
            className="rounded-full border border-rule px-3.5 py-1 font-mono text-[0.78rem] text-muted transition-colors hover:border-ink/40 hover:text-ink aria-pressed:border-accent aria-pressed:bg-accent-soft aria-pressed:text-accent"
          >
            {a}
            <span className="ml-1.5 opacity-60">{a === "All" ? projects.length : projects.filter((p) => p.areas.includes(a)).length}</span>
          </button>
        ))}
      </div>
      <div className="mt-4 border-t border-rule">
        {shown.map((p) => (
          <ProjectEntry key={p.slug} project={p} />
        ))}
      </div>
    </div>
  );
}
