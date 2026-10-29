import Image from "next/image";
import type { ReactNode } from "react";

// Figures sit on a light "plate" in both themes: matplotlib output has a white
// background and reads as a printed figure rather than fighting dark mode.
export default function Figure({
  n,
  src,
  alt,
  width,
  height,
  children,
  priority,
}: {
  n?: number | string;
  src: string;
  alt: string;
  width: number;
  height: number;
  children?: ReactNode;
  priority?: boolean;
}) {
  return (
    <figure className="my-8">
      <a href={src} className="block rounded-[3px] border border-rule bg-plate p-2 transition-colors hover:border-accent/50 sm:p-3" title="Open full size">
        <Image src={src} alt={alt} width={width} height={height} priority={priority} sizes="(min-width: 1024px) 768px, 100vw" className="h-auto w-full" />
      </a>
      {children && (
        <figcaption className="mt-3 text-[0.95rem] leading-snug text-muted">
          {n !== undefined && <span className="mr-1.5 font-mono text-xs tracking-wider text-ink uppercase">Fig. {n}</span>}
          {children}
        </figcaption>
      )}
    </figure>
  );
}
