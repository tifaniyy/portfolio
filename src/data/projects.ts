/**
 * Projects data — taken from the CV "Experiences" section (every entry marked
 * "Project" / "Software Designer Project"), plus one entry added on request:
 * the AirNav Indonesia carbon-emission dashboard, which is not in the CV yet.
 * The Telkom internship lives in `experience.ts`, so it is not duplicated here.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update projects, links and screenshots.
 *
 *  - `demo`      : null  -> no deployment. The card then shows a "View Source"
 *                  button instead of a dead "Live Demo" placeholder.
 *                  Set "https://..." to turn it into a real Live Demo button.
 *  - `deploymentNote`: shown in the detail modal. Use it to explain a demo
 *                  that is temporarily offline (e.g. a free Railway instance
 *                  that expired) so the missing link is no longer a mystery.
 *  - `organization`: shown as the small label above the title on the card.
 *  - `github`    : repository URL, or null if there is none yet
 *  - `screenshots`: files placed in /public/projects. Keep each `src` exactly
 *                  in sync with the real file name — a typo here renders as a
 *                  broken image, not a build error.
 *  - Newest entries first: the project with the most recent `period` goes at
 *    the top of the array. All entries render in one grid, in this order.
 * ---------------------------------------------------------------
 */

export type Screenshot = {
  src: string;
  alt: string;
  caption: string;
};

export type Project = {
  slug: string;
  title: string;
  subtitle?: string;
  organization?: string;
  year: string;
  period: string;
  category:
    | "Data & Web"
    | "Data Visualization"
    | "Research"
    | "Web Development";
  summary: string;
  description: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  /** Real repository URL, or null. */
  github: string | null;
  /** Real deployment URL, or null while it is still a placeholder. */
  demo: string | null;
  /**
   * Optional note shown in the detail modal, e.g. explaining that a demo was
   * taken down. Omit when the demo link works normally.
   */
  deploymentNote?: string;
  screenshots: Screenshot[];
};

export const projects: Project[] = [
  {
    slug: "airnav-dashboard-emisi",
    title: "Air Traffic Carbon Emission Dashboard",
    subtitle: "Flask dashboard for Aviation CO₂ savings",
    organization: "AirNav Indonesia (Perum LPPNPI)",
    year: "2026",
    period: "Sep 2026 – now",
    category: "Data & Web",
    summary:
      "Web-based dashboard that calculates and visualises the CO₂ emissions saved by shortening flight routes across Indonesia, built for the Information Technology Division of AirNav Indonesia.",
    description:
      "Built during the internship at AirNav Indonesia (Perum LPPNPI), the state-owned air navigation service provider, in the Information Technology division. The application stores Indonesian airports, route savings and daily flight counts in a database, then computes the reduced CO₂ emissions and fuel cost from those inputs. Airports, routes and uploads are maintained through an admin area with Excel/CSV import.",
    problem:
      "Shorter flight routes cut fuel burn and CO₂ emissions, but the saving is not visible: the airport, route and daily-flight tables are separate, and the emission figure for a given period has to be worked out by hand.",
    solution:
      "Building a Flask web application: a relational database holds airports (241 Indonesian airports seeded from an OurAirports extract), route savings and daily flights, the CO₂ and cost calculation runs on the server data, and the results are shown as an interactive dashboard — a Leaflet map of the route on top of OpenFreeMap vector tiles plus a per-month bar chart. Data entry is handled through an admin area that accepts Excel/CSV uploads and manages airport and route records.",
    tech: [
      "Python",
      "Flask",
      "SQLAlchemy",
      "PostgreSQL",
      "SQLite",
      "Leaflet",
      "MapLibre GL JS",
      "OpenFreeMap",
      "JavaScript",
      "HTML/CSS",
      "Vercel",
    ],
    features: [
      "Airport, route and daily-flight data in a relational database",
      "CO₂ saved and cost calculation per route and period",
      "Interactive route map (Leaflet over OpenFreeMap vector tiles)",
      "Monthly CO₂ chart (TW I–IV or full year)",
      "Admin area: Excel/CSV upload, airport and route management",
      "Login with admin approval for new accounts",
      "Offline page assets — fonts, map libraries and map style kept in the repo",
    ],
    github: "https://github.com/tifaniyy/dashboard-emisi-web",
    demo: null,
    deploymentNote:
      "This is the internship project at AirNav Indonesia, so the dashboard is run locally/internal and the repository holds the source code. Setup instructions are in the repository README.",
    screenshots: [
      {
        src: "/projects/emisi-beranda.png",
        alt: "Carbon emission dashboard: airport and route selection, CO₂ calculator and the route map",
        caption:
          "Main dashboard — route selection, CO₂ calculator and route map",
      },
      {
        src: "/projects/emisi-analisis.png",
        alt: "CO₂ calculation for the selected route with the monthly bar chart and saving summary",
        caption:
          "Calculation result — monthly CO₂ for the selected route and period",
      },
      {
        src: "/projects/emisi-admin.png",
        alt: "Admin area: new user approval table and the airport data table",
        caption: "Admin area — user approval, Excel/CSV upload and airport data",
      },
    ],
  },
  {
    slug: "ump-kmeans-flask",
    title:
      "Visualisation of Provincial Minimum Wage Data in Indonesia for 1997–2026 Using a Web Based K-Means Algorithm",
    subtitle: "Dashboard Flask dengan clustering K-Means",
    year: "2026",
    period: "May 2026 – Aug 2026",
    category: "Data & Web",
    summary:
      "Web-based dashboard for visualising Indonesian provincial minimum wage trends from 1997–2026 using K-Means clustering.",
    description:
      "Preprocessed and analyzed Provincial Minimum Wage (UMP) data in Indonesia covering 1997–2026. Implemented K-Means clustering using Scikit-learn to group provinces based on minimum wage characteristics. Created data visualizations using Pandas, Matplotlib, and GeoPandas to illustrate wage trends and clustering results. Developed a web based data visualization application using Flask to present analytical results through an interactive interface.",
    problem:
      "The data on Indonesia’s minimum wage (UMP) covers the period 1997–2026 for all provinces in the form of a long table. This format is difficult to scan quickly, meaning that wage increase trends, the provinces with the highest wages, and the grouping of provinces by wage characteristics are not immediately apparent.",
    solution:
      "Building a Flask-based visualisation application: UMP data is processed using Pandas, clustered using K-Means (Scikit-learn), and then visualised using Matplotlib and GeoPandas to produce trend graphs, clustering results and maps. The application is then deployed so that it can be accessed online.",
    tech: [
      "Python",
      "Flask",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "GeoPandas",
      "Scikit-learn",
      "K-Means Clustering",
      "Railway",
    ],
    features: [
      "Preprocessing data UMP 1997–2026",
      "K-means clustering by province",
      "Visualisation of wage trends (line and bar charts)",
      "Visualisation of UMP distribution (GeoPandas)",
      "Interactive web interface",
      "Complete source code + dataset on GitHub",
    ],
    github: "https://github.com/tifaniyy/ump-flask",
    demo: null,
    deploymentNote:
      "The previous online version was deployed on Railway, but the free instance has now expired. All source code and datasets are available in the GitHub repository above and can be run locally.",
    screenshots: [
      {
        src: "/projects/ump-beranda.png",
        alt: "Main dashboard view for Indonesia's UMP trends and year filter",
        caption: "Main dashboard view — UMP trends and year filter",
      },
      {
        src: "/projects/ump-cluster.png",
        alt: "Visualisation of K-Means clustering results for UMP by province",
        caption:
          "Visualisation of K-Means clustering results for UMP by province",
      },
      {
        src: "/projects/ump-map.png",
        alt: "Visualisation of UMP distribution across Indonesia",
        caption: "Visualisation of UMP distribution (GeoPandas)",
      },
    ],
  },
  {
    slug: "oldmarketjkt-thrift-website",
    title: "E-commerce Thrift Shop (Oldmarketjkt) Website",
    subtitle: "Software Designer for e-commerce website",
    year: "2026",
    period: "Oct 2025 – Jan 2026",
    category: "Web Development",
    summary:
      "Served as a Software Designer for the Oldmarketjkt web based e-commerce project.",
    description:
      "Served as a Software Designer for the Oldmarketjkt web based e-commerce project. Designed software requirements, system structure, and user interfaces to support application development.",
    problem:
      "The e-commerce second-hand shop project requires a clear design framework before moving on to the development stage: the system requirements, application structure and user interface have not yet been defined, which risks major changes having to be made whilst the project is in progress.",
    solution:
      "Acting as a Software Designer: defining software requirements, designing the system architecture, and designing the user interface to serve as a guide for the development team.",
    tech: ["Software Design", "UI/UX Design", "Figma", "System Design"],
    features: [
      "Software requirements specification",
      "System structure design",
      "User interface design",
      "Development reference documentation",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/design-oldmarket.png",
        alt: "Software design for the Oldmarketjkt e-commerce website",
        caption: "User interface design for the e-commerce website",
      },
    ],
  },
  {
    slug: "ump-streamlit-dashboard",
    title:
      "Dashboard to Display UMP (Provincial Minimum Wage) Data in Indonesia",
    subtitle: "Interactive dashboard with Streamlit",
    year: "2025",
    period: "Jun 2025 – Aug 2025",
    category: "Data Visualization",
    summary:
      "Web-based Streamlit dashboard presenting Indonesian provincial minimum wage insights in an interactive, user-friendly format.",
    description:
      "Performed data preprocessing and analysis of Indonesian Provincial Minimum Wage (UMP) data using Python and Pandas. Created line and bar chart visualizations using Matplotlib to analyze UMP trends across provinces from 1997–2025. Developed a web based dashboard using Streamlit to present data insights in an interactive and user friendly format.",
    problem:
      "The analysis of the UMP trend for 1997–2025 is only available in the form of non-interactive processed data, making it difficult for non-technical users to explore the trends by province independently.",
    solution:
      "Building a Streamlit dashboard: data is cleaned and analysed using Pandas, visualised as line charts and bar charts using Matplotlib, and then presented via an interactive and user-friendly web interface.",
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit", "Data Cleaning"],
    features: [
      "Data pre-processing and cleaning with Pandas",
      "Line chart of UMP trends per province (1997–2025)",
      "Bar chart of comparisons between provinces",
      "Interactive web dashboard with Streamlit",
    ],
    github: "https://github.com/tifaniyy/ump-dashboard",
    demo: "https://ump-dashboard.streamlit.app/",
    screenshots: [
      {
        src: "/projects/streamlit-ump.png",
        alt: "Streamlit dashboard for Indonesia's UMP data",
        caption: "Streamlit dashboard — UMP trends across provinces",
      },
    ],
  },
  {
    slug: "online-shoes-store-website",
    title: "E-commerce (Online Shoes Store) Website",
    subtitle: "Developed locally with PHP, SQL & Bootstrap",
    year: "2025",
    period: "Dec 2024 – Jan 2025",
    category: "Web Development",
    summary:
      "Web-based online shoes store developed locally using PHP, SQL and Bootstrap, focused on navigation flow and accessibility.",
    description:
      "Designed the website navigation structure to improve user flow and accessibility. Designed and implemented a responsive navigation bar using Bootstrap. Created wireframes to define the website layout and user interface structure. Built an interactive prototype to demonstrate user flows and interface interactions.",
    problem:
      "Website navigation for the online shoe store needs to be easier to understand: user flow is unclear, and the design is not responsive across different screen sizes.",
    solution:
      "Designing the navigation structure to improve user flow and accessibility, creating wireframes as layout references, building a responsive navigation bar with Bootstrap, and developing an interactive prototype to demonstrate user journeys and interface interactions.",
    tech: ["PHP", "SQL", "Bootstrap", "HTML", "CSS", "Figma"],
    features: [
      "Designing a website navigation structure",
      "Responsive navigation bar with Bootstrap",
      "Layout and interface structure wireframes",
      "Interactive user flow prototype",
      "Local development with PHP and SQL",
    ],
    github: "https://github.com/tifaniyy/website_tokosepatu",
    demo: null,
    screenshots: [
      {
        src: "/projects/web-shoes-store.png",
        alt: "Online shoe shop website layout",
        caption: "Online shoe shop website layout",
      },
    ],
  },
  {
    slug: "hand-gesture-classification",
    title:
      "Machine Learning-Based Classification of Hand Gestures: Rock, Paper, and Scissors",
    subtitle: "Classification of images with machine learning",
    year: "2024",
    period: "Sep 2024 – Oct 2024",
    category: "Data Visualization",
    summary:
      "Machine learning project classifying hand gesture images into three categories: Rock, Paper, and Scissors.",
    description:
      "Prepared and preprocessed hand gesture image data for machine learning classification. Trained a machine learning model to classify hand gestures into three categories: Rock, Paper, and Scissors. Performed model evaluation to assess classification performance and prediction accuracy. Developed a classification workflow for predicting hand gestures from input images.",
    problem:
      "Hand gesture images need to be automatically recognized into three classes (Rock, Paper, Scissors), and the trained model must be measurable in terms of prediction accuracy.",
    solution:
      "Preparing and preprocessing hand gesture image data for machine learning classification. Training a machine learning model to classify hand gestures into three categories: Rock, Paper, and Scissors. Performing model evaluation to assess classification performance and prediction accuracy. Developing a classification workflow for predicting hand gestures from input images.",
    tech: [
      "Python",
      "Machine Learning",
      "Image Preprocessing",
      "Model Evaluation",
      "Classification",
    ],
    features: [
      "Preparation & preprocessing of image data",
      "Training of 3-class classification model",
      "Performance & prediction accuracy evaluation",
      "Prediction workflow from input images",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/ml-hand-gesture.png",
        alt: "Hand gesture classification workflow",
        caption: "Hand gesture classification workflow",
      },
    ],
  },
];
