"""Generate on-brand SVG screenshot placeholders for the portfolio.

Each placeholder uses the site palette (#0F172A / #1E293B / #2563EB / #F8FAFC)
and a neutral wireframe that hints at the content type, so it can be swapped
for a real screenshot without any other change.
"""

import os

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)))
W, H = 1280, 800
FONT = "Inter, 'Segoe UI', system-ui, sans-serif"

INK = "#0F172A"
SLATE = "#1E293B"
ACCENT = "#2563EB"
PAPER = "#F8FAFC"
MUTED = "#64748B"
BORDER = "#E2E8F0"


def esc(text: str) -> str:
    """Escape XML-significant characters in text/attribute content."""
    return (
        str(text)
        .replace("&", "&amp;")
        .replace("<", "&lt;")
        .replace(">", "&gt;")
    )


def chrome(title: str, subtitle: str) -> str:
    """Browser-window chrome + title block shared by every placeholder."""
    return f"""
  <rect width="{W}" height="{H}" fill="{PAPER}"/>
  <rect x="0" y="0" width="{W}" height="72" fill="{INK}"/>
  <circle cx="40" cy="36" r="7" fill="#334155"/>
  <circle cx="64" cy="36" r="7" fill="#334155"/>
  <circle cx="88" cy="36" r="7" fill="#334155"/>
  <rect x="120" y="22" width="520" height="28" rx="8" fill="#1E293B"/>
  <text x="136" y="42" font-family="{FONT}" font-size="15" fill="#94A3B8">{esc(title)}</text>
  <text x="{W - 40}" y="42" font-family="{FONT}" font-size="13" font-weight="600"
        fill="#60A5FA" text-anchor="end">PLACEHOLDER — {esc(subtitle)}</text>
  <rect x="0" y="72" width="{W}" height="{H - 72}" fill="#FFFFFF"/>
"""


def card(x, y, w, h, fill="#FFFFFF", stroke=BORDER, rx=16):
    return (
        f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" '
        f'fill="{fill}" stroke="{stroke}" stroke-width="1.5"/>'
    )


def label(x, y, text, size=16, weight=600, fill=INK, anchor="start"):
    return (
        f'<text x="{x}" y="{y}" font-family="{FONT}" font-size="{size}" '
        f'font-weight="{weight}" fill="{fill}" text-anchor="{anchor}">{text}</text>'
    )


def bar_chart(x, y, w, h, values, bar_fill=ACCENT, track="#EFF6FF"):
    out = [f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="12" fill="{track}"/>']
    n = len(values)
    gap = 14
    bw = (w - 48 - gap * (n - 1)) / n
    for i, v in enumerate(values):
        bh = (h - 48) * v
        bx = x + 24 + i * (bw + gap)
        by = y + h - 24 - bh
        out.append(
            f'<rect x="{bx:.1f}" y="{by:.1f}" width="{bw:.1f}" height="{bh:.1f}" '
            f'rx="6" fill="{bar_fill}" opacity="{0.55 + 0.45 * v:.2f}"/>'
        )
    return "\n  ".join(out)


def line_chart(x, y, w, h, points, stroke=ACCENT):
    """points: list of (0..1, 0..1) y-fractions."""
    step = w / (len(points) - 1)
    coords = " ".join(
        f"{x + i * step:.1f},{y + h - p * h:.1f}" for i, p in enumerate(points)
    )
    area = f"{x},{y + h} {coords} {x + w},{y + h}"
    return (
        f'<polygon points="{area}" fill="{stroke}" opacity="0.10"/>'
        f'<polyline points="{coords}" fill="none" stroke="{stroke}" '
        f'stroke-width="4" stroke-linejoin="round" stroke-linecap="round"/>'
    )


def scroller(title: str, subtitle: str, body: str) -> str:
    return (
        f'<svg xmlns="http://www.w3.org/2000/svg" width="{W}" height="{H}" '
        f'viewBox="0 0 {W} {H}" role="img" aria-label="{esc(title)}">\n'
        f'  <title>{esc(title)}</title>\n'
        f"{chrome(title, subtitle)}{body}\n</svg>\n"
    )


files: dict[str, str] = {}


# ---------------------------------------------------------------- UMP dashboard
body = [
    card(40, 104, 1200, 96, PAPER),
    label(72, 152, "Rata-rata UMP Indonesia (1997–2026)", 22, 700),
    label(72, 180, "Filter tahun · Provinsi · Kategori upah", 15, 500, MUTED),
    card(1016, 128, 192, 48, ACCENT, ACCENT, 12),
    label(1112, 158, "Terapkan Filter", 15, 600, "#FFFFFF", "middle"),

    card(40, 224, 800, 300),
    label(72, 264, "Tren UMP per Tahun", 18, 700),
    line_chart(
        88, 300, 720, 190,
        [0.20, 0.26, 0.24, 0.33, 0.38, 0.42, 0.47, 0.52, 0.58, 0.63, 0.71, 0.84],
    ),

    card(864, 224, 376, 300),
    label(896, 264, "Top 10 Provinsi", 18, 700),
    bar_chart(888, 288, 328, 208, [0.95, 0.88, 0.80, 0.72, 0.66, 0.58, 0.50, 0.44]),

    card(40, 548, 592, 220),
    label(72, 588, "Distribusi Kategori Upah", 18, 700),
    bar_chart(72, 612, 528, 132, [0.42, 0.68, 0.86, 0.54], "#1E293B"),
    label(72, 748, "Rendah · Sedang · Tinggi · Sangat Tinggi", 14, 500, MUTED),

    card(656, 548, 584, 220),
    label(688, 588, "Ringkasan Statistik", 18, 700),
    label(688, 636, "Provinsi dianalisis", 15, 500, MUTED),
    label(1208, 636, "38", 20, 700, INK, "end"),
    label(688, 682, "Rentang data", 15, 500, MUTED),
    label(1208, 682, "1997 – 2026", 20, 700, INK, "end"),
    label(688, 728, "Metode", 15, 500, MUTED),
    label(1208, 728, "K-Means (k=4)", 20, 700, ACCENT, "end"),
]
files["ump-dashboard.svg"] = scroller(
    "Dashboard UMP Indonesia", "tren &amp; filter", "\n  ".join(body)
)


# --------------------------------------------------------------- UMP clustering
body = [
    card(40, 104, 1200, 96, PAPER),
    label(72, 152, "Hasil K-Means Clustering Provinsi", 22, 700),
    label(72, 180, "Pengelompokan berdasarkan pola upah minimum 1997–2026", 15, 500, MUTED),
    card(1016, 128, 192, 48, "#FFFFFF", BORDER, 12),
    label(1112, 158, "k = 4 klaster", 15, 600, INK, "middle"),

    card(40, 224, 792, 544),
    label(72, 264, "Sebaran Provinsi per Klaster", 18, 700),
    # scatter plot
    '<rect x="88" y="300" width="712" height="400" rx="12" fill="#F8FAFC" stroke="#E2E8F0"/>',
    '<line x1="88" y1="600" x2="800" y2="600" stroke="#CBD5E1" stroke-width="2"/>',
    '<line x1="88" y1="300" x2="88" y2="600" stroke="#CBD5E1" stroke-width="2"/>',
]
clusters = [
    ("#2563EB", [(180, 560), (230, 540), (210, 575), (270, 520), (200, 590), (250, 560)]),
    ("#7C3AED", [(360, 480), (400, 505), (380, 460), (440, 490), (350, 520), (420, 460)]),
    ("#0EA5E9", [(520, 420), (560, 445), (540, 400), (600, 430), (580, 460), (620, 405)]),
    ("#10B981", [(690, 350), (720, 375), (700, 330), (755, 370), (680, 390), (740, 345)]),
]
for color, pts in clusters:
    for px, py in pts:
        body.append(f'<circle cx="{px}" cy="{py}" r="9" fill="{color}" opacity="0.75"/>')
body += [
    label(96, 640, "UMP awal (tahun dasar)", 14, 500, MUTED),
    label(792, 320, "Pertumbuhan", 14, 500, MUTED, "end"),
    '<g transform="translate(96,652)">', 
    f'<circle cx="6" cy="6" r="7" fill="#2563EB"/>{label(22, 11, "Klaster 1", 13, 500, SLATE)}',
    f'<circle cx="126" cy="6" r="7" fill="#7C3AED"/>{label(142, 11, "Klaster 2", 13, 500, SLATE)}',
    f'<circle cx="246" cy="6" r="7" fill="#0EA5E9"/>{label(262, 11, "Klaster 3", 13, 500, SLATE)}',
    f'<circle cx="366" cy="6" r="7" fill="#10B981"/>{label(382, 11, "Klaster 4", 13, 500, SLATE)}',
    "</g>",

    card(856, 224, 384, 544),
    label(888, 264, "Profil Klaster", 18, 700),
]
profile_rows = [
    ("Klaster 1", "Upah rendah, pertumbuhan lambat", "#2563EB"),
    ("Klaster 2", "Upah rendah, pertumbuhan sedang", "#7C3AED"),
    ("Klaster 3", "Upah menengah, pertumbuhan stabil", "#0EA5E9"),
    ("Klaster 4", "Upah tinggi, pertumbuhan cepat", "#10B981"),
]
for i, (name, desc, color) in enumerate(profile_rows):
    y = 292 + i * 116
    body += [
        card(880, y, 336, 96, PAPER, BORDER, 12),
        f'<rect x="880" y="{y}" width="6" height="96" rx="3" fill="{color}"/>',
        label(904, y + 38, name, 16, 700),
        label(904, y + 66, desc, 13, 500, MUTED),
    ]
files["ump-clustering.svg"] = scroller(
    "K-Means Clustering UMP", "klaster provinsi", "\n  ".join(body)
)


# ----------------------------------------------------------------------- UMP map
body = [
    card(40, 104, 1200, 96, PAPER),
    label(72, 152, "Peta Sebaran UMP Indonesia", 22, 700),
    label(72, 180, "Intensitas warna mewakili tingkat upah minimum provinsi", 15, 500, MUTED),
    card(40, 224, 872, 544),
    label(72, 264, "Choropleth UMP", 18, 700),
    '<rect x="88" y="292" width="792" height="448" rx="12" fill="#EFF6FF" stroke="#E2E8F0"/>',
]
# stylised island outlines (very abstract, clearly a placeholder)
outlines = [
    "M150,360 l120,-24 l96,26 l-14,40 l-92,18 l-96,-22 z",       # Sumatra
    "M330,430 l150,10 l120,44 l-40,52 l-150,-18 l-96,-52 z",      # Java
    "M560,340 l110,-30 l96,44 l-30,72 l-92,20 l-96,-52 z",        # Kalimantan
    "M700,420 l86,-18 l80,42 l-24,58 l-86,6 l-70,-48 z",          # Sulawesi
    "M880,392 l70,10 l24,42 l-56,30 l-54,-30 z",                  # Papua-ish
]
for i, path in enumerate(outlines):
    op = 0.25 + i * 0.16
    body.append(f'<path d="{path}" fill="{ACCENT}" opacity="{op:.2f}"/>')
for name, px, py in [
    ("Aceh", 208, 396), ("Jakarta", 470, 486), ("Jawa Timur", 566, 498),
    ("Kaltim", 640, 384), ("Makassar", 764, 480), ("Papua", 916, 428),
]:
    body += [
        f'<circle cx="{px}" cy="{py}" r="7" fill="{INK}"/>',
        label(px, py - 14, name, 13, 600, SLATE, "middle"),
    ]
body += [
    '<g transform="translate(100,690)">',
    label(0, 14, "UMP rendah", 13, 500, MUTED),
    f'<rect x="92" y="0" width="34" height="16" rx="4" fill="{ACCENT}" opacity="0.25"/>',
    f'<rect x="130" y="0" width="34" height="16" rx="4" fill="{ACCENT}" opacity="0.5"/>',
    f'<rect x="168" y="0" width="34" height="16" rx="4" fill="{ACCENT}" opacity="0.75"/>',
    f'<rect x="206" y="0" width="34" height="16" rx="4" fill="{ACCENT}"/>',
    label(248, 14, "UMP tinggi", 13, 500, MUTED),
    "</g>",

    card(936, 224, 304, 544),
    label(968, 264, "Detail Provinsi", 18, 700),
]
detail = [
    ("Provinsi terpilih", "DKI Jakarta"),
    ("UMP terbaru", "placeholder"),
    ("Pertumbuhan", "placeholder"),
    ("Klaster", "Klaster 4"),
    ("Peringkat nasional", "#1"),
]
for i, (k, v) in enumerate(detail):
    y = 300 + i * 84
    body += [
        card(960, y, 256, 68, PAPER, BORDER, 12),
        label(980, y + 28, k, 13, 500, MUTED),
        label(1196, y + 52, v, 16, 700, INK, "end"),
    ]
files["ump-map.svg"] = scroller("Peta UMP Indonesia", "peta choropleth", "\n  ".join(body))


# --------------------------------------------------------------------------- write
out_dir = os.path.join(os.path.dirname(OUT), "public", "projects")
out_dir = os.path.normpath(out_dir)
os.makedirs(out_dir, exist_ok=True)

# --------------------------------------------------------------- generic shot
def generic_placeholder(
    filename: str,
    page_title: str,
    subtitle: str,
    heading: str,
    note: str,
    cards: list[tuple[str, str]],
) -> str:
    """Neutral wireframe placeholder for projects without a bespoke mockup."""
    body = [
        card(40, 104, 1200, 96, PAPER),
        label(72, 152, heading, 22, 700),
        label(72, 180, note, 15, 500, MUTED),
    ]
    per_row = 2 if len(cards) > 2 else 1
    width = 1200 if per_row == 1 else 584
    for i, (title, desc) in enumerate(cards):
        row, col = divmod(i, per_row)
        x = 40 + col * 616
        y = 224 + row * 150
        body += [
            card(x, y, width, 128, PAPER if i % 2 else "#FFFFFF", BORDER, 12),
            label(x + 32, y + 46, title, 17, 700),
            label(x + 32, y + 78, desc, 14, 500, MUTED),
        ]
    return scroller(page_title, subtitle, "\n  ".join(body))


files["thrift-website.svg"] = generic_placeholder(
    "thrift-website.svg",
    "Oldmarketjkt Thrift Shop Website",
    "software design",
    "E-commerce Thrift Shop — Oldmarketjkt",
    "Rancangan software requirements, struktur sistem, dan antarmuka pengguna.",
    [
        ("Software Requirements", "Kebutuhan fungsional dan non-fungsional sistem"),
        ("System Structure", "Struktur modul dan alur aplikasi"),
        ("User Interface", "Desain tampilan dan komponen antarmuka"),
        ("User Flow", "Alur pengguna dari katalog hingga transaksi"),
    ],
)

files["streamlit-ump.svg"] = generic_placeholder(
    "streamlit-ump.svg",
    "Streamlit UMP Dashboard",
    "dashboard streamlit",
    "Dashboard UMP Indonesia — Streamlit",
    "Visualisasi tren upah minimum provinsi 1997–2025.",
    [
        ("Trend Line Chart", "Tren UMP per provinsi dari tahun ke tahun"),
        ("Bar Chart Comparison", "Perbandingan UMP antar provinsi"),
        ("Data Preprocessing", "Pembersihan dan penyiapan data dengan Pandas"),
        ("Interactive Filter", "Pemilihan provinsi dan rentang tahun"),
    ],
)

files["shoes-store-web.svg"] = generic_placeholder(
    "shoes-store-web.svg",
    "Online Shoes Store Website",
    "php + bootstrap",
    "E-commerce Online Shoes Store",
    "Website toko sepatu online berbasis PHP, SQL, dan Bootstrap.",
    [
        ("Navigation Structure", "Struktur navigasi untuk user flow dan aksesibilitas"),
        ("Responsive Navbar", "Navigation bar responsif dengan Bootstrap"),
        ("Wireframe", "Acuan tata letak dan struktur antarmuka"),
        ("Interactive Prototype", "Demonstrasi alur dan interaksi antarmuka"),
    ],
)

files["hand-gesture-ml.svg"] = generic_placeholder(
    "hand-gesture-ml.svg",
    "Hand Gesture Classification (ML)",
    "machine learning",
    "Klasifikasi Gestur Tangan — Rock, Paper, Scissors",
    "Alur machine learning dari gambar input hingga prediksi kelas.",
    [
        ("Image Preprocessing", "Persiapan dan pembersihan data gambar gestur"),
        ("Model Training", "Pelatihan model klasifikasi tiga kelas"),
        ("Model Evaluation", "Penilaian performa klasifikasi dan akurasi"),
        ("Prediction Workflow", "Alur prediksi dari gambar input"),
    ],
)

for name, svg in files.items():
    path = os.path.join(out_dir, name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(svg)
    print(f"{name}: {len(svg)} bytes")

print(f"\nWrote {len(files)} placeholders to {out_dir}")
