import type { ReactNode } from "react";

export default function PageHeader({
  kicker,
  title,
  children,
}: {
  kicker: string;
  title: ReactNode;
  children?: ReactNode;
}) {
  return (
    <header className="rise pt-14 pb-4 sm:pt-20">
      <p className="kicker">{kicker}</p>
      <h1 className="mt-3 max-w-3xl text-[2.4rem] leading-[1.08] font-medium tracking-tight text-balance sm:text-5xl">{title}</h1>
      {children && <div className="mt-5 max-w-2xl text-[1.2rem] leading-relaxed text-muted text-pretty">{children}</div>}
    </header>
  );
}
