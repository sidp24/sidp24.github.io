export const projectAreas = ["Physics", "Software", "Data & Quant", "Robotics", "Hackathons"] as const;
export type ProjectArea = (typeof projectAreas)[number];

export type Project = {
  slug: string;
  title: string;
  year?: string;
  summary: string;
  areas: ProjectArea[];
  tech: string[];
  badge?: string;
  short?: string;
  links: { live?: string; repo?: string; writeup?: string };
  featured?: boolean;
  archive?: boolean;
};

const gh = (repo: string) => `https://github.com/sidp24/${repo}`;

export const projects: Project[] = [
  // Physics
  {
    slug: "pl-pipeline",
    title: "hBN Photoluminescence Pipeline",
    year: "2025–26",
    summary:
      "Processes confocal PL maps of hBN before and after irradiation: crops to the real scan area, fits and clusters bright spots, and compares conditions across 24 datasets from 3 instruments. An early version quietly distorted the data because I had tuned it to look right before I understood the physics well enough to judge it. The rebuild is what the lab uses now.",
    areas: ["Physics"],
    tech: ["Python", "NumPy", "SciPy", "pandas", "Matplotlib"],
    links: { writeup: "/research/#irradiation" },
    short: "PL-map analysis for irradiated hBN: 24 datasets, 3 instruments, 2 h → 10 min per sample.",
    featured: true,
  },
  {
    slug: "srim-campaigns",
    title: "SRIM Irradiation Planner",
    year: "2026",
    summary:
      "Parses SRIM/TRIM output for He⁺ and H⁺ ions in thin hBN on SiO₂: boron and nitrogen vacancy depth profiles, vacancies per ion, substrate contamination, and displacements per atom versus fluence. The output is a table of fluences that hit a target VB⁻ density without overdamaging the film.",
    areas: ["Physics"],
    tech: ["Python", "SRIM/TRIM", "NumPy", "pandas"],
    links: { writeup: "/research/#simulation" },
  },
  {
    slug: "defect-regime",
    title: "Irradiation Regime Classifier",
    year: "2026",
    summary:
      "Given an ion, energy, and fluence, labels the expected damage regime in hBN (below threshold, sparse, dense, overdamaged) and returns the closest experiments from a hand-built table of about 20 published irradiation studies.",
    areas: ["Physics"],
    tech: ["Python", "Streamlit", "pytest"],
    links: { writeup: "/research/#simulation" },
  },
  {
    slug: "flake-tools",
    title: "PL & AFM Flake Tools",
    year: "2026",
    summary:
      "Two desktop tools for the bench. One overlays PL maps on optical images and computes per-flake PL from hand-drawn regions. The other reads NT-MDT .mdt AFM files directly (no Gwyddion), levels them, measures flake thickness, and computes ISO 25178 roughness. Both feed one per-flake spreadsheet.",
    areas: ["Physics"],
    tech: ["Python", "Tkinter", "NumPy", "Matplotlib"],
    links: { writeup: "/research/#tooling" },
  },
  {
    slug: "negf-repro",
    title: "Reproducing ML Quantum Transport",
    year: "2026",
    summary:
      "An independent check of DeePTB-NEGF (arXiv:2512.11291) on a CPU-only machine. Graphene transmission matched the DFT reference to 0.26% in integrated transmission; a single nitrogen vacancy in hBN produced plausible-looking output with no warning, outside anything the model was validated on.",
    areas: ["Physics"],
    tech: ["Python", "PyTorch", "DeePTB", "ASE", "pytest"],
    links: { writeup: "/research/#side-study" },
  },

  // Data & quant
  {
    slug: "yquantum-qat",
    title: "Quantum Features for Market Prediction",
    year: "2026",
    badge: "YQuantum 2026 · AWS × State Street",
    summary:
      "Team QAT's entry: does adding quantum-derived features (IQP encodings, quantum kernels) improve return prediction? I led the classical pipeline: 39 engineered features, Ridge/Lasso/gradient boosting baselines, then fusing classical and quantum signals, which moved MSE from 4.55 to 2.69 and IC from 0.932 to 0.961.",
    areas: ["Data & Quant", "Hackathons"],
    tech: ["Python", "scikit-learn", "Qiskit", "Amazon Braket", "Next.js"],
    links: { live: "https://qat-state-street.vercel.app", repo: gh("QAT---AWS-x-State-Street-Challenge") },
    short: "Classical + quantum-kernel features for return prediction; MSE 4.55 → 2.69.",
    featured: true,
  },
  {
    slug: "stat-arb-simulator",
    title: "Statistical Arbitrage Simulator",
    year: "2025",
    summary:
      "A pairs-trading backtester written to learn the mechanics firsthand. Finds cointegrated pairs, generates z-score signals, and sweeps 50+ configurations in parallel with transaction costs and walk-forward optimization, reporting PnL, Sharpe, and max drawdown.",
    areas: ["Data & Quant"],
    tech: ["Python", "pandas", "statsmodels", "Streamlit"],
    links: { live: "https://statarbitsim.streamlit.app/", repo: gh("Statistical-Arbitrage-Simulator") },
    short: "Cointegration pairs-trading backtester sweeping 50+ configurations.",
    featured: true,
  },
  {
    slug: "quantlab",
    title: "QuantLab",
    year: "2025–26",
    summary:
      "Options pricing with full Greeks, portfolio analysis, and volatility forecasting in one Streamlit app, built for working through the math rather than trading.",
    areas: ["Data & Quant"],
    tech: ["Python", "NumPy", "SciPy", "Streamlit"],
    links: { repo: gh("QuantLab") },
  },
  {
    slug: "courtlab",
    title: "CourtLab",
    year: "2024–26",
    summary:
      "NBA analytics over 1.09M shot locations and 87.5k five-man lineups across five seasons: shot-quality metrics, PCA player embeddings clustered into roles, and a gradient-boosted lineup model (R² = 0.71).",
    areas: ["Data & Quant"],
    tech: ["Python", "Flask", "scikit-learn", "SQLite"],
    links: { live: "https://courtlab.onrender.com/", repo: gh("Courtlab") },
  },
  {
    slug: "hacktheknight",
    title: "Exchange Trading Bots",
    year: "2026",
    badge: "HackTheKnight 2026",
    summary:
      "Bots for a simulated exchange in a team trading competition: an Avellaneda–Stoikov market maker, mean-reversion and trend strategies, and a prediction-market bot, plus a backtester to compare them.",
    areas: ["Data & Quant", "Hackathons"],
    tech: ["Python"],
    links: { repo: gh("Team1HackTheKnight") },
  },

  // Software
  {
    slug: "airnote",
    title: "AirNote",
    year: "2025",
    summary:
      "An AR whiteboard: notes anchored to real surfaces and shared live. Keeping the board stable while the camera moves was the core problem; it took several rewrites of the homography and optical-flow tracking before it held up outside controlled conditions. FastAPI services sync over WebSockets, and a Gemini layer answers questions about the board.",
    areas: ["Software"],
    tech: ["Python", "FastAPI", "OpenCV", "WebSocket", "Firebase"],
    links: { repo: gh("AirNote") },
    short: "AR whiteboard anchored to real surfaces with homography and optical-flow tracking.",
    featured: true,
  },
  {
    slug: "myndful",
    title: "Myndful",
    year: "2022–25",
    badge: "Congressional App Challenge winner",
    summary:
      "A mental-health chatbot for adolescents, serving 6,000+ monthly users across five schools. I co-founded it, trained the TensorFlow model, and built the React front end. Most of the work went into making responses useful rather than merely on-topic.",
    areas: ["Software"],
    tech: ["TensorFlow", "Python", "React", "FastAPI", "AWS"],
    links: { live: "https://myndful.vercel.app/", repo: gh("myndful") },
  },
  {
    slug: "txn-ledger",
    title: "txn-ledger",
    year: "2026",
    summary:
      "A double-entry payment ledger in Go: balanced transfers, idempotent writes, and balances that stay correct under concurrent transfers, backed by PostgreSQL with CI.",
    areas: ["Software"],
    tech: ["Go", "PostgreSQL", "GitHub Actions"],
    links: { repo: gh("txn-ledger") },
  },
  {
    slug: "onshape-mcp",
    title: "Onshape MCP Server",
    year: "2026",
    summary:
      "Connects Claude to the Onshape CAD API so a model can read documents, parts, and assemblies. The goal is generating VEX parts from a plain-language description.",
    areas: ["Software", "Robotics"],
    tech: ["Python", "MCP", "Onshape API", "Docker"],
    links: { repo: gh("OnshapeMCP") },
  },
  {
    slug: "fuel",
    title: "FUEL",
    year: "2026",
    summary:
      "A camera-first calorie tracker that installs to a phone as a PWA. Reads nutrition labels on-device, searches 7,277 foods offline, and syncs through Supabase.",
    areas: ["Software"],
    tech: ["TypeScript", "React", "Vite", "Supabase"],
    links: { repo: gh("CalorieTracker") },
  },

  // Robotics
  {
    slug: "aether",
    title: "Aether",
    year: "2026",
    summary:
      "SCAR's VEX U framework: typed units and geometry, a sensor layer, localization, a command scheduler, and a drivetrain API on top of EZ-Template. 84 tests pass on a PC; it hasn't driven a robot yet.",
    areas: ["Robotics"],
    tech: ["C++17", "PROS"],
    links: { repo: gh("SCARLibrary") },
  },
  {
    slug: "scar-pm",
    title: "SCAR Task Manager",
    year: "2026",
    summary:
      "Task tracking that lives where the team already talks: a Discord bot for /task commands and reminders, and a Next.js board, both on one Postgres database.",
    areas: ["Robotics", "Software"],
    tech: ["Python", "discord.py", "Next.js", "PostgreSQL"],
    links: { repo: gh("PM") },
  },
  {
    slug: "vex-24in",
    title: "VEX U 24-inch Robot",
    year: "2024–25",
    summary:
      "Competition code for SCAR's 24-inch robot in the High Stakes season: PID motion control and X-drive holonomic kinematics in PROS, with an autonomous routine scoring 110 points and path tracking within 8 cm.",
    areas: ["Robotics"],
    tech: ["C++", "PROS"],
    links: { repo: gh("VEX25-SCAR-24in") },
  },

  // Hackathons
  {
    slug: "holobrain",
    title: "HoloBrain",
    year: "2024",
    badge: "HackRU 2024 · 1st place",
    summary:
      "A gesture-controlled AR neuroanatomy viewer. MediaPipe and OpenCV hand tracking drive a 3D brain model in Unity, built in 24 hours.",
    areas: ["Hackathons", "Software"],
    tech: ["Unity", "C#", "MediaPipe", "OpenCV"],
    links: { repo: gh("HackRU") },
    short: "Gesture-controlled AR neuroanatomy viewer. First place at HackRU 2024.",
    featured: true,
  },

  // Archive
  {
    slug: "data-viz-dashboard",
    title: "Data Visualization Dashboard",
    summary: "Upload a CSV and explore it through interactive scatter and bar charts with configurable labels and styles.",
    areas: ["Software"],
    tech: ["Python", "Dash", "Plotly"],
    links: { repo: gh("Data-Visualization-Dashboard") },
    archive: true,
  },
  {
    slug: "elevator-code",
    title: "ElevatorCode (FRC)",
    year: "2021–22",
    summary: "WPILib control software for an FRC elevator subsystem.",
    areas: ["Robotics"],
    tech: ["Java", "WPILib"],
    links: { repo: gh("ElevatorCode") },
    archive: true,
  },
  {
    slug: "bombot2022",
    title: "BomBot2022 (FRC)",
    year: "2022",
    summary: "Robot code for the 2022 FRC season.",
    areas: ["Robotics"],
    tech: ["Java", "WPILib"],
    links: { repo: gh("BomBot2022") },
    archive: true,
  },
  {
    slug: "dummyboard",
    title: "Dummyboard (FRC)",
    year: "2022",
    summary: "A WPILib test harness for motors and controllers, used to onboard new teammates during build season.",
    areas: ["Robotics"],
    tech: ["Java", "WPILib"],
    links: { repo: gh("dummyboard2022") },
    archive: true,
  },
  {
    slug: "pidtest",
    title: "PIDTest (FRC)",
    year: "2023",
    summary: "A minimal WPILib project for tuning PID loops on real hardware.",
    areas: ["Robotics"],
    tech: ["Java", "WPILib"],
    links: { repo: gh("PIDTest") },
    archive: true,
  },
];
