export const degree = {
  school: "Rutgers University–New Brunswick",
  location: "New Brunswick, NJ",
  period: "Sept 2023 – May 2027",
  degrees: ["B.S. Physics", "B.S. Computer Science", "Minor in Mathematics"],
};

export type CourseGroup = {
  field: "Physics" | "Computer Science" | "Mathematics";
  courses: string[];
};

// From the academic and general résumés.
export const coursework: CourseGroup[] = [
  {
    field: "Physics",
    courses: [
      "Advanced General Physics I & II",
      "Modern Physics",
      "Modern Optics",
      "Thermal Physics",
      "Modern Instrumentation",
      "Computer-Based Experimentation",
      "Research in Physics",
    ],
  },
  {
    field: "Computer Science",
    courses: [
      "Introduction to Computer Science",
      "Data Structures",
      "Discrete Structures I & II",
      "Introduction to Artificial Intelligence",
    ],
  },
  {
    field: "Mathematics",
    courses: [
      "Calculus I & II",
      "Multivariable Calculus",
      "Linear Algebra",
      "Differential Equations for Engineering & Physics",
      "Advanced Calculus for Engineering (PDEs)",
      "Linear Optimization",
    ],
  },
];

export type SkillCategory = {
  title: string;
  items: string[];
};

export const skills: SkillCategory[] = [
  {
    title: "Experimental",
    items: [
      "Confocal photoluminescence microscopy",
      "ODMR",
      "Grating spectrometer",
      "Nanopositioning stages",
      "Helium-ion irradiation",
      "PC/PVA dry-transfer stacking",
      "AFM analysis",
      "Op-amp instrumentation",
      "Thermistor calibration",
      "DAC/ADC conversion",
    ],
  },
  {
    title: "Simulation & analysis",
    items: [
      "SRIM/TRIM Monte Carlo",
      "Curve fitting (ODR, weighted LS)",
      "Fourier analysis",
      "Signal-to-noise analysis",
      "NEGF transport (DeePTB)",
      "MATLAB",
      "LabVIEW",
      "GPIB acquisition",
      "LaTeX",
    ],
  },
  {
    title: "Languages",
    items: ["Python", "C++", "Java", "TypeScript", "JavaScript", "Go", "SQL", "Ruby"],
  },
  {
    title: "Libraries & frameworks",
    items: [
      "NumPy",
      "SciPy",
      "pandas",
      "Matplotlib",
      "PyTorch",
      "TensorFlow",
      "OpenCV",
      "React",
      "Next.js",
      "FastAPI",
      "Streamlit",
    ],
  },
  {
    title: "Infrastructure",
    items: ["AWS (EC2, S3, Lambda)", "Docker", "PostgreSQL", "Redis", "GitHub Actions", "Jenkins", "Linux", "Git"],
  },
];
