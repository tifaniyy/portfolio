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
      "Processing, cleaning, and analysing data with Python, SQL, and Excel.",
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
      "Turning analysis results into charts and dashboards that are easy to read.",
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
    description: "Applying classification and clustering algorithms to real data.",
    icon: "BrainCircuit",
    accent: "emerald",
    skills: ["Scikit-learn", "K-Means Clustering", "Classification", "Model Evaluation"],
  },
  {
    title: "Web Development",
    description: "Building responsive web interfaces that are easy to use.",
    icon: "Code2",
    accent: "amber",
    skills: ["Flask", "HTML", "CSS", "Bootstrap", "PHP", "Responsive Design"],
  },
];
