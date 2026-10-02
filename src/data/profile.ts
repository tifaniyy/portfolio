/**
 * Central profile data.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to replace personal information.
 * Content below mirrors `public/cv.pdf` (Tifani Yunitami — resume).
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
    "I am a fresh graduate with a Bachelor's degree in Informatics from Gunadarma University, with an interest in data processing and analysis.",
    "During my studies, I learnt and used Python and SQL to process and analyse data, utilising libraries such as Pandas and NumPy. I also have experience in creating data visualisations and applying machine learning algorithms, particularly K-Means clustering, through various academic and personal projects.",
    "I am keen to continue learning and developing my skills in the field of data, and to gain experience in applying these skills in the workplace.",
  ],

  email: "tifaniyunitami1@gmail.com",
  linkedin: "https://www.linkedin.com/in/tifaniyunitami/",
  github: "https://github.com/tifaniyy",
  location: "Kota Tangerang, Indonesia",

  /** Replace public/cv.pdf whenever the CV is updated (keep the file name). */
  cvUrl: "/cv.pdf",
};

export const education = [
  {
    degree: "Bachelor of Informatics",
    school: "Gunadarma University",
    location: "Jakarta, Indonesia",
    period: "Sep 2022 – Aug 2026",
    level: "S1 Informatika",
    /** GPA as stated on the CV. */
    grade: "3.86 / 4.00",
    status: "Fresh Graduate",
    description:
      "Actively involved in major student organizations, developing leadership and teamwork skills. Contributed to several application and website development projects.",
    highlights: [
      "GPA 3.86 / 4.00",
      "Data Analysis & Data Processing",
      "Database (SQL) & Basis Data",
      "Web Development & Machine Learning",
    ],
  },
];

/**
 * About-section statistics.
 * Counts below come from the CV — 6 projects and 1 internship (Telkom) are
 * listed there. The AirNav Indonesia internship was added on request and is
 * not in the CV yet, so that card now names both places.
 */
export const stats = [
  {
    icon: "GraduationCap",
    label: "Bachelor of Informatics",
    description: "Gunadarma University · GPA 3.86 / 4.00",
  },
  {
    icon: "LineChart",
    label: "Data & Analysis Projects",
    description: "UMP dashboard, K-Means clustering, Streamlit",
  },
  {
    icon: "Code2",
    label: "Web Design & Development",
    description: "Flask, PHP, Bootstrap, Figma, UI/UX",
  },
  {
    icon: "Briefcase",
    label: "Internship Experience",
    description:
      "AirNav Indonesia (Information Technology) · PT Telekomunikasi Indonesia (Telkom Witel)",
  },
] as const;

export const interests = [
  "Data Analysis",
  "Data Processing",
  "Python",
  "SQL",
  "Data Visualization",
  "Machine Learning",
  "Web Development",
  "UI/UX Design",
];

/** Organizational experience — shown inside the About section. */
export const organizations = [
  {
    organization: "Himpunan Mahasiswa Teknik Informatika Universitas Gunadarma",
    role: "Member of Public Relations",
    location: "Depok, Indonesia",
    period: "Sep 2023 – Jul 2024",
    points: [
      "Social media admin responsible for creating, uploading, and managing content posting schedules.",
      "Building interactions with the public.",
      "Conveying the aspirations of the major community.",
    ],
  },
  {
    organization: "PEMIRA BEM FTI",
    role: "Head of Public Relations Division",
    location: "Depok, Indonesia",
    period: "Aug 2023 – Sep 2023",
    points: [
      "Developing a communication strategy.",
      "Managing media and information.",
    ],
  },
];

/** Extra soft skills listed on the CV. */
export const softSkills = [
  "Responsibility",
  "Communication",
  "Team Work",
  "Problem Solving",
  "Discipline",
];

export const navLinks = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  /*
   * "Journals" is deliberately NOT in this list: it is a real route
   * (/journals), and Navbar renders it as the top-right action button.
   * Listing it here as well would show it twice in the navbar.
   */
  { label: "Contact", href: "#contact" },
] as const;
