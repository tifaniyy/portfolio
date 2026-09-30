/**
 * Projects data — taken from the CV "Experiences" section (every entry marked
 * "Project" / "Software Designer Project"). The Telkom internship lives in
 * `experience.ts`, so it is not duplicated here.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update projects, links and screenshots.
 *
 *  - `demo`      : null  -> button renders as "Live Demo (segera)"
 *                  "https://..." -> real link, button becomes clickable
 *  - `github`    : repository URL, or null if there is none yet
 *  - `screenshots`: files placed in /public/projects. Replace the generated
 *                  SVG placeholders with real PNG/JPG captures and keep the
 *                  file names, or update the paths here.
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
  category: "Data & Web" | "Data Visualization" | "Research" | "Web Development";
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
  screenshots: Screenshot[];
  featured: boolean;
};

export const projects: Project[] = [
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
      "Preprocessed and analyzed Provincial Minimum Wage (UMP) data in Indonesia covering 1997–2026. Implemented K-Means clustering using Scikit-learn to group provinces based on minimum wage characteristics. Created data visualizations using Pandas, Matplotlib, and GeoPandas to illustrate wage trends and clustering results. Developed a web based data visualization application using Flask to present analytical results through an interactive interface, and deployed it on Railway so the project is accessible online.",
    problem:
      "Data UMP Indonesia mencakup 1997–2026 untuk seluruh provinsi dalam bentuk tabel panjang. Bentuk ini sulit dibaca cepat, sehingga tren kenaikan upah, provinsi dengan upah tertinggi, dan pengelompokan provinsi berdasarkan karakteristik upah tidak terlihat langsung.",
    solution:
      "Membangun aplikasi visualisasi berbasis Flask: data UMP diproses dengan Pandas, dikelompokkan memakai K-Means (Scikit-learn), lalu divisualisasikan dengan Matplotlib dan GeoPandas menjadi grafik tren, hasil clustering, serta peta. Aplikasi di-deploy ke Railway agar bisa diakses online.",
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
      "K-Means clustering provinsi",
      "Visualisasi tren upah (line & bar chart)",
      "Peta sebaran UMP dengan GeoPandas",
      "Antarmuka web interaktif",
      "Deployed on Railway",
    ],
    github: "https://github.com/tifaniyy/ump-flask",
    demo: null,
    screenshots: [
      {
        src: "/projects/ump-dashboard.svg",
        alt: "Placeholder tampilan dashboard tren UMP Indonesia",
        caption: "Tampilan utama dashboard — tren UMP dan filter tahun",
      },
      {
        src: "/projects/ump-clustering.svg",
        alt: "Placeholder visualisasi hasil K-Means clustering UMP",
        caption: "Hasil K-Means clustering provinsi",
      },
      {
        src: "/projects/ump-map.svg",
        alt: "Placeholder peta visualisasi UMP Indonesia",
        caption: "Visualisasi peta sebaran UMP (GeoPandas)",
      },
    ],
    featured: true,
  },
  {
    slug: "oldmarketjkt-thrift-website",
    title: "E-commerce Thrift Shop (Oldmarketjkt) Website",
    subtitle: "Software Designer untuk website e-commerce",
    year: "2026",
    period: "Oct 2025 – Jan 2026",
    category: "Web Development",
    summary:
      "Served as a Software Designer for the Oldmarketjkt web based e-commerce project.",
    description:
      "Served as a Software Designer for the Oldmarketjkt web based e-commerce project. Designed software requirements, system structure, and user interfaces to support application development.",
    problem:
      "Project e-commerce thrift shop membutuhkan fondasi rancangan yang jelas sebelum masuk ke tahap pengembangan: kebutuhan sistem, struktur aplikasi, dan tampilan antarmuka belum terdefinisi, sehingga berisiko menimbulkan perubahan besar di tengah pengerjaan.",
    solution:
      "Berperan sebagai Software Designer: menyusun kebutuhan software, merancang struktur sistem, dan mendesain antarmuka pengguna sebagai acuan tim pengembang.",
    tech: ["Software Design", "UI/UX Design", "Figma", "System Design"],
    features: [
      "Perancangan software requirements",
      "Perancangan struktur sistem",
      "Desain antarmuka pengguna (UI)",
      "Dokumentasi acuan pengembangan",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/thrift-website.svg",
        alt: "Placeholder rancangan antarmuka website thrift shop Oldmarketjkt",
        caption: "Rancangan antarmuka website e-commerce",
      },
    ],
    featured: true,
  },
  {
    slug: "ump-streamlit-dashboard",
    title: "Dashboard to Display UMP (Provincial Minimum Wage) Data in Indonesia",
    subtitle: "Dashboard interaktif dengan Streamlit",
    year: "2025",
    period: "Jun 2025 – Aug 2025",
    category: "Data Visualization",
    summary:
      "Web-based Streamlit dashboard presenting Indonesian provincial minimum wage insights in an interactive, user-friendly format.",
    description:
      "Performed data preprocessing and analysis of Indonesian Provincial Minimum Wage (UMP) data using Python and Pandas. Created line and bar chart visualizations using Matplotlib to analyze UMP trends across provinces from 1997–2025. Developed a web based dashboard using Streamlit to present data insights in an interactive and user friendly format.",
    problem:
      "Analisis tren UMP 1997–2025 hanya tersedia dalam bentuk hasil olahan yang tidak interaktif, sehingga pengguna non-teknis sulit menelusuri tren per provinsi secara mandiri.",
    solution:
      "Membangun dashboard Streamlit: data dibersihkan dan dianalisis dengan Pandas, divisualisasikan sebagai line chart dan bar chart dengan Matplotlib, lalu disajikan melalui antarmuka web yang interaktif dan mudah dipakai.",
    tech: ["Python", "Pandas", "Matplotlib", "Streamlit", "Data Cleaning"],
    features: [
      "Data preprocessing & cleaning dengan Pandas",
      "Line chart tren UMP per provinsi (1997–2025)",
      "Bar chart perbandingan antar provinsi",
      "Dashboard web interaktif dengan Streamlit",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/streamlit-ump.svg",
        alt: "Placeholder dashboard Streamlit data UMP Indonesia",
        caption: "Dashboard Streamlit — tren UMP antar provinsi",
      },
    ],
    featured: false,
  },
  {
    slug: "online-shoes-store-website",
    title: "E-commerce (Online Shoes Store) Website",
    subtitle: "Dikembangkan secara lokal dengan PHP, SQL & Bootstrap",
    year: "2025",
    period: "Dec 2024 – Jan 2025",
    category: "Web Development",
    summary:
      "Web-based online shoes store developed locally using PHP, SQL and Bootstrap, focused on navigation flow and accessibility.",
    description:
      "Designed the website navigation structure to improve user flow and accessibility. Designed and implemented a responsive navigation bar using Bootstrap. Created wireframes to define the website layout and user interface structure. Built an interactive prototype to demonstrate user flows and interface interactions.",
    problem:
      "Navigasi website toko sepatu online perlu dibuat lebih mudah dipahami: alur pengguna belum jelas, dan tampilan belum responsif saat dibuka di berbagai ukuran layar.",
    solution:
      "Merancang struktur navigasi untuk memperbaiki user flow dan aksesibilitas, membuat wireframe sebagai acuan tata letak, membangun navigation bar responsif dengan Bootstrap, serta membuat prototipe interaktif untuk mendemonstrasikan alur dan interaksi antarmuka.",
    tech: ["PHP", "SQL", "Bootstrap", "HTML", "CSS", "Figma"],
    features: [
      "Perancangan struktur navigasi website",
      "Navigation bar responsif dengan Bootstrap",
      "Wireframe tata letak & struktur antarmuka",
      "Prototipe interaktif alur pengguna",
      "Pengembangan lokal dengan PHP dan SQL",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/shoes-store-web.svg",
        alt: "Placeholder tampilan website toko sepatu online",
        caption: "Tampilan halaman website toko sepatu online",
      },
    ],
    featured: false,
  },
  {
    slug: "hand-gesture-classification",
    title: "Machine Learning-Based Classification of Hand Gestures: Rock, Paper, and Scissors",
    subtitle: "Klasifikasi gambar dengan machine learning",
    year: "2024",
    period: "Sep 2024 – Oct 2024",
    category: "Data Visualization",
    summary:
      "Machine learning project classifying hand gesture images into three categories: Rock, Paper, and Scissors.",
    description:
      "Prepared and preprocessed hand gesture image data for machine learning classification. Trained a machine learning model to classify hand gestures into three categories: Rock, Paper, and Scissors. Performed model evaluation to assess classification performance and prediction accuracy. Developed a classification workflow for predicting hand gestures from input images.",
    problem:
      "Gambar gestur tangan perlu dikenali secara otomatis ke dalam tiga kelas (Rock, Paper, Scissors), dan model yang dilatih harus bisa diukur seberapa akurat prediksinya.",
    solution:
      "Menyiapkan dan memproses data gambar gestur tangan, melatih model machine learning untuk tiga kelas, lalu melakukan evaluasi model guna menilai performa klasifikasi dan akurasi prediksi. Alur klasifikasi disusun agar gambar input dapat langsung diprediksi.",
    tech: [
      "Python",
      "Machine Learning",
      "Image Preprocessing",
      "Model Evaluation",
      "Classification",
    ],
    features: [
      "Persiapan & preprocessing data gambar",
      "Pelatihan model klasifikasi 3 kelas",
      "Evaluasi performa & akurasi prediksi",
      "Alur prediksi dari gambar input",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/hand-gesture-ml.svg",
        alt: "Placeholder alur klasifikasi gestur tangan Rock Paper Scissors",
        caption: "Alur klasifikasi gestur tangan",
      },
    ],
    featured: false,
  },
];
