#!/usr/bin/env python3
"""
Membuat ikon situs dari mark yang sama dengan `public/favicon.svg`:
kotak gelap membulat + palang biru di atas + batang putih (huruf "T").

Hasil:
  public/favicon.ico          - 16/24/32/48 px, untuk tab browser & bookmark
  public/apple-touch-icon.png - 180x180 px, untuk "Add to Home Screen" di iOS
                                (iOS tidak membaca SVG, jadi berkas raster ini
                                yang wajib ada; SVG saja akan tampil kosong)

Jalankan setelah mengubah favicon.svg:

  python scripts/generate-favicon.py

Butuh Pillow (`pip install Pillow`). Warna & geometri di bawah disalin dari
favicon.svg (viewBox 0 0 64 64) supaya mark-nya identik.
"""

from pathlib import Path

from PIL import Image, ImageDraw

ROOT = Path(__file__).resolve().parent.parent
PUBLIC = ROOT / "public"

BG = (15, 23, 42, 255)  # #0F172A
ACCENT = (37, 99, 235, 255)  # #2563EB
STEM = (248, 250, 252, 255)  # #F8FAFC

SS = 8  # supersampling, supaya tepinya halus
ICO_SIZES = [(16, 16), (24, 24), (32, 32), (48, 48)]
APPLE_SIZE = (180, 180)


def render_master() -> Image.Image:
    """Mark 64x64 digambar pada 512x512 lalu diperkecil saat diekspor."""
    n = 64 * SS
    k = n / 64
    img = Image.new("RGBA", (n, n), (0, 0, 0, 0))
    draw = ImageDraw.Draw(img)

    draw.rounded_rectangle([0, 0, n - 1, n - 1], radius=14 * k, fill=BG)

    width = 5 * k

    def stroke(x1: float, y1: float, x2: float, y2: float, color) -> None:
        """Garis dengan ujung membulat, seperti stroke-linecap="round"."""
        draw.line([x1 * k, y1 * k, x2 * k, y2 * k], fill=color, width=round(width))
        r = width / 2
        for x, y in ((x1, y1), (x2, y2)):
            draw.ellipse(
                [x * k - r, y * k - r, x * k + r, y * k + r],
                fill=color,
            )

    stroke(18, 22, 46, 22, ACCENT)  # palang atas huruf T
    stroke(32, 22, 32, 44, STEM)  # batang huruf T
    return img


def main() -> None:
    master = render_master()

    ico_path = PUBLIC / "favicon.ico"
    master.resize((256, 256), Image.Resampling.LANCZOS).save(
        ico_path, format="ICO", sizes=ICO_SIZES
    )
    print(f"OK  {ico_path.relative_to(ROOT)} ({ico_path.stat().st_size} bytes)")

    apple_path = PUBLIC / "apple-touch-icon.png"
    apple = Image.new("RGB", APPLE_SIZE, BG[:3])
    apple.paste(master.resize(APPLE_SIZE, Image.Resampling.LANCZOS), (0, 0))
    apple.save(apple_path, format="PNG", optimize=True)
    print(f"OK  {apple_path.relative_to(ROOT)} ({apple_path.stat().st_size} bytes)")


if __name__ == "__main__":
    main()
