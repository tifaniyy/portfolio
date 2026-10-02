/**
 * Experience data (vertical timeline) — taken from the CV "Experiences"
 * section, plus the certifications listed under "Training, Skills, & Tools".
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update roles, dates, descriptions and activities.
 * The CV lists the Telkom internship, so that entry comes straight from it.
 * The AirNav Indonesia internship (Sep 2026 – Mar 2027) was added on request
 * and is not in the CV yet — keep the CV in sync when it is updated.
 * Newest entries are listed first.
 * ---------------------------------------------------------------
 */

export type ExperienceActivity = {
  title: string;
  description: string;
  /** Optional external link (repository, article, etc.). */
  href?: string;
};

export type ExperienceItem = {
  company: string;
  fullCompany?: string;
  role: string;
  period: string;
  /** Short tag shown next to the period, e.g. "Internship". */
  type: string;
  location: string;
  description: string;
  activities: ExperienceActivity[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "AirNav Indonesia",
    fullCompany: "AirNav Indonesia (Perum LPPNPI)",
    role: "Internship — Information Technology Division",
    period: "Sep 2026 – Mar 2027",
    type: "Internship",
    location: "Kota Tangerang, Indonesia",
    description:
      "Internship at AirNav Indonesia, the state-owned air navigation service provider, in the Information Technology division.",
    activities: [],
  },
  {
    company: "PT Telekomunikasi Indonesia (Persero) Tbk",
    fullCompany: "PT Telekomunikasi Indonesia (Persero) Tbk — Telkom Witel",
    role: "Internship - Digital Connectivity Services Division",
    period: "May 2025 – Aug 2025",
    type: "Internship",
    location: "Jakarta Pusat, Indonesia",
    description:
      "Internship at Telkom Witel Jakarta Pusat covering network technology research, IoT exploration, and internal website UI/UX design.",
    activities: [
      {
        title: "Network Technology Research — Wi-Fi 7",
        description:
          "Reviewing and compiling analytical material on the potential application of Wi-Fi 7 technology in an enterprise environment.",
      },
      {
        title: "IoT Exploration",
        description:
          "Studying the architecture of the Internet of Things (IoT) and the operation of the Antares platform.",
      },
      {
        title: "Website UI/UX Design",
        description:
          "Designing the interface for an internal website, with a focus on the clarity of the information structure and ease of user navigation (usability).",
      },
    ],
  },
  {
    company: "Self-directed learning",
    fullCompany: "Bootcamps & certified courses",
    role: "Data, Web & Machine Learning Training",
    period: "2024 – 2026",
    type: "Training",
    location: "Online (Dicoding, DQLab, MySkill)",
    description:
      "Completed structured training in databases, data visualisation, Python, SQL, Excel, web development, and machine learning fundamentals.",
    activities: [
      {
        title: "Advanced Database Systems (2026)",
        description:
          "Relational database design to mapping relational, advanced SQL, data integration, and database monitoring.",
      },
      {
        title: "Belajar Dasar Visualisasi Data — Dicoding (2025)",
        description:
          "Data visualisation, data preparation, and data storytelling using Google Sheets.",
      },
      {
        title:
          "Study Case Bootcamp Data Analyst with SQL & Python — DQLab (2024)",
        description:
          "Data analysis, SQL querying, Python programming, data processing, and visualisation.",
      },
      {
        title:
          "Study Case Bootcamp Machine Learning & AI for Beginner — DQLab (2024)",
        description:
          "Machine learning fundamentals, data preparation, ML techniques, and practical AI applications.",
      },
      {
        title: "Study Case Bootcamp Data Analyst with Excel — DQLab (2024)",
        description:
          "Data cleaning, analysis, visualisation, and reporting using Microsoft Excel.",
      },
      {
        title: "Data Formatting & Cleansing Short Class — MySkill (2024)",
        description:
          "Data cleaning, formatting, transformation, and preparation for analysis using spreadsheets.",
      },
      {
        title: "Memulai Pemrograman dengan Python — Dicoding (2024)",
        description:
          "Python fundamentals: data handling, control flow, OOP, testing, coding standards, and popular Python libraries.",
      },
      {
        title:
          "Belajar Dasar Structured Query Language (SQL) — Dicoding (2024)",
        description:
          "Database fundamentals, DBMS, database structures, and basic SQL queries for data manipulation and retrieval.",
      },
      {
        title: "Belajar Dasar Pemrograman Web — Dicoding (2024)",
        description:
          "Web development fundamentals: HTML, CSS, responsive design, and Flexbox for building modern websites.",
      },
    ],
  },
];
