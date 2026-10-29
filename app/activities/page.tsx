import type { Metadata } from "next";
import EntryList from "@/components/EntryList";
import Figure from "@/components/Figure";
import PageHeader from "@/components/PageHeader";
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

        <div className="grid gap-x-6 sm:grid-cols-2">
          <Figure src="/photos/scar-2025-26.jpg" alt="SCAR's orange robot scoring blocks on a VEX field" width={1600} height={1063}>
            SCAR&apos;s robot on the field, 2025–26 season.
          </Figure>
          <Figure src="/photos/scar-worlds-2025.jpg" alt="SCAR's red and blue robots side by side at the 2025 VEX World Championship" width={1600} height={920}>
            SCAR&apos;s two High Stakes robots at the 2025 World Championship.
          </Figure>
        </div>
      </Section>

      <Section id="hackathons" n={2} title="Hackathons and competitions">
        <EntryList entries={hackathons} />
      </Section>

      <Section id="speaking" n={3} title="Speaking">
        <EntryList entries={speaking} />
      </Section>

      <Section id="teaching" n={4} title="Teaching and mentoring">
        <EntryList entries={mentoring} />
      </Section>

      <Section id="earlier" n={5} title="Earlier: high school">
        <EntryList entries={earlier} />
      </Section>

      <Section id="outside" n={6} title="Outside of this">
        <p className="max-w-[40rem] text-pretty">
          I play guitar (mostly Pink Floyd and The Beatles), lift, and spend more time on robotics than any competition strictly
          requires. The rest goes to friends, new restaurants, and long drives.
        </p>
      </Section>
    </>
  );
}
