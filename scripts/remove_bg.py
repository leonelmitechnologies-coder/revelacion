"""Quita el fondo blanco de las imagenes y las guarda como PNG transparente.

Usa flood-fill desde los bordes para volver transparente solo el fondo,
conservando los blancos internos del dibujo.
"""
import sys
from pathlib import Path

from PIL import Image, ImageDraw, ImageFilter

ROOT = Path(__file__).resolve().parent.parent
ASSETS = ROOT / "assets"

FILES = {
    "WhatsApp Image 2026-07-03 at 3.13.19 PM.jpeg": "chebi.png",
    "WhatsApp Image 2026-07-03 at 3.13.19 PM (1).jpeg": "tochi.png",
    "WhatsApp Image 2026-07-07 at 6.48.49 PM (1).jpeg": "team-boy.png",
    "WhatsApp Image 2026-07-07 at 6.48.49 PM (2).jpeg": "team-girl.png",
}

MARKER = (255, 0, 255)  # magenta, no aparece en las imagenes
THRESH = 60


def remove_bg(src: Path, dst: Path) -> None:
    img = Image.open(src).convert("RGB")
    w, h = img.size

    # Flood fill desde los 4 bordes (cada 20 px) para cubrir todo el fondo
    seeds = [(x, y) for x in range(0, w, 20) for y in (0, h - 1)]
    seeds += [(x, y) for y in range(0, h, 20) for x in (0, w - 1)]
    for seed in seeds:
        if img.getpixel(seed) != MARKER:
            r, g, b = img.getpixel(seed)
            if r > 200 and g > 200 and b > 200:
                ImageDraw.floodfill(img, seed, MARKER, thresh=THRESH)

    # Alpha: 0 donde quedo el marcador
    rgba = Image.open(src).convert("RGBA")
    px_marked = img.load()
    px_out = rgba.load()
    for y in range(h):
        for x in range(w):
            if px_marked[x, y] == MARKER:
                px_out[x, y] = (255, 255, 255, 0)

    # Suavizar el borde del recorte con un blur ligero del canal alpha
    r, g, b, a = rgba.split()
    a = a.filter(ImageFilter.GaussianBlur(1.2))
    rgba = Image.merge("RGBA", (r, g, b, a))

    # Recortar margenes transparentes
    bbox = rgba.getbbox()
    if bbox:
        rgba = rgba.crop(bbox)

    ASSETS.mkdir(exist_ok=True)
    rgba.save(dst, "PNG")
    print(f"{src.name} -> {dst.relative_to(ROOT)} {rgba.size}")


if __name__ == "__main__":
    ok = True
    for src_name, dst_name in FILES.items():
        src = ROOT / src_name
        if not src.exists():
            print(f"NO ENCONTRADA: {src_name}", file=sys.stderr)
            ok = False
            continue
        remove_bg(src, ASSETS / dst_name)
    sys.exit(0 if ok else 1)
