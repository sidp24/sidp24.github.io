import type { ReactNode } from "react";

// A numbered notebook section. On wide screens `aside` sits in a margin column
// beside the text; on narrow screens it falls in under the heading.
export default function Section({
  id,
  n,
  title,
  aside,
  children,
}: {
  id: string;
  n: number | string;
  title: ReactNode;
  aside?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className="mt-16 scroll-mt-20 border-t border-rule pt-8 lg:grid lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-x-12"
    >
      <div className="min-w-0">
        <h2 id={`${id}-title`} className="group flex items-baseline gap-3 text-[1.75rem] leading-tight font-medium tracking-tight">
          <span className="font-mono text-sm font-normal text-accent">§{n}</span>
          <a href={`#${id}`} className="decoration-rule decoration-1 underline-offset-4 hover:underline">
            {title}
          </a>
        </h2>
        {aside && <aside className="mt-4 border-l-2 border-margin/60 pl-3 text-[0.95rem] leading-snug text-muted lg:hidden">{aside}</aside>}
        <div className="mt-6">{children}</div>
      </div>
      {aside && (
        <aside className="hidden pt-14 text-[0.95rem] leading-snug text-muted lg:block">
          <div className="border-l-2 border-margin/60 pl-3">{aside}</div>
        </aside>
      )}
    </section>
  );
}
