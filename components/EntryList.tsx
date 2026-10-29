import type { Entry } from "@/content/activities";

export default function EntryList({ entries }: { entries: Entry[] }) {
  return (
    <ul className="border-t border-rule">
      {entries.map((e) => (
        <li key={`${e.title}-${e.org}`} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
          <span className="kicker pt-1.5">{e.year}</span>
          <div>
            <p className="leading-snug">
              {e.link ? (
                <a href={e.link} className="link font-medium">
                  {e.title}
                </a>
              ) : (
                <span className="font-medium">{e.title}</span>
              )}
              <span className="text-muted"> · {e.org}</span>
            </p>
            {e.description && <p className="mt-1 text-[1rem] leading-snug text-muted">{e.description}</p>}
          </div>
        </li>
      ))}
    </ul>
  );
}
