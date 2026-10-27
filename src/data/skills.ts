/**
 * Skills data — taken from the "Training, Skills, & Tools" section of the CV,
 * plus the stack this portfolio is itself built with: Next.js, React, Tailwind
 * CSS and Git/GitHub. Those four are listed because the site is the working
 * proof (and so a recruiter reading the page sees the stack they are looking
 * at), not because a course certificate says so.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to add/remove skills.
 * `icon` values are Lucide React icon names (see src/components/Skills.tsx).
 * `accent` can be: blue | violet | emerald | amber | rose
 *
 * The "AI Tools & Agents" card is NOT in the CV — added on request to show the
 * AI assistants and coding agents used in the daily workflow. Keep the list to
 * tools actually used; it sits next to technical skills, so it must stay honest.
 * ---------------------------------------------------------------
 */

export type SkillCategory = {
  title: string;
  description: string;
  icon: string;
  accent: "blue" | "violet" | "emerald" | "amber" | "rose";
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
    description:
      "Building responsive interfaces with Next.js, React and Tailwind, as well as Flask and PHP.",
    icon: "Code2",
    accent: "amber",
    skills: [
      "Next.js",
      "React",
      "Tailwind CSS",
      "Flask",
      "PHP",
      "HTML",
      "CSS",
      "Bootstrap",
      "Responsive Design",
      "Git & GitHub",
    ],
  },
  {
    title: "AI Tools & Agents",
    description:
      "AI assistants and coding agents I use every day to build, debug, and document.",
    icon: "Bot",
    accent: "rose",
    skills: [
      "Hermes Agent",
      "Claude Code",
      "GitHub Copilot",
      "ChatGPT",
      "Gemini",
      "DeepSeek",
    ],
  },
];
