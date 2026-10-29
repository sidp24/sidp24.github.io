import Link from "next/link";
import type { Project } from "@/content/projects";

export default function ProjectEntry({ project: p }: { project: Project }) {
  return (
    <article className="border-b border-rule py-6">
      <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
        <h3 className="text-[1.3rem] leading-tight font-medium tracking-tight">{p.title}</h3>
        {p.year && <span className="kicker">{p.year}</span>}
        {p.badge && <span className="font-mono text-[0.72rem] tracking-wide text-margin uppercase">{p.badge}</span>}
      </div>
      <p className="mt-2 max-w-[42rem] text-[1.02rem] leading-relaxed text-pretty">{p.summary}</p>
      <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2">
        <p className="font-mono text-[0.75rem] text-muted">{p.tech.join(" · ")}</p>
        <div className="flex gap-4 text-[0.95rem]">
          {p.links.writeup && (
            <Link href={p.links.writeup} className="link">
              Write-up →
            </Link>
          )}
          {p.links.live && (
            <a href={p.links.live} className="link">
              Live ↗
            </a>
          )}
          {p.links.repo && (
            <a href={p.links.repo} className="link">
              Code ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
