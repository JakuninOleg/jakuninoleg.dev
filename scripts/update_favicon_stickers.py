from PIL import Image, ImageFilter
from pathlib import Path
import base64
import io

assets = Path(r"C:\Users\olegk\.cursor\projects\c-Users-olegk-code-portfolio\assets")
mascot = Path(r"C:\Users\olegk\code\portfolio\public\mascot")
app = Path(r"C:\Users\olegk\code\portfolio\src\app")
pub = Path(r"C:\Users\olegk\code\portfolio\public\favicon")
pub.mkdir(parents=True, exist_ok=True)


def punch_black(im: Image.Image) -> Image.Image:
    im = im.convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            if luma < 18 and max(r, g, b) < 28:
                px[x, y] = (0, 0, 0, 0)
            elif luma < 34 and max(r, g, b) < 46:
                alpha = int(max(0, min(255, (luma - 18) / 18 * 255)))
                px[x, y] = (r, g, b, alpha)
    return im


def fit_square(im: Image.Image, side: int = 1100, bottom_pad: bool = True) -> Image.Image:
    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)
    pad = int(side * 0.06)
    scale = min((side - pad * 2) / im.size[0], (side - pad * 2) / im.size[1])
    nw, nh = int(im.size[0] * scale), int(im.size[1] * scale)
    im2 = im.resize((nw, nh), Image.Resampling.LANCZOS)
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - nw) // 2
    oy = side - nh - pad if bottom_pad else (side - nh) // 2
    canvas.paste(im2, (ox, oy), im2)
    return canvas


# favicon
fav = punch_black(Image.open(assets / "oleg-favicon-light.png"))
bbox = fav.getbbox()
if bbox:
    fav = fav.crop(bbox)
side = max(fav.size)
pad = int(side * 0.08)
master = Image.new("RGBA", (side + pad * 2, side + pad * 2), (0, 0, 0, 0))
master.paste(fav, ((master.size[0] - fav.size[0]) // 2, (master.size[1] - fav.size[1]) // 2), fav)

for path, size in {
    app / "icon.png": 32,
    app / "apple-icon.png": 180,
    pub / "favicon-96x96.png": 96,
    pub / "apple-touch-icon.png": 180,
    Path(r"C:\Users\olegk\code\portfolio\public\icon-192.png"): 192,
}.items():
    master.resize((size, size), Image.Resampling.LANCZOS).save(path, optimize=True)

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico = [master.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
ico[0].save(pub / "favicon.ico", format="ICO", sizes=ico_sizes)
ico[0].save(app / "favicon.ico", format="ICO", sizes=ico_sizes)

buf = io.BytesIO()
master.resize((128, 128), Image.Resampling.LANCZOS).save(buf, format="PNG")
b64 = base64.b64encode(buf.getvalue()).decode("ascii")
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">\n'
    f'  <image href="data:image/png;base64,{b64}" width="128" height="128"/>\n'
    "</svg>\n"
)
(pub / "favicon.svg").write_text(svg, encoding="utf-8")
print("favicon done")

# stickers
base = Image.open(mascot / "mascot-base.png").convert("RGBA")
reveal = fit_square(punch_black(Image.open(assets / "oleg-mascot-reveal-python.png")))
reveal.save(mascot / "mascot-reveal.png", optimize=True)

mask = base.split()[-1]
dilated = mask.filter(ImageFilter.MaxFilter(21))
for _ in range(3):
    dilated = dilated.filter(ImageFilter.MaxFilter(13))
dilated = dilated.filter(ImageFilter.GaussianBlur(2))

stickers = reveal.copy()
sp, mp, rp = stickers.load(), dilated.load(), reveal.load()
w, h = stickers.size
for y in range(h):
    for x in range(w):
        r, g, b, a = rp[x, y]
        m = mp[x, y]
        if a == 0:
            continue
        if m > 18:
            sp[x, y] = (0, 0, 0, 0)
            continue
        luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
        chroma = max(r, g, b) - min(r, g, b)
        if luma < 40 and chroma < 28 and 250 < x < 850 and 40 < y < 1080:
            sp[x, y] = (0, 0, 0, 0)

stickers.save(mascot / "mascot-stickers.png", optimize=True)
print("stickers done")
