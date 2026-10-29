"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import ThemeToggle from "./ThemeToggle";

type NavItem = { href: string; label: string };

export default function Nav({ items }: { items: NavItem[] }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const isActive = (href: string) => pathname.startsWith(href);

  return (
    <header className="no-print sticky top-0 z-40 border-b border-rule bg-paper/85 backdrop-blur-md">
      <nav aria-label="Main" className="mx-auto flex h-14 max-w-[68rem] items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="font-serif text-[1.15rem] font-medium tracking-tight" onClick={() => setOpen(false)}>
          Siddharth Paul
        </Link>

        <div className="flex items-center gap-1">
          <ul className="hidden items-center gap-1 lg:flex">
            {items.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className="rounded px-2.5 py-1.5 text-[0.98rem] text-muted transition-colors hover:text-ink aria-[current=page]:text-ink aria-[current=page]:underline aria-[current=page]:decoration-accent aria-[current=page]:decoration-1 aria-[current=page]:underline-offset-[6px]"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          <ThemeToggle />
          <button
            type="button"
            className="grid size-9 place-items-center rounded-full text-muted hover:bg-paper-2 hover:text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((o) => !o)}
          >
            <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
              {open ? <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" /> : <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <ul id="mobile-menu" className="border-t border-rule px-4 py-2 sm:px-6 lg:hidden">
          {items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={() => setOpen(false)}
                aria-current={isActive(item.href) ? "page" : undefined}
                className="flex items-baseline justify-between border-b border-rule/60 py-3 text-lg last:border-0 aria-[current=page]:text-accent"
              >
                {item.label}
                <span className="kicker">→</span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </header>
  );
}
