/**
 * Skills data — grouped by category.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to add/remove skills.
 * `icon` values are Lucide React icon names (see src/components/Skills.tsx).
 * ---------------------------------------------------------------
 */

export type SkillCategory = {
  title: string;
  description: string;
  icon: string;
  /** Tailwind-friendly accent tint key used by the skill card. */
  accent: "blue" | "violet" | "emerald" | "amber";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Programming & Data",
    description: "Mengolah dan menganalisis data dengan Python dan SQL.",
    icon: "Terminal",
    accent: "blue",
    skills: ["Python", "SQL", "Pandas", "NumPy", "Matplotlib", "Scikit-learn"],
  },
  {
    title: "Data Visualization",
    description:
      "Menyajikan data menjadi grafik dan dashboard yang mudah dipahami.",
    icon: "BarChart3",
    accent: "violet",
    skills: ["Power BI", "Matplotlib", "Data Visualization"],
  },
  {
    title: "Web Development",
    description: "Membangun antarmuka web yang responsif dan rapi.",
    icon: "Code2",
    accent: "emerald",
    skills: [
      "HTML",
      "CSS",
      "JavaScript",
      "Python Flask",
      "Next.js",
      "Tailwind CSS",
    ],
  },
  {
    title: "Tools",
    description: "Perangkat kerja harian untuk dokumentasi dan kolaborasi.",
    icon: "Wrench",
    accent: "amber",
    skills: [
      "Git",
      "GitHub",
      "Figma",
      "Microsoft Excel",
      "Microsoft PowerPoint",
      "Microsoft Word",
    ],
  },
];
