/**
 * Skills data — taken from the "Training, Skills, & Tools" section of the CV.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to add/remove skills.
 * `icon` values are Lucide React icon names (see src/components/Skills.tsx).
 * `accent` can be: blue | violet | emerald | amber
 * ---------------------------------------------------------------
 */

export type SkillCategory = {
  title: string;
  description: string;
  icon: string;
  accent: "blue" | "violet" | "emerald" | "amber";
  skills: string[];
};

export const skillCategories: SkillCategory[] = [
  {
    title: "Data Analysis & Programming",
    description:
      "Memproses, membersihkan, dan menganalisis data dengan Python, SQL, dan Excel.",
    icon: "Terminal",
    accent: "blue",
    skills: [
      "Python",
      "SQL",
      "Pandas",
      "NumPy",
      "Excel",
      "Data Cleaning",
      "Data Processing",
    ],
  },
  {
    title: "Data Visualization",
    description:
      "Mengubah hasil analisis menjadi grafik dan dashboard yang mudah dibaca.",
    icon: "BarChart3",
    accent: "violet",
    skills: [
      "Matplotlib",
      "GeoPandas",
      "Streamlit",
      "Dashboard",
      "Data Storytelling",
    ],
  },
  {
    title: "Machine Learning",
    description: "Menerapkan algoritma klasifikasi dan clustering pada data nyata.",
    icon: "BrainCircuit",
    accent: "emerald",
    skills: ["Scikit-learn", "K-Means Clustering", "Classification", "Model Evaluation"],
  },
  {
    title: "Web Development",
    description: "Membangun antarmuka web yang responsif dan mudah digunakan.",
    icon: "Code2",
    accent: "amber",
    skills: ["Flask", "HTML", "CSS", "Bootstrap", "PHP", "Responsive Design"],
  },
];
