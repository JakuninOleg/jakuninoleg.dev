"""Punch the base mascot out of the reveal PNG → stickers-only layer."""

from pathlib import Path

from PIL import Image, ImageFilter

root = Path(__file__).resolve().parents[1]
mascot = root / "public" / "mascot"

base = Image.open(mascot / "mascot-base.png").convert("RGBA")
reveal = Image.open(mascot / "mascot-reveal.png").convert("RGBA")

mask = base.split()[-1]
dilated = mask.filter(ImageFilter.MaxFilter(15))
for _ in range(2):
    dilated = dilated.filter(ImageFilter.MaxFilter(9))

stickers = reveal.copy()
sp = stickers.load()
mp = dilated.load()
rp = reveal.load()
w, h = stickers.size

for y in range(h):
    for x in range(w):
        r, g, b, a = rp[x, y]
        m = mp[x, y]
        if m > 40 and a > 0:
            fade = max(0.0, 1.0 - (m - 40) / 180.0)
            if fade <= 0.05:
                sp[x, y] = (0, 0, 0, 0)
            else:
                sp[x, y] = (r, g, b, int(a * fade))

out = mascot / "mascot-stickers.png"
stickers.save(out, optimize=True)
print("wrote", out)
