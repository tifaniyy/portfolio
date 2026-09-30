/**
 * Central profile data.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to replace placeholder personal information.
 * Every value marked "TODO" is a placeholder — replace it with your own.
 * ---------------------------------------------------------------
 */

export const profile = {
  name: "Tifani Yunitami",
  shortName: "Tifani",
  title: "Informatics Graduate | Data Analyst | Web Developer",
  headline: "Hi, I'm Tifani.",
  subheadline: "An Informatics Graduate passionate about Data & Technology.",
  summary:
    "Fresh graduate in Informatics with an interest in data analysis, data processing, visualization, and web development.",
  about: [
    "Saya adalah fresh graduate S1 Informatika Universitas Gunadarma dengan minat pada data processing, data analysis, visualization, dan web development.",
    "Saya memiliki pengalaman mengembangkan project berbasis Python, SQL, data visualization, machine learning, serta pengembangan aplikasi web. Fokus saya adalah mengubah data mentah menjadi informasi yang rapi, mudah dibaca, dan bisa dipakai untuk mengambil keputusan.",
  ],

  /** TODO: replace with your real email address (placeholder, not a real account). */
  email: "your.email@example.com",
  /** TODO: replace with your real LinkedIn profile URL (placeholder, not a real profile). */
  linkedin: "https://www.linkedin.com/in/your-linkedin-profile",
  /** TODO: replace with your real GitHub URL if it changes. */
  github: "https://github.com/tifaniyy",

  /** TODO: replace /public/cv.pdf with your real CV, keep the same file name. */
  cvUrl: "/cv.pdf",
  location: "Indonesia",
};

export const education = [
  {
    degree: "Bachelor's Degree in Informatics",
    school: "Universitas Gunadarma",
    level: "S1 Informatika",
    status: "Fresh Graduate",
    description:
      "Menempuh studi S1 Informatika dengan fokus pada pemrograman, basis data, analisis data, visualisasi data, machine learning dasar, serta pengembangan aplikasi web.",
    highlights: [
      "Data Analysis & Data Processing",
      "Database (SQL) & Basis Data",
      "Web Development",
      "Machine Learning Dasar",
    ],
  },
];

/**
 * About-section statistics.
 * No numbers are invented here: each card shows a label plus a short,
 * verifiable descriptor. Add a value only if you have the real figure
 * (e.g. value: "4" for four data projects) — otherwise keep it text-only.
 */
export const stats = [
  {
    icon: "GraduationCap",
    label: "Informatics Graduate",
    description: "S1 Informatika, Universitas Gunadarma",
  },
  {
    icon: "LineChart",
    label: "Data Projects",
    description: "Python, SQL, visualisasi & clustering",
  },
  {
    icon: "Code2",
    label: "Web Projects",
    description: "Flask, Next.js, Tailwind CSS",
  },
  {
    icon: "Briefcase",
    label: "Internship Experience",
    description: "PT Telkom Indonesia — Digital Connectivity Service",
  },
] as const;

export const interests = [
  "Data Analysis",
  "Data Processing",
  "Python",
  "SQL",
  "Data Visualization",
  "Web Development",
  "UI/UX",
  "Machine Learning Dasar",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
] as const;
