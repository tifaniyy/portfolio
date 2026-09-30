/**
 * Experience data (vertical timeline).
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update roles, dates, descriptions and activities.
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
  /** Short tag shown next to the period, e.g. "Present" or "Internship". */
  type: string;
  location: string;
  description: string;
  activities: ExperienceActivity[];
};

export const experiences: ExperienceItem[] = [
  {
    company: "AirNav Indonesia",
    fullCompany: "Perum LPPNPI (AirNav Indonesia)",
    role: "Staf Administrasi Teknologi Informasi dan Operasional",
    period: "2026 – Present",
    type: "Present",
    location: "Indonesia",
    description:
      "Supporting information technology and operational administration activities, including documentation, reporting, data management, and technology-related project activities.",
    activities: [
      {
        title: "Carbon Emission Airplane Dashboard",
        description:
          "Developing a web-based dashboard concept for visualizing estimated aircraft carbon emissions in Indonesia, including data processing and visualization.",
        href: "https://github.com/tifaniyy/dashboard-emisi-karbon",
      },
    ],
  },
  {
    company: "PT Telkom Indonesia",
    fullCompany: "PT Telkom Indonesia (Persero) Tbk",
    role: "Independent Internship — Digital Connectivity Service",
    period: "3 Months",
    type: "Internship",
    location: "Indonesia",
    description:
      "Conducted research related to Wi-Fi 7 and enterprise wireless networking, explored IoT technology, and contributed to website UI/UX development.",
    activities: [
      {
        title: "Wi-Fi 7 Development Analysis in Indonesia",
        description:
          "Research project exploring Wi-Fi 7 technology, enterprise wireless networking, and its potential implementation in Indonesia.",
      },
      {
        title: "Website Telkom — Work Progress",
        description:
          "Web-based internal work progress website concept developed to improve information presentation and navigation.",
      },
    ],
  },
];
