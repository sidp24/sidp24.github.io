export type Entry = {
  title: string;
  org: string;
  year: string;
  description?: string;
  link?: string;
};

export const robotics = {
  team: "SCAR Robotics",
  org: "Rutgers IEEE · VEX U",
  role: "President & Build Lead",
  period: "Jan 2025 – Present",
  bullets: [
    "Lead a 150+ person team across mechanical, electrical, and software subteams through the full build-to-competition cycle each season.",
    "Own the roster, a $25,000+ budget, sponsorship outreach, funding proposals to university departments, and travel grants for Worlds.",
    "Implemented PID motion control and X-drive holonomic kinematics in PROS (C++), raising the autonomous routine to 110 points with path tracking inside 8 cm.",
    "Train incoming members in the team's build process and code, and started Aether, a shared C++ framework for future seasons.",
  ],
  seasons: [
    { season: "2025–26", game: "Push Back", result: "Worlds rank 17 (Top 20)", role: "President, co-captain" },
    { season: "2024–25", game: "High Stakes", result: "Worlds Top 25", role: "Lead" },
  ],
  sponsors: ["Whimsy Tech", "Onshape", "JLC", "Rutgers IDEA"],
  program:
    "Across the program's history (as SKAR, RUSK, and SCAR since 2016): two tournament championships, two Excellence Awards, three Design Awards, and a Worlds qualification every season.",
};

export const hackathons: Entry[] = [
  {
    title: "First Place: HoloBrain",
    org: "HackRU",
    year: "2024",
    description: "A gesture-controlled AR neuroanatomy viewer built in 24 hours.",
    link: "https://github.com/sidp24/HackRU",
  },
  {
    title: "AWS × State Street Challenge (Team QAT)",
    org: "YQuantum",
    year: "2026",
    description: "Quantum feature augmentation for market prediction; I led the classical modeling pipeline.",
    link: "https://qat-state-street.vercel.app",
  },
  {
    title: "Trading bot competition",
    org: "HackTheKnight",
    year: "2026",
    description: "Market-making, mean-reversion, and prediction-market bots on a simulated exchange.",
    link: "https://github.com/sidp24/Team1HackTheKnight",
  },
  {
    title: "Winning teams",
    org: "MontyHack · RidgeHacks",
    year: "Earlier",
  },
];

export const speaking: Entry[] = [
  { title: "Guest Speaker", org: "IEEE Rutgers Annual Banquet", year: "2026" },
  { title: "Guest Speaker", org: "Rutgers IDEA Program for Prospective ECE Students", year: "2026" },
  {
    title: "Keynote Speaker",
    org: "NJASCD Conference",
    year: "2023",
    description: "Applying AI and conversational chatbots to support educators, drawn from building Myndful.",
  },
  {
    title: "Keynote Speaker",
    org: "edWeb",
    year: "2023",
    description: "How Myndful addresses gaps in school mental-health resources, and designing chat interfaces students will actually use.",
  },
];

export const mentoring: Entry[] = [
  {
    title: "Research mentor",
    org: "Q-Sim Laboratory (Aresty-funded undergraduate)",
    year: "2026",
    description: "Onboarded a new researcher onto the hBN project: ODMR, sample preparation, SRIM, and reviewing the analysis.",
  },
  { title: "Camp Lead", org: "iCode Bridgewater", year: "2023", description: "Game-development and coding camps." },
  { title: "Instructor", org: "Code Ninjas", year: "2021–22", description: "JavaScript, Python, Lua, Java, and C#." },
];

export const earlier: Entry[] = [
  {
    title: "President",
    org: "FRC Team 7587",
    year: "2022–23",
    description: "Team strategy, fundraising, and outreach, overseeing build, programming, and competition prep.",
  },
  {
    title: "Programming Lead",
    org: "FRC Team 7586",
    year: "2021–22",
    description: "Autonomous and driver-assist software in Java/WPILib: vision processing and control-loop tuning.",
  },
  {
    title: "Congressional App Challenge winner (NJ-06)",
    org: "U.S. House of Representatives",
    year: "2022",
    description: "For Myndful, an AI mental-health chatbot later used by 6,000+ students.",
    link: "https://www.congressionalappchallenge.us/",
  },
];

// Short list used on the home page and CV.
export const honors: Entry[] = [
  { title: "VEX U World Championship, Top 20 globally", org: "SCAR Robotics", year: "2026" },
  { title: "VEX U World Championship, Top 25 globally", org: "SCAR Robotics", year: "2025" },
  { title: "HackRU, First Place", org: "HoloBrain", year: "2024" },
  { title: "Keynote Speaker", org: "NJASCD Conference · edWeb", year: "2023" },
  { title: "Congressional App Challenge winner", org: "NJ-06, Myndful", year: "2022" },
];
