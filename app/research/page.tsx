import type { Metadata } from "next";
import Figure from "@/components/Figure";
import PageHeader from "@/components/PageHeader";
import Section from "@/components/Section";
import Tex from "@/components/Tex";
import { interests, outputs, researchPosition, timeline } from "@/content/research";

export const metadata: Metadata = {
  title: "Research",
  description: "Engineering VB⁻ spin defects in hexagonal boron nitride: ion irradiation, SRIM simulation, photoluminescence, AFM, and ODMR.",
  alternates: { canonical: "/research/" },
};

export default function ResearchPage() {
  return (
    <>
      <PageHeader kicker="Research" title="Spin defects in hexagonal boron nitride">
        <p>{interests}</p>
      </PageHeader>

      <p className="kicker mt-2 flex flex-wrap gap-x-4 gap-y-1">
        <span>{researchPosition.lab}, {researchPosition.institution}</span>
        <span>Advisor: {researchPosition.advisor}</span>
        <span>{researchPosition.period}</span>
      </p>

      <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-x-12">
        <div className="rounded-[3px] border border-rule bg-paper-2 p-5 sm:p-6">
          <p className="kicker">Abstract</p>
          <p className="mt-2 max-w-[40rem] text-pretty">
            The negatively charged boron vacancy, VB⁻, is an optically addressable spin defect in hexagonal boron nitride (hBN).
            Its spin state can be read out with light at room temperature, and because hBN is a layered crystal a few nanometers
            thick, the defect can sit almost directly against whatever it is measuring. The project creates these defects
            deliberately, by irradiating exfoliated flakes with an ion beam and checking the result with confocal
            photoluminescence and optically detected magnetic resonance. Alongside the measurements, I wrote the PL analysis
            pipeline and bench tools for PL and AFM data, and I have been building Monte Carlo ion-transport simulations to choose
            beam conditions for future irradiations.
          </p>
        </div>
        <aside aria-label="Lab log">
          <p className="kicker mb-2">Lab log</p>
          <ol className="space-y-2 border-l-2 border-margin/60 pl-3 text-[0.92rem] leading-snug text-muted">
            {timeline.map((t) => (
              <li key={t.date}>
                <span className="font-mono text-[0.72rem] text-ink">{t.date}</span>
                <br />
                {t.event}
              </li>
            ))}
          </ol>
        </aside>
      </div>

      <Section
        id="vb"
        n={1}
        title="Why boron vacancies"
        aside={
          <>
            <p className="kicker mb-1.5">Key numbers</p>
            Spin-1 ground state
            <br />
            <Tex>{String.raw`D/h \approx 3.48\ \mathrm{GHz}`}</Tex>
            <br />
            <Tex>{String.raw`\gamma_e \approx 28\ \mathrm{MHz/mT}`}</Tex>
            <br />
            Broad emission near 800 nm
          </>
        }
      >
        <div className="prose-notebook">
          <p>
            Diamond NV centers made quantum sensing practical, but they sit inside a bulk crystal, which limits how close they get
            to a sample. VB⁻ lives in a van der Waals material that can be thinned to a few layers and stacked directly onto other
            2D materials. Its ground state is a spin triplet, described by
          </p>
          <Tex display>{String.raw`\begin{aligned} H &= D\left[S_z^2 - \tfrac{1}{3}S(S+1)\right] + E\left(S_x^2 - S_y^2\right) \\ &\quad + g\mu_B\,\mathbf{B}\cdot\mathbf{S}, \qquad S = 1. \end{aligned}`}</Tex>
          <p>
            At zero field the <Tex>{String.raw`m_s = \pm 1`}</Tex> levels sit about 3.48 GHz above <Tex>{String.raw`m_s = 0`}</Tex>.
            The two levels differ in how brightly the defect fluoresces, so sweeping a microwave drive across the resonance shows up
            as a dip in photoluminescence. A magnetic field along the c-axis splits that dip into two:
          </p>
          <Tex display>{String.raw`\nu_\pm \approx \frac{D}{h} \pm \sqrt{\left(\frac{E}{h}\right)^2 + \left(\gamma_e B_z\right)^2}.`}</Tex>
          <p>
            Reading the splitting gives the local field. Strain and temperature move <Tex>D</Tex>, which turns the same defect into
            a sensor for those too. None of that matters until the defects exist in the right density, which is where my work
            starts.
          </p>
        </div>
      </Section>

      <Section
        id="irradiation"
        n={2}
        title="Making defects"
        aside={
          <>
            <p className="kicker mb-1.5">Process</p>
            Exfoliation and thermal-release-tape transfer onto SiO₂/Si → PL map → 2 MeV irradiation in the RBS chamber → PL map
            again
          </>
        }
      >
        <div className="prose-notebook">
          <p>
            Boron vacancies form when an incoming ion knocks a boron atom out of the lattice. Our first samples were exfoliated hBN
            flakes on SiO₂/Si, mapped with confocal photoluminescence (PL), irradiated with a 2 MeV ion beam in the Rutherford
            backscattering (RBS) chamber, and mapped again.
          </p>
          <p>
            The first trial, a 30-minute exposure, did not raise PL at all. Typical intensities dropped from roughly 120–160 to
            70–110 (arbitrary units). The second trial ran for 11 hours. Afterward the maps showed isolated bright spots that stayed
            in the same places across repeated scans, which rules out transient noise. The overall comparison is mixed: a few
            irradiated maps are far brighter than anything before dosing, but they contain fewer bright clusters.
          </p>
          <p>
            PL intensity alone cannot say whether a bright spot is VB⁻ or some other emitter. That needs a spin measurement (§5).
            Choosing beam energy and dose more deliberately is what the simulation work in §3 is for.
          </p>
        </div>
        <Figure n={2} src="/figures/pl-map-overview.png" alt="Five confocal photoluminescence maps of hBN with bright spots marked" width={1800} height={1167}>
          Confocal PL maps recorded November 11–12, 2025, around the second irradiation trial. Color is PL intensity in counts;
          red × marks bright spots found by the clustering step of the analysis pipeline.
        </Figure>
      </Section>

      <Section
        id="simulation"
        n={3}
        title="Simulating the beam"
        aside={
          <>
            <p className="kicker mb-1.5">Assumptions</p>
            Displacement energies 19 eV (B) and 23 eV (N). SRIM target density 2.1 g/cm³. The 0.01 DPA overdamage threshold is a
            working heuristic, not a measured value.
          </>
        }
      >
        <div className="prose-notebook">
          <p>
            SRIM/TRIM follows individual ions through a target and tallies every displaced atom. I ran four campaigns on a 10 nm hBN
            film over SiO₂: a helium baseline (A), a helium energy sweep from 1 to 30 keV (B), a proton sweep (C), and a check on
            whether an ordinary RBS measurement at MeV energies creates unintended vacancies (D). A parser turns the raw SRIM tables
            into vacancy depth profiles and per-ion yields, then into fluence tables.
          </p>
          <p>
            For a boron vacancy yield <Tex>{String.raw`Y_B`}</Tex> (vacancies per incident ion inside the film) and boron areal
            density <Tex>{String.raw`N_B`}</Tex>, damage grows linearly with fluence <Tex>\Phi</Tex>:
          </p>
          <Tex display>{String.raw`\mathrm{DPA}(\Phi) = \frac{\Phi\, Y_B}{N_B}, \qquad N_B \approx 5.1\times10^{16}\ \mathrm{cm^{-2}}\ \text{(10 nm film)}.`}</Tex>
          <p>
            The useful results: low-energy helium does most of its damage inside the film. At 3 keV each ion leaves about 3.2 boron
            vacancies in 10 nm of hBN, while at 30 keV most of the cascade lands in the substrate and the yield falls to about 0.5
            (panel C). SRIM shows no substrate contamination of the film anywhere in the sweep (panel D). Film thickness matters: the same
            3 keV beam yields 15.1 vacancies per ion in a 50 nm film (panel E). At <Tex>{String.raw`10^{14}\ \mathrm{cm^{-2}}`}</Tex>,
            3 keV helium reaches about <Tex>{String.raw`6\times10^{-3}`}</Tex> DPA, just under the overdamage line (panel F).
          </p>
        </div>
        <Figure n={3} src="/figures/srim-campaigns.png" alt="Six-panel SRIM analysis: vacancy profiles, stopping distribution, vacancies per ion, contamination, film thickness comparison, DPA versus fluence" width={2200} height={1337}>
          SRIM campaign summary for He⁺ in 10 nm hBN on SiO₂. (A) Boron and nitrogen vacancy depth profiles. (B) Ion stopping
          distributions. (C) Boron vacancies per ion versus energy. (D) Substrate contamination. (E) 10 nm versus 50 nm films at 3
          keV. (F) DPA versus fluence.
        </Figure>
        <div className="prose-notebook">
          <p>
            Alongside SRIM I built a classifier that takes an ion, energy, and fluence and places the result in a damage regime:
            below threshold, sparse, dense, or overdamaged. It also returns the closest matches from a table of about 20 published
            irradiation experiments. An earlier version also estimated spin observables; the current one reports only the damage
            regime and the literature matches.
          </p>
        </div>
      </Section>

      <Section
        id="tooling"
        n={4}
        title="Characterization and tooling"
        aside={
          <>
            <p className="kicker mb-1.5">Pipeline</p>
            24 datasets from 3 instruments. 4 incompatible file formats behind one CLI. Per-sample analysis: 2 hours → 10 minutes.
          </>
        }
      >
        <div className="prose-notebook">
          <p>
            I wrote the analysis code for our PL data. The pipeline crops each map to its real scan area, fits and clusters bright
            spots, and compares conditions. It replaced a dozen one-off scripts, and every past analysis can now be rerun from raw
            data with one command. An early version distorted the data in a way that looked fine: I had tuned it to look right
            before I understood the physics well enough to judge it. The rebuilt version is the one I use now.
          </p>
          <p>
            For the July 2026 sample of 23 flakes, between 10 and 231 nm thick, I wrote two bench tools. One overlays PL maps on
            optical images and averages PL over hand-drawn flake outlines. The other reads NT-MDT <code>.mdt</code> AFM files
            directly, with no Gwyddion dependency, then levels them, measures each flake&apos;s height above the substrate, and
            computes ISO 25178 roughness. Both write to the same per-flake sheet.
          </p>
        </div>
        <div className="grid gap-x-6 sm:grid-cols-2">
          <Figure n={4} src="/figures/afm-flake.png" alt="AFM height map of an hBN flake with step edges and folds" width={900} height={750}>
            AFM height map of an exfoliated hBN flake (40 µm scan), read and leveled by the AFM tool. Terraces, folds, and residue
            are visible.
          </Figure>
          <Figure n={5} src="/figures/thickness-vs-color.png" alt="Scatter plot of flake optical hue against AFM thickness for 16 flakes" width={1275} height={900}>
            Optical hue versus AFM thickness for 16 flakes. Color is not monotonic in thickness, because thin-film interference on
            SiO₂/Si cycles through hues, so color alone cannot stand in for AFM.
          </Figure>
        </div>
      </Section>

      <Section id="odmr" n={5} title="ODMR: in progress">
        <div className="prose-notebook">
          <p>
            The test that matters is ODMR: a PL dip near 3.48 GHz that splits in a magnetic field is the signature of VB⁻ and
            nothing else. In July 2026 we swept 3.3–3.8 GHz on a roughly 50 nm flake using QICK-based microwave control. So far no
            resonance has risen above the noise. Getting one is the focus of the current semester.
          </p>
        </div>
      </Section>

      <Section id="outputs" n={6} title="Reports and mentoring">
        <ul className="border-t border-rule">
          {outputs.map((o) => (
            <li key={o.title} className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
              <span className="kicker pt-1.5">{o.kind}</span>
              <div>
                <p className="leading-snug font-medium">{o.title}</p>
                <p className="mt-1 text-[0.95rem] text-muted">
                  {o.venue} · {o.date}
                </p>
              </div>
            </li>
          ))}
          <li className="grid grid-cols-[4.75rem_minmax(0,1fr)] gap-x-4 border-b border-rule py-4 sm:grid-cols-[6rem_minmax(0,1fr)]">
            <span className="kicker pt-1.5">Mentor</span>
            <div>
              <p className="leading-snug font-medium">Aresty-funded undergraduate researcher</p>
              <p className="mt-1 text-[0.95rem] text-muted">
                Summer 2026 · onboarding onto the hBN project: ODMR, sample preparation, and SRIM
              </p>
            </div>
          </li>
        </ul>
        <p className="mt-4 text-[0.95rem] text-muted">Reports are internal to the group.</p>
      </Section>
    </>
  );
}
