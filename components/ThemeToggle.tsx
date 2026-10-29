"use client";

// Both icons render; CSS (the `dark:` variant) shows the right one, so the
// button needs no state and never mismatches during hydration.
function toggleTheme() {
  const root = document.documentElement;
  const current =
    root.dataset.theme ?? (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
  const next = current === "dark" ? "light" : "dark";
  root.dataset.theme = next;
  try {
    localStorage.setItem("theme", next);
  } catch {
    // Storage blocked (private mode, etc.): the choice just won't persist.
  }
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label="Toggle light and dark theme"
      className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-paper-2 hover:text-ink"
    >
      <svg className="size-[18px] dark:hidden" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <path d="M20.5 14.5A8.5 8.5 0 0 1 9.5 3.5a8.5 8.5 0 1 0 11 11Z" strokeLinejoin="round" />
      </svg>
      <svg className="hidden size-[18px] dark:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2.5v2M12 19.5v2M4.6 4.6 6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4 6 18M18 6l1.4-1.4" strokeLinecap="round" />
      </svg>
    </button>
  );
}
