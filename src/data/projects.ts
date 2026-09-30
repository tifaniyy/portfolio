/**
 * Projects data.
 * ---------------------------------------------------------------
 * EDIT THIS FILE to update projects, links and screenshots.
 *
 *  - `demo`      : null  -> button renders as "Demo (Segera)" placeholder
 *                  "https://..." -> real link, button becomes clickable
 *  - `github`    : repository URL, or null if there is none yet
 *  - `screenshots`: files placed in /public/projects. Replace the generated
 *                  SVG placeholders with real PNG/JPG captures of the same
 *                  aspect ratio (16:10) and keep the file names or update
 *                  the paths here.
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
    slug: "ump-indonesia-dashboard",
    title:
      "Visualisasi Data Upah Minimum Provinsi (UMP) di Indonesia Tahun 1997–2026",
    subtitle: "Dashboard interaktif tren UMP 38 provinsi",
    year: "2026",
    category: "Data & Web",
    summary:
      "Web-based dashboard for visualizing Indonesian provincial minimum wage trends from 1997–2026 using K-Means clustering.",
    description:
      "Dashboard berbasis web untuk memvisualisasikan tren Upah Minimum Provinsi (UMP) di Indonesia dari tahun 1997 hingga 2026. Data diolah dengan Pandas dan NumPy, dianalisis menggunakan K-Means clustering untuk mengelompokkan provinsi berdasarkan pola upah, lalu disajikan dalam grafik interaktif dan peta.",
    problem:
      "Data UMP Indonesia tersedia dalam bentuk berkas dan tabel yang panjang (1997–2026 untuk seluruh provinsi). Bentuk ini sulit dibaca secara cepat, sehingga tren kenaikan upah, provinsi dengan upah tertinggi, dan pola pengelompokan provinsi tidak terlihat secara langsung.",
    solution:
      "Membangun dashboard Flask yang memproses data UMP secara otomatis dengan Pandas, menghitung statistik dan klaster K-Means, kemudian menampilkan hasilnya sebagai grafik interaktif, tabel Top 10 provinsi, kategori distribusi upah, dan visualisasi peta sehingga pola data dapat dibaca dalam hitungan detik.",
    tech: [
      "Python",
      "Flask",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Scikit-learn",
      "K-Means",
    ],
    features: [
      "Trend visualization",
      "Top 10 provinces",
      "Distribution categories",
      "K-Means clustering",
      "Interactive data visualization",
      "Map visualization",
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
        caption: "Visualisasi peta sebaran UMP",
      },
    ],
    featured: true,
  },
  {
    slug: "carbon-emission-airplane-dashboard",
    title: "Carbon Emission Airplane Dashboard — Indonesia",
    subtitle: "Estimasi emisi karbon dan rute penerbangan",
    organization: "Perum LPPNPI (AirNav Indonesia)",
    year: "2026",
    category: "Data Visualization",
    summary:
      "Web-based dashboard concept for visualizing estimated aircraft carbon emissions and flight routes in Indonesia.",
    description:
      "Konsep dashboard berbasis web untuk memvisualisasikan estimasi emisi karbon pesawat dan rute penerbangan di Indonesia. Dashboard menggabungkan data bandara, rute, dan estimasi emisi ke dalam satu tampilan yang dilengkapi statistik ringkas serta manajemen data.",
    problem:
      "Informasi mengenai emisi karbon penerbangan di Indonesia masih tersebar dan belum tersaji dalam satu tampilan visual. Data rute dan bandara sulit dihubungkan ke estimasi emisi tanpa pengolahan manual.",
    solution:
      "Mengembangkan konsep dashboard dengan Flask dan PostgreSQL yang menyimpan data bandara dan rute, menghitung estimasi emisi karbon per rute, lalu menampilkan hasilnya melalui peta rute, grafik statistik, dan panel manajemen data dengan autentikasi pengguna.",
    tech: [
      "Python",
      "Flask",
      "PostgreSQL",
      "Data Visualization",
      "Map Visualization",
    ],
    features: [
      "Aircraft route visualization",
      "Airport data",
      "Carbon emission estimation",
      "Dashboard statistics",
      "Data management",
      "User authentication",
    ],
    github: "https://github.com/tifaniyy/dashboard-emisi-karbon",
    demo: null,
    screenshots: [
      {
        src: "/projects/carbon-dashboard.svg",
        alt: "Placeholder dashboard statistik emisi karbon pesawat",
        caption: "Panel statistik emisi karbon",
      },
      {
        src: "/projects/carbon-route-map.svg",
        alt: "Placeholder peta rute penerbangan Indonesia",
        caption: "Peta rute penerbangan dan bandara",
      },
    ],
    featured: true,
  },
  {
    slug: "wifi-7-development-analysis",
    title: "Wi-Fi 7 Development Analysis in Indonesia",
    subtitle: "Riset teknologi dan kesiapan implementasi",
    organization: "PT Telkom Indonesia",
    year: "2025",
    category: "Research",
    summary:
      "Research project exploring Wi-Fi 7 technology, enterprise wireless networking, and its potential implementation in Indonesia.",
    description:
      "Project riset yang mengeksplorasi teknologi Wi-Fi 7, jaringan nirkabel enterprise, serta potensi implementasinya di Indonesia. Hasil riset dirangkum dalam analisis komparatif dan materi presentasi yang didukung oleh desain UI/UX untuk penyampaian temuannya.",
    problem:
      "Teknologi Wi-Fi 7 belum banyak dibahas dalam konteks kesiapan infrastruktur dan kebutuhan industri di Indonesia, sehingga belum ada gambaran yang jelas mengenai peluang, tantangan, dan tahapan adopsinya.",
    solution:
      "Melakukan studi literatur dan komparasi spesifikasi Wi-Fi 7 terhadap generasi sebelumnya, memetakan kebutuhan jaringan nirkabel enterprise, lalu menyusun analisis kesiapan implementasi di Indonesia beserta materi presentasi yang mudah dipahami.",
    tech: ["Research", "Data Analysis", "UI/UX", "Figma"],
    features: [
      "Studi literatur Wi-Fi 7",
      "Komparasi Wi-Fi 6 / 6E / 7",
      "Analisis kebutuhan jaringan enterprise",
      "Eksplorasi teknologi IoT",
      "Materi presentasi dan visual pendukung",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/wifi7-research.svg",
        alt: "Placeholder ringkasan hasil riset Wi-Fi 7",
        caption: "Ringkasan temuan riset Wi-Fi 7",
      },
    ],
    featured: false,
  },
  {
    slug: "website-telkom-work-progress",
    title: "Website Telkom — Work Progress",
    subtitle: "Konsep website internal pelaporan progres kerja",
    organization: "PT Telkom Indonesia",
    year: "2025",
    category: "Web Development",
    summary:
      "Web-based internal work progress website concept developed to improve information presentation and navigation.",
    description:
      "Konsep website internal untuk menampilkan progres pekerjaan. Dibuat dengan PHP dan MySQL, dirancang lebih dulu di Figma agar penyajian informasi lebih rapi dan navigasinya lebih mudah bagi pengguna internal.",
    problem:
      "Penyampaian progres pekerjaan masih menggunakan media yang kurang terstruktur, sehingga status tiap pekerjaan sulit dipantau dan informasi sering terlewat.",
    solution:
      "Merancang ulang struktur informasi dan navigasi lewat wireframe Figma, kemudian mengimplementasikannya sebagai website internal dengan PHP dan MySQL yang menampilkan daftar pekerjaan, status, dan detail progres secara terpusat.",
    tech: ["PHP", "Bootstrap", "MySQL", "Figma"],
    features: [
      "Perancangan wireframe di Figma",
      "Halaman daftar pekerjaan",
      "Status dan detail progres",
      "Pencarian dan navigasi data",
      "Tampilan responsif",
    ],
    github: null,
    demo: null,
    screenshots: [
      {
        src: "/projects/telkom-web.svg",
        alt: "Placeholder tampilan website work progress Telkom",
        caption: "Tampilan halaman daftar progres pekerjaan",
      },
      {
        src: "/projects/telkom-figma.svg",
        alt: "Placeholder rancangan wireframe Figma",
        caption: "Wireframe dan struktur navigasi (Figma)",
      },
    ],
    featured: false,
  },
];
