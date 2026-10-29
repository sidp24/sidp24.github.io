import Image from "next/image";
import Link from "next/link";
import EntryList from "@/components/EntryList";
import Figure from "@/components/Figure";
import Section from "@/components/Section";
import { honors } from "@/content/activities";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { researchPosition } from "@/content/research";
import { site } from "@/content/site";
import { formatDate, getNotes } from "@/lib/notes";

export default async function Home() {
  const featured = projects.filter((p) => p.featured);
  const notes = (await getNotes()).slice(0, 3);

  return (
    <>
      <header className="graph-paper rise -mx-4 border-b border-rule px-4 pt-14 pb-12 sm:-mx-6 sm:px-6 sm:pt-20">
        <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_13rem] md:items-end">
          <div>
            <p className="kicker">Rutgers University · Class of 2027</p>
            <h1 className="mt-3 text-[3rem] leading-[1.02] font-medium tracking-tight sm:text-[4.25rem]">{site.name}</h1>
            <p className="mt-3 text-[1.35rem] text-muted italic">Physics, computer science, and mathematics.</p>
            <div className="mt-6 max-w-[38rem] space-y-4 text-[1.15rem] leading-relaxed text-pretty">
              <p>
                I study physics and computer science at Rutgers, with a minor in math. In the Q-Sim Lab I make and measure spin
                defects in hexagonal boron nitride, and I write most of the software around that work: the simulations, the data
                pipelines, and the bench tools. I also run SCAR, Rutgers&apos; VEX U robotics team.
              </p>
              <p className="text-muted">I like problems where the method isn&apos;t obvious at the start.</p>
            </div>
            <ul className="mt-7 flex flex-wrap gap-x-6 gap-y-2 text-[1.02rem]">
              <li><a className="link" href={`mailto:${site.email}`}>Email</a></li>
              <li><a className="link" href={site.cv}>CV (PDF)</a></li>
              <li><a className="link" href={site.links.github}>GitHub</a></li>
              <li><a className="link" href={site.links.linkedin}>LinkedIn</a></li>
            </ul>
          </div>
          <figure className="w-40 md:w-full">
            <div className="rounded-[3px] border border-rule bg-plate p-2">
              <Image src="/images/headshot.jpg" alt="Portrait of Siddharth Paul" width={720} height={720} priority sizes="208px" className="h-auto w-full" />
            </div>
            <figcaption className="kicker mt-2">S. Paul, 2026</figcaption>
          </figure>
        </div>
      </header>

      <dl className="mt-10 grid gap-px overflow-hidden rounded-[3px] border border-rule bg-rule sm:grid-cols-3">
        {[
          ["Research", <>VB⁻ spin defects in hBN, {researchPosition.lab} ({researchPosition.advisor})</>],
          ["Robotics", <>President, SCAR Robotics (VEX U). Worlds Top 20 in 2026</>],
          ["Studies", <>Senior year: B.S. Physics, B.S. Computer Science, Math minor</>],
        ].map(([label, body]) => (
          <div key={label as string} className="bg-paper p-4">
            <dt className="kicker">{label}</dt>
            <dd className="mt-1.5 text-[1.02rem] leading-snug">{body}</dd>
          </div>
        ))}
      </dl>

      <Section
        id="research"
        n={1}
        title="Research"
        aside={
          <>
            <p className="kicker mb-1.5">Methods</p>
            SRIM/TRIM Monte Carlo · confocal photoluminescence · ODMR · AFM · PC/PVA dry transfer · Python analysis pipelines
          </>
        }
      >
        <div className="max-w-[40rem] space-y-4 text-pretty">
          <p>
            The negatively charged boron vacancy (VB⁻) in hexagonal boron nitride is a spin defect that can be read out optically
            at room temperature. Because it lives inside a layered crystal only nanometers thick, it can sit right against whatever
            it is sensing. I work on making these defects on purpose: choosing ion-beam conditions with Monte Carlo simulation,
            irradiating exfoliated flakes, and checking the result with photoluminescence mapping, AFM, and ODMR.
          </p>
        </div>
        <Figure n={1} src="/figures/srim-campaigns.png" alt="Six-panel SRIM analysis of helium-ion damage in a 10 nm hBN film on SiO2" width={2200} height={1337}>
          SRIM simulations of He⁺ ions in 10 nm hBN on SiO₂: vacancy depth profiles, ion stopping, boron vacancies per ion versus
          energy, substrate contamination, film-thickness comparison, and displacements per atom versus fluence.
        </Figure>
        <Link href="/research/" className="link text-[1.05rem]">
          Read the research write-up →
        </Link>
      </Section>

      <Section id="work" n={2} title="Selected work">
        <ul className="border-t border-rule">
          {featured.map((p) => {
            const href = p.links.writeup ?? p.links.live ?? p.links.repo ?? "/projects/";
            return (
              <li key={p.slug} className="border-b border-rule">
                <a href={href} className="group grid gap-1 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                  <span className="font-medium group-hover:text-accent">
                    {p.title}
                    {p.year && <span className="kicker ml-2">{p.year}</span>}
                  </span>
                  <span className="text-[1.02rem] text-muted">{p.short}</span>
                </a>
              </li>
            );
          })}
        </ul>
        <Link href="/projects/" className="link mt-5 inline-block text-[1.05rem]">
          All projects →
        </Link>
      </Section>

      <Section id="experience" n={3} title="Experience">
        <ul className="border-t border-rule">
          {experience.slice(0, 3).map((e) => (
            <li key={`${e.role}-${e.period}`} className="grid gap-1 border-b border-rule py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
              <span className="kicker pt-1">{e.period}</span>
              <span>
                <span className="font-medium">{e.role}</span>
                <span className="text-muted"> · {e.org}</span>
              </span>
            </li>
          ))}
        </ul>
        <Link href="/experience/" className="link mt-5 inline-block text-[1.05rem]">
          Full experience →
        </Link>
      </Section>

      <Section id="honors" n={4} title="Honors">
        <EntryList entries={honors} />
        <Link href="/activities/" className="link mt-5 inline-block text-[1.05rem]">
          Activities, talks &amp; leadership →
        </Link>
      </Section>

      {notes.length > 0 && (
        <Section id="notes" n={5} title="Notes">
          <ul className="border-t border-rule">
            {notes.map((n) => (
              <li key={n.slug} className="border-b border-rule">
                <Link href={`/notes/${n.slug}/`} className="group grid gap-1 py-4 sm:grid-cols-[13rem_minmax(0,1fr)] sm:gap-6">
                  <span className="kicker pt-1">{formatDate(n.date)}</span>
                  <span>
                    <span className="font-medium group-hover:text-accent">{n.title}</span>
                    <span className="mt-0.5 block text-[1rem] text-muted">{n.summary}</span>
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      )}
    </>
  );
}
