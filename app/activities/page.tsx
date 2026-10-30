import type { Metadata } from "next";
import EntryList from "@/components/EntryList";
import CADSection from "@/components/CADSection";
import PageHeader from "@/components/PageHeader";
import PhotoGallery from "@/components/PhotoGallery";
import Section from "@/components/Section";
import { earlier, hackathons, mentoring, robotics, speaking } from "@/content/activities";

export const metadata: Metadata = {
  title: "Activities",
  description: "President of SCAR Robotics (Rutgers VEX U), hackathons, talks, teaching, and earlier leadership.",
  alternates: { canonical: "/activities/" },
};

export default function ActivitiesPage() {
  return (
    <>
      <PageHeader kicker="Activities" title="Robotics, competitions, and talks">
        <p>Most of my time outside the lab goes to SCAR, Rutgers&apos; VEX U robotics team. The rest goes to hackathons, speaking, and teaching.</p>
      </PageHeader>

      <Section
        id="robotics"
        n={1}
        title={robotics.team}
        aside={
          <>
            <p className="kicker mb-1.5">Sponsors</p>
            {robotics.sponsors.join(" · ")}
            <p className="kicker mt-4 mb-1.5">Program</p>
            {robotics.program}
          </>
        }
      >
        <p className="kicker">
          {robotics.org} · {robotics.role} · {robotics.period}
        </p>
        <ul className="mt-4 max-w-[42rem] space-y-2.5 text-[1.02rem] leading-relaxed">
          {robotics.bullets.map((b) => (
            <li key={b} className="relative pl-5 before:absolute before:top-[0.7em] before:left-0 before:h-px before:w-2.5 before:bg-muted">
              {b}
            </li>
          ))}
        </ul>

        <ul aria-label="Seasons" className="mt-8 border-t border-rule">
          {robotics.seasons.map((s) => (
            <li key={s.season} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
              <span className="kicker pt-1.5">{s.season}</span>
              <p className="leading-snug">
                <span className="font-medium">{s.result}</span>
                <span className="text-muted">
                  {" "}
                  · {s.game} · {s.role}
                </span>
              </p>
            </li>
          ))}
        </ul>

        <PhotoGallery
          photos={[
            {
              src: "/photos/scar-field-action.jpg",
              alt: "Two SCAR robots competing on a VEX field with balls in play",
              width: 2048,
              height: 1360,
              caption: "Head-to-head on the field.",
            },
            {
              src: "/photos/scar-robots-bokeh.jpg",
              alt: "SCAR orange and red robots side by side on a table",
              width: 1600,
              height: 1066,
              caption: "The 2025–26 robots.",
            },
            {
              src: "/photos/scar-field-highstakes.jpg",
              alt: "SCAR robots in action on the High Stakes VEX field",
              width: 1600,
              height: 1066,
              caption: "High Stakes season, 2024–25.",
            },
            {
              src: "/photos/scar-worlds-2025.jpg",
              alt: "SCAR red and blue robots at the 2025 VEX World Championship",
              width: 1600,
              height: 920,
              caption: "High Stakes robots at Worlds.",
            },
            {
              src: "/photos/scar-worlds-display.jpg",
              alt: "SCAR robots at the VEX World Championship display table",
              width: 1066,
              height: 1600,
              caption: "Pit setup at Worlds.",
            },
            {
              src: "/photos/scar-team-worlds.jpg",
              alt: "SCAR team photo at the VEX World Championship with light arch backdrop",
              width: 1600,
              height: 1066,
              caption: "Team photo at the 2025 World Championship.",
            },
          ]}
        />
      </Section>

      <Section id="cad" n={2} title="CAD & custom parts">
        <p className="max-w-[40rem] text-[1.02rem] leading-relaxed">
          Every robot subsystem starts as an Onshape assembly. Custom parts — motor carts, intake rollers, color sorters, chassis panels — are designed in-house and printed in SUNLU PETG or PLA on our Elegoo printers.
        </p>
        <CADSection />
      </Section>

      <Section id="hackathons" n={3} title="Hackathons and competitions">
        <EntryList entries={hackathons} />
      </Section>

      <Section id="speaking" n={4} title="Speaking">
        <EntryList entries={speaking} />
      </Section>

      <Section id="teaching" n={5} title="Teaching and mentoring">
        <EntryList entries={mentoring} />
      </Section>

      <Section id="earlier" n={6} title="Earlier: high school">
        <EntryList entries={earlier} />
      </Section>

      <Section id="outside" n={7} title="Outside of this">
        <div className="max-w-[40rem] space-y-4 text-pretty">
          <p>
            Guitar, mostly Pink Floyd and The Beatles. I lift. I probably spend more time on robotics than I need to for any
            specific competition goal, but that&apos;s fine — I like building things.
          </p>
          <p className="text-muted">
            The rest goes to friends, trying restaurants I haven&apos;t been to yet, and long drives where I&apos;m not really going anywhere.
          </p>
        </div>
      </Section>
    </>
  );
}
