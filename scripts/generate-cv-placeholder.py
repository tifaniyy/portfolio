"""Create a minimal, valid placeholder PDF at public/cv.pdf.

Replace public/cv.pdf with the real CV — no code change is required, the
"Download CV" buttons already point at /cv.pdf.
"""

import os
import zlib

PAGE_W, PAGE_H = 595, 842  # A4 @ 72dpi
LINES = [
    ("TIFANI YUNITAMI", 20, "F2"),
    ("Informatics Graduate | Data Analyst | Web Developer", 11, "F1"),
    ("", 10, "F1"),
    ("PLACEHOLDER CV", 14, "F2"),
    ("", 10, "F1"),
    ("This file is a placeholder shipped with the portfolio template.", 10, "F1"),
    ("Replace public/cv.pdf with your real CV (same file name).", 10, "F1"),
    ("", 10, "F1"),
    ("Universitas Gunadarma - S1 Informatika", 10, "F1"),
    ("GitHub: https://github.com/tifaniyy", 10, "F1"),
]


def escape(text: str) -> str:
    return text.replace("\\", r"\\").replace("(", r"\(").replace(")", r"\)")


def content_stream() -> bytes:
    parts = ["BT", "1 0 0 1 60 770 Tm", "14 TL"]
    for text, size, font in LINES:
        parts.append(f"/{font} {size} Tf")
        parts.append(f"({escape(text)}) Tj")
        parts.append("T*")
    parts.append("ET")
    return "\n".join(parts).encode("latin-1")


def build_pdf() -> bytes:
    stream = zlib.compress(content_stream())
    objects: list[bytes] = [
        b"<< /Type /Catalog /Pages 2 0 R >>",
        b"<< /Type /Pages /Kids [3 0 R] /Count 1 >>",
        (
            f"<< /Type /Page /Parent 2 0 R /MediaBox [0 0 {PAGE_W} {PAGE_H}] "
            "/Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> /Contents 4 0 R >>"
        ).encode("latin-1"),
        b"<< /Length "
        + str(len(stream)).encode()
        + b" /Filter /FlateDecode >>\nstream\n"
        + stream
        + b"\nendstream",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica /Encoding /WinAnsiEncoding >>",
        b"<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold /Encoding /WinAnsiEncoding >>",
    ]

    out = bytearray(b"%PDF-1.4\n%\xe2\xe3\xcf\xd3\n")
    offsets = [0]
    for index, body in enumerate(objects, start=1):
        offsets.append(len(out))
        out += f"{index} 0 obj\n".encode() + body + b"\nendobj\n"

    xref_pos = len(out)
    out += f"xref\n0 {len(objects) + 1}\n".encode()
    out += b"0000000000 65535 f \n"
    for offset in offsets[1:]:
        out += f"{offset:010d} 00000 n \n".encode()
    out += (
        f"trailer\n<< /Size {len(objects) + 1} /Root 1 0 R >>\n"
        f"startxref\n{xref_pos}\n%%EOF\n"
    ).encode()
    return bytes(out)


target = os.path.normpath(
    os.path.join(
        os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "cv.pdf"
    )
)
os.makedirs(os.path.dirname(target), exist_ok=True)
with open(target, "wb") as fh:
    fh.write(build_pdf())
print(f"Wrote {target} ({os.path.getsize(target)} bytes)")
