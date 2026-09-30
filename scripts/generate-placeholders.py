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


# ------------------------------------------------------------------ carbon dash
body = [
    card(40, 104, 1200, 96, PAPER),
    label(72, 152, "Estimasi Emisi Karbon Penerbangan", 22, 700),
    label(72, 180, "Ringkasan bulanan berdasarkan data rute dan bandara", 15, 500, MUTED),
]
for i, (title, value) in enumerate(
    [("Total emisi terhitung", "placeholder"), ("Rute aktif", "placeholder"),
     ("Bandara terdaftar", "placeholder")]
):
    x = 40 + i * 408
    body += [
        card(x, 224, 384, 128),
        label(x + 32, 268, title, 14, 500, MUTED),
        label(x + 32, 316, value, 26, 700, INK),
    ]
body += [
    card(40, 372, 1200, 396),
    label(72, 412, "Emisi per Bulan (estimasi)", 18, 700),
    line_chart(72, 448, 1136, 280,
               [0.30, 0.36, 0.33, 0.44, 0.50, 0.47, 0.56, 0.62, 0.58, 0.66, 0.74, 0.80]),
    label(72, 744, "Data pada grafik adalah contoh tampilan — angka sebenarnya belum tersedia.", 13, 500, MUTED),
]
files["carbon-dashboard.svg"] = scroller(
    "Carbon Emission Dashboard", "statistik emisi", "\n  ".join(body)
)


# ---------------------------------------------------------------- carbon route
body = [
    card(40, 104, 1200, 96, PAPER),
    label(72, 152, "Peta Rute Penerbangan &amp; Bandara", 22, 700),
    label(72, 180, "Visualisasi rute dan estimasi emisi per penerbangan", 15, 500, MUTED),
    card(40, 224, 880, 544),
    label(72, 264, "Route Map", 18, 700),
    '<rect x="88" y="292" width="800" height="448" rx="12" fill="#0F172A"/>',
]
body += [
    '<path d="M150,640 q120,-180 250,-140 q140,44 230,-60 q110,-130 240,-90" '
    f'fill="none" stroke="{ACCENT}" stroke-width="4" stroke-dasharray="10 8"/>',
    '<path d="M170,420 q180,90 300,40 q160,-70 300,120" fill="none" '
    'stroke="#60A5FA" stroke-width="3" stroke-dasharray="8 8" opacity="0.8"/>',
]
for name, px, py in [
    ("CGK", 200, 610), ("DPS", 430, 470), ("SUB", 360, 520),
    ("UPG", 620, 420), ("BPN", 560, 350), ("DJJ", 830, 380),
]:
    body += [
        f'<circle cx="{px}" cy="{py}" r="8" fill="#FFFFFF"/>',
        f'<circle cx="{px}" cy="{py}" r="16" fill="none" stroke="{ACCENT}" stroke-width="2" opacity="0.6"/>',
        label(px, py + 30, name, 13, 700, "#E2E8F0", "middle"),
    ]
body += [
    card(952, 224, 288, 544),
    label(984, 264, "Detail Rute", 18, 700),
]
route_detail = [
    ("Rute", "CGK → DPS"),
    ("Jarak", "placeholder"),
    ("Estimasi emisi", "placeholder"),
    ("Jumlah penerbangan", "placeholder"),
    ("Status data", "concept"),
]
for i, (k, v) in enumerate(route_detail):
    y = 300 + i * 88
    body += [
        card(976, y, 240, 70, PAPER, BORDER, 12),
        label(996, y + 30, k, 13, 500, MUTED),
        label(1196, y + 54, v, 15, 700, INK, "end"),
    ]
files["carbon-route-map.svg"] = scroller(
    "Peta Rute Penerbangan", "route &amp; bandara", "\n  ".join(body)
)


# --------------------------------------------------------------------- wifi7
body = [
    card(40, 104, 1200, 180, PAPER),
    label(72, 152, "Wi-Fi 7 Development Analysis in Indonesia", 26, 700),
    label(72, 190, "PT Telkom Indonesia — Independent Internship, Digital Connectivity Service", 15, 500, MUTED),
    label(72, 250, "Komparasi generasi Wi-Fi", 15, 600, ACCENT),
    card(1020, 132, 188, 44, INK, INK, 10),
    label(1114, 160, "Riset 2025", 14, 600, "#FFFFFF", "middle"),

    card(40, 308, 1200, 212),
    label(72, 348, "Perbandingan Wi-Fi 6 / 6E / 7", 18, 700),
]
gens = [("Wi-Fi 6", 0.45), ("Wi-Fi 6E", 0.68), ("Wi-Fi 7", 0.92)]
for i, (name, v) in enumerate(gens):
    x = 72 + i * 384
    body += [
        card(x, 372, 344, 116, PAPER, BORDER, 12),
        label(x + 24, 410, name, 17, 700),
        f'<rect x="{x + 24}" y="{444}" width="296" height="14" rx="7" fill="#E2E8F0"/>',
        f'<rect x="{x + 24}" y="{444}" width="{296 * v:.0f}" height="14" rx="7" fill="{ACCENT}"/>',
        label(x + 24, 480, "Kapasitas &amp; latensi (ilustrasi kualitatif)", 12, 500, MUTED),
    ]
body += [
    card(40, 544, 592, 224),
    label(72, 584, "Fokus Riset", 18, 700),
]
for i, txt in enumerate(
    ["Karakteristik teknis Wi-Fi 7 (MLO, 320 MHz, 4K-QAM)",
     "Kebutuhan jaringan nirkabel enterprise",
     "Eksplorasi teknologi IoT",
     "Kesiapan infrastruktur di Indonesia"]
):
    body += [
        f'<circle cx="80" cy="{622 + i * 40}" r="4" fill="{ACCENT}"/>',
        label(96, 627 + i * 40, txt, 14, 500, SLATE),
    ]
body += [
    card(656, 544, 584, 224),
    label(688, 584, "Kesiapan Implementasi", 18, 700),
    label(688, 636, "Perangkat &amp; klien", 15, 500, MUTED),
    label(1208, 636, "Analisis", 15, 700, INK, "end"),
    label(688, 686, "Infrastruktur operator", 15, 500, MUTED),
    label(1208, 686, "Analisis", 15, 700, INK, "end"),
    label(688, 736, "Tantangan adopsi", 15, 500, MUTED),
    label(1208, 736, "Analisis", 15, 700, INK, "end"),
]
files["wifi7-research.svg"] = scroller(
    "Riset Wi-Fi 7", "ringkasan penelitian", "\n  ".join(body)
)


# ---------------------------------------------------------------- telkom web
body = [
    '<rect x="0" y="72" width="248" height="728" fill="#1E293B"/>',
    f'<rect x="28" y="112" width="36" height="36" rx="10" fill="{ACCENT}"/>',
    label(80, 138, "Work Progress", 15, 700, "#FFFFFF"),
]
for i, item in enumerate(["Dashboard", "Daftar Pekerjaan", "Progress", "Laporan", "Pengguna"]):
    y = 200 + i * 56
    active = i == 1
    if active:
        body.append(f'<rect x="20" y="{y - 20}" width="208" height="40" rx="10" fill="{ACCENT}"/>')
    body.append(
        label(44, y + 6, item, 14, 600 if active else 500,
              "#FFFFFF" if active else "#94A3B8")
    )
body += [
    label(288, 140, "Daftar Pekerjaan", 24, 700),
    label(288, 170, "Ringkasan progres pekerjaan per unit", 14, 500, MUTED),
    card(288, 196, 400, 44, "#FFFFFF", BORDER, 10),
    label(308, 224, "Cari pekerjaan…", 14, 500, MUTED),
    card(1104, 196, 136, 44, ACCENT, ACCENT, 10),
    label(1172, 224, "+ Tambah", 14, 600, "#FFFFFF", "middle"),
]
rows = [
    ("Penyusunan laporan bulanan", "Selesai", "#10B981", "Admin TI"),
    ("Pemeliharaan basis data", "Berjalan", "#2563EB", "Operator"),
    ("Dokumentasi prosedur kerja", "Berjalan", "#2563EB", "Admin TI"),
    ("Pembaruan dashboard operasi", "Review", "#F59E0B", "Tim Data"),
    ("Verifikasi data bandara", "Selesai", "#10B981", "Operator"),
]
for i, (task, status, color, owner) in enumerate(rows):
    y = 272 + i * 84
    body += [
        card(288, y, 952, 68, "#FFFFFF", BORDER, 12),
        label(312, y + 42, task, 15, 600, INK),
        label(860, y + 42, owner, 14, 500, MUTED, "end"),
        f'<rect x="916" y="{y + 20}" width="118" height="30" rx="15" fill="{color}" opacity="0.14"/>',
        label(975, y + 40, status, 13, 700, color, "middle"),
    ]
body += [
    card(288, 700, 952, 68, PAPER, BORDER, 12),
    label(312, 742, "Catatan: nama pekerjaan dan status adalah contoh tampilan.", 13, 500, MUTED),
]
files["telkom-web.svg"] = scroller(
    "Website Work Progress Telkom", "daftar progres", "\n  ".join(body)
)


# ---------------------------------------------------------------- telkom figma
body = [
    '<rect x="0" y="72" width="1200" height="60" fill="#EFF6FF"/>',
    label(40, 112, "Figma — Website Work Progress", 16, 700, INK),
    label(1160, 112, "Wireframe / UI Design", 14, 600, ACCENT, "end"),
    card(40, 156, 1160, 604, "#F1F5F9", BORDER, 16),
    f'<text x="620" y="196" font-family="{FONT}" font-size="14" font-weight="600" fill="{MUTED}" text-anchor="middle">Frame: Desktop 1440 — Work Progress Website</text>',
]
# wireframe artboards
body += [
    card(88, 224, 1064, 64, "#FFFFFF", "#CBD5E1", 10),
    label(112, 262, "Navbar — logo · menu · user", 13, 500, MUTED),
    f'<rect x="1088" y="240" width="44" height="32" rx="8" fill="{ACCENT}" opacity="0.2"/>',
    card(88, 304, 296, 264, "#FFFFFF", "#CBD5E1", 10),
    label(112, 340, "Sidebar", 13, 600, SLATE),
]
for i in range(4):
    body.append(
        f'<rect x="112" y="{360 + i * 42}" width="248" height="24" rx="6" fill="#E2E8F0"/>'
    )
body += [card(400, 304, 752, 264, "#FFFFFF", "#CBD5E1", 10), label(424, 340, "Dashboard", 13, 600, SLATE)]
for i, h in enumerate([0.45, 0.62, 0.5]):
    body.append(
        f'<rect x="{448 + i * 232}" y="{440 - 100 * h:.0f}" width="184" '
        f'height="{100 * h:.0f}" rx="8" fill="{ACCENT}" opacity="{0.18 + i * 0.16:.2f}"/>'
    )
body += [
    card(88, 588, 1064, 148, "#FFFFFF", "#CBD5E1", 10),
    label(112, 624, "Tabel Pekerjaan — kolom: pekerjaan · PIC · status · deadline", 13, 600, SLATE),
]
for i in range(3):
    body.append(
        f'<rect x="112" y="{642 + i * 28}" width="1016" height="16" rx="6" fill="#E2E8F0"/>'
    )
body += [
    f'<text x="620" y="780" font-family="{FONT}" font-size="13" font-weight="500" fill="{MUTED}" text-anchor="middle">Placeholder wireframe — ganti dengan ekspor PNG/JPG dari Figma.</text>',
]
files["telkom-figma.svg"] = scroller(
    "Wireframe Figma Telkom", "UI/UX design", "\n  ".join(body)
)


# --------------------------------------------------------------------------- write
out_dir = os.path.join(os.path.dirname(OUT), "public", "projects")
out_dir = os.path.normpath(out_dir)
os.makedirs(out_dir, exist_ok=True)

for name, svg in files.items():
    path = os.path.join(out_dir, name)
    with open(path, "w", encoding="utf-8") as fh:
        fh.write(svg)
    print(f"{name}: {len(svg)} bytes")

print(f"\nWrote {len(files)} placeholders to {out_dir}")
