/**
 * Experience data (vertical timeline) — taken from the CV "Experiences"
 * section, plus the certifications listed under "Training, Skills, & Tools".
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update roles, dates, descriptions and activities.
 * The CV lists the Telkom internship, so that entry comes straight from it.
 * The AirNav Indonesia internship (Sep 2026 – Mar 2027) was added on request
 * and is not in the CV yet — keep the CV in sync when it is updated.
 * Newest entries are listed first.
 *
 * `href` on a training activity points at the certificate ITSELF — a single
 * Drive document or a Dicoding certificate page, never the Drive folder.
 *
 * Tiga tautan dari CV tidak dipakai karena salah sasaran, sudah diganti dengan
 * berkas sertifikat yang benar dari folder Drive "Sertifikat_Tifani Yunitami"
 * (isi tiap berkas diperiksa satu per satu, bukan ditebak dari nama):
 *   - "Advanced Database Systems" menunjuk berkas sertifikat DQLab SQL & Python
 *     → diganti ke sertifikat "Sistem Basisdata Lanjut / Advanced Database Systems".
 *   - "Machine Learning & AI for Beginner" menunjuk FOLDER, bukan sertifikatnya.
 *   - "Data Formatting & Cleansing" menunjuk FOLDER yang sama.
 * "Belajar Dasar Pemrograman Web" tidak punya tautan di CV; dipakai berkas
 * "SERTIFIKAT DICODING WEB DASAR.pdf" dari Drive.
 * ---------------------------------------------------------------
 */

export type ExperienceActivity = {
  title: string;
  description: string;
  /**
   * Optional external link — for training entries, the certificate itself.
   * Rendered with an external-link icon so visitors know it is clickable.
   */
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
        href: "https://drive.google.com/file/d/1Rkisb9QEaJKQHqiabzlc1E-RQJ4qCsr1/view",
      },
      {
        title: "Belajar Dasar Visualisasi Data — Dicoding (2025)",
        description:
          "Data visualisation, data preparation, and data storytelling using Google Sheets.",
        href: "https://www.dicoding.com/certificates/JLX19R085P72",
      },
      {
        title:
          "Study Case Bootcamp Data Analyst with SQL & Python — DQLab (2024)",
        description:
          "Data analysis, SQL querying, Python programming, data processing, and visualisation.",
        href: "https://drive.google.com/file/d/1hkQ0mo0un4jyKUIo32L3RBy9Y1oc4mNI/view?usp=sharing",
      },
      {
        title:
          "Study Case Bootcamp Machine Learning & AI for Beginner — DQLab (2024)",
        description:
          "Machine learning fundamentals, data preparation, ML techniques, and practical AI applications.",
        href: "https://drive.google.com/file/d/158ktO9JvNI2uBS7Q1ejMmJklepW1YEmW/view",
      },
      {
        title: "Study Case Bootcamp Data Analyst with Excel — DQLab (2024)",
        description:
          "Data cleaning, analysis, visualisation, and reporting using Microsoft Excel.",
        href: "https://drive.google.com/file/d/1_RGUC8nqSNlbbcp93How_8xmjikIyQcC/view?usp=sharing",
      },
      {
        title: "Data Formatting & Cleansing Short Class — MySkill (2024)",
        description:
          "Data cleaning, formatting, transformation, and preparation for analysis using spreadsheets.",
        href: "https://drive.google.com/file/d/1GsGuF9G78IDSyeNfRAQW1mIWV-Uf1Oyx/view",
      },
      {
        title: "Memulai Pemrograman dengan Python — Dicoding (2024)",
        description:
          "Python fundamentals: data handling, control flow, OOP, testing, coding standards, and popular Python libraries.",
        href: "https://www.dicoding.com/certificates/KEXLY37N0ZG2",
      },
      {
        title:
          "Belajar Dasar Structured Query Language (SQL) — Dicoding (2024)",
        description:
          "Database fundamentals, DBMS, database structures, and basic SQL queries for data manipulation and retrieval.",
        href: "https://www.dicoding.com/certificates/53XEOVD59ZRN",
      },
      {
        title: "Belajar Dasar Pemrograman Web — Dicoding (2024)",
        description:
          "Web development fundamentals: HTML, CSS, responsive design, and Flexbox for building modern websites.",
        href: "https://drive.google.com/file/d/1UrEhX4MUWsRgmruHeipk5ukwTTfWVB5X/view",
      },
    ],
  },
];
