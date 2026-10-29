import { site } from "@/content/site";

export default function Footer() {
  return (
    <footer className="no-print mt-28 border-t border-rule">
      <div className="mx-auto flex max-w-[68rem] flex-col gap-6 px-4 py-10 sm:flex-row sm:items-end sm:justify-between sm:px-6">
        <div>
          <p className="font-medium">{site.name}</p>
          <p className="mt-1 text-[0.95rem] text-muted">
            Physics, computer science &amp; mathematics · Rutgers University, Class of 2027
          </p>
          <a href={`mailto:${site.email}`} className="link mt-2 inline-block text-[0.95rem]">
            {site.email}
          </a>
        </div>
        <div className="flex flex-col gap-2 sm:items-end">
          <ul className="flex flex-wrap gap-x-5 gap-y-1 text-[0.95rem]">
            <li><a className="link" href={site.links.github}>GitHub</a></li>
            <li><a className="link" href={site.links.linkedin}>LinkedIn</a></li>
            <li><a className="link" href={site.links.devpost}>Devpost</a></li>
            <li><a className="link" href={site.cv}>CV (PDF)</a></li>
          </ul>
          <p className="kicker">Set in Newsreader &amp; IBM Plex Mono · {new Date().getFullYear()}</p>
        </div>
      </div>
    </footer>
  );
}
