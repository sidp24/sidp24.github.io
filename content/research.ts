export const researchPosition = {
  lab: "Q-Sim Laboratory",
  institution: "Rutgers University",
  advisor: "Prof. Shaowen Chen",
  period: "Sept 2025 – Present",
};

export const interests =
  "Point defects in wide-bandgap and two-dimensional materials, and engineering optically addressable spin defects for quantum sensing and quantum information.";

export type Output = {
  kind: "Report" | "Talk";
  title: string;
  venue: string;
  date: string;
};

// Internal lab outputs. Titles only; the documents themselves stay with the group.
export const outputs: Output[] = [
  {
    kind: "Talk",
    title: "VB⁻ Defects in hBN: Properties, Physics, and Predictive Simulation",
    venue: "Q-Sim Lab, Rutgers",
    date: "2026",
  },
  {
    kind: "Talk",
    title: "Predictive Simulation of hBN Quantum Defects: A Four-Layer Physics Pipeline for Defect Engineering",
    venue: "Q-Sim Lab, Rutgers",
    date: "2026",
  },
  {
    kind: "Report",
    title: "Defect Generation in Hexagonal Boron Nitride (PL Scan 2, revised figures)",
    venue: "Q-Sim Lab, Rutgers",
    date: "Jan 2026",
  },
  {
    kind: "Report",
    title: "Defect Generation in Hexagonal Boron Nitride (second irradiation trial)",
    venue: "Q-Sim Lab, Rutgers",
    date: "Nov 2025",
  },
];

export const timeline = [
  { date: "Oct 2025", event: "Baseline PL maps of exfoliated hBN before irradiation" },
  { date: "Oct–Nov 2025", event: "First irradiation (30 min, 2 MeV) and re-scan" },
  { date: "Nov 2025", event: "Second irradiation (11 h) and re-scan" },
  { date: "Apr–May 2026", event: "Literature-calibrated defect simulator; lab talks" },
  { date: "May–Jul 2026", event: "SRIM campaigns A–D" },
  { date: "Jul 2026", event: "New flake sample: PL, AFM thickness, first ODMR attempts" },
  { date: "Fall 2026", event: "ODMR and optics, ongoing" },
];
