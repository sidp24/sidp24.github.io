export type ExperienceEntry = {
  role: string;
  org: string;
  detail?: string;
  period: string;
  location?: string;
  kind: "Research" | "Industry" | "Startup" | "Teaching";
  bullets: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Undergraduate Researcher",
    org: "Q-Sim Laboratory, Rutgers University",
    detail: "Advisor: Prof. Shaowen Chen",
    period: "Sept 2025 – Present",
    location: "Piscataway, NJ",
    kind: "Research",
    bullets: [
      "Study VB⁻ spin defects in hexagonal boron nitride created by helium-ion irradiation, correlating dose with defect yield and optical response.",
      "Run SRIM/TRIM Monte Carlo campaigns (85 parameterized configurations) and turn the output into fluence-to-vacancy tables used to pick irradiation conditions.",
      "Prepare samples by exfoliation and PC/PVA dry-transfer stacking; characterize them with confocal photoluminescence, ODMR, and AFM.",
      "Built Python pipelines covering 24 datasets from 3 instruments, cutting per-sample analysis from 2 hours to 10 minutes and retiring 12+ one-off scripts.",
      "Mentored an Aresty-funded undergraduate through ODMR, sample preparation, and SRIM simulation.",
    ],
  },
  {
    role: "Software Engineering Intern",
    org: "Iconectiv (Ericsson)",
    period: "June 2025 – Aug 2025",
    location: "Bridgewater, NJ",
    kind: "Industry",
    bullets: [
      "Built Python microservices streaming telemetry from 8 internal systems into real-time dashboards, cutting monitoring pipeline runtime by 20%.",
      "Integrated Tenable, GitHub, and lifecycle-management APIs into one compliance pipeline surfacing CVE, ownership, and patch data for 5+ teams.",
      "Hardened Jenkins and AWS CodeBuild CI/CD across 15 repositories, reducing build failures by 30%.",
      "Developed a searchable VM inventory covering 100+ assets across 6 environments.",
    ],
  },
  {
    role: "Software Development Intern (DevOps)",
    org: "Iconectiv (Ericsson)",
    period: "May 2024 – Aug 2024",
    location: "Bridgewater, NJ",
    kind: "Industry",
    bullets: [
      "Built a monitoring platform mapping 200+ enterprise applications and their dependencies, replacing a recurring manual audit.",
      "Wrote Python modules for update orchestration and security patching, compressing patch cycles from weeks to hours.",
      "Shipped a Ruby on Rails + AngularJS dashboard suite with real-time alerts and system-health views.",
      "Created a metadata engine aggregating 1,000+ GitHub repositories into 100+ internal dashboards.",
    ],
  },
  {
    role: "Co-founder & Lead Engineer",
    org: "Myndful",
    period: "Aug 2022 – 2025",
    kind: "Startup",
    bullets: [
      "Co-founded an AI mental-health chatbot for students, serving 6,000+ monthly users across 5+ schools.",
      "Built the stack on React, FastAPI, TensorFlow, and AWS EC2, and led rollouts across multiple districts.",
    ],
  },
  {
    role: "Camp Lead",
    org: "iCode Bridgewater",
    period: "May 2023 – Aug 2023",
    kind: "Teaching",
    bullets: ["Ran game-development and coding camps, guiding students through hands-on software projects."],
  },
  {
    role: "Instructor",
    org: "Code Ninjas",
    period: "Aug 2021 – 2022",
    location: "Piscataway, NJ",
    kind: "Teaching",
    bullets: ["Taught JavaScript, Python, Lua, Java, and C# to students of all backgrounds."],
  },
];
