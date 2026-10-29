import type { Metadata } from "next";
import Link from "next/link";
import PageHeader from "@/components/PageHeader";
import { formatDate, getNotes } from "@/lib/notes";

export const metadata: Metadata = {
  title: "Notes",
  description: "Write-ups on physics, measurement, and the software behind them.",
  alternates: { canonical: "/notes/" },
};

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <>
      <PageHeader kicker="Notes" title="Notes">
        <p>Write-ups of methods and measurements: what I did, the math behind it, and what went wrong.</p>
      </PageHeader>

      {notes.length === 0 ? (
        <p className="mt-12 text-muted">Nothing published yet.</p>
      ) : (
        <ul className="mt-12 border-t border-rule">
          {notes.map((n) => (
            <li key={n.slug} className="border-b border-rule">
              <Link href={`/notes/${n.slug}/`} className="group grid gap-1 py-6 sm:grid-cols-[11rem_minmax(0,1fr)] sm:gap-6">
                <span className="kicker pt-1.5">
                  {formatDate(n.date)}
                  {n.draft && <span className="ml-2 text-margin">Draft</span>}
                </span>
                <span>
                  <span className="text-[1.3rem] leading-tight font-medium tracking-tight group-hover:text-accent">{n.title}</span>
                  <span className="mt-1 block text-muted">{n.summary}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}
