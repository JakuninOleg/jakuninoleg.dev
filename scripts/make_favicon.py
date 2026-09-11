from PIL import Image
from pathlib import Path
import base64
import io

src = Path(r"C:\Users\olegk\.cursor\projects\c-Users-olegk-code-portfolio\assets\oleg-favicon-bust.png")
im = Image.open(src).convert("RGBA")
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

bbox = im.getbbox()
if bbox:
    im = im.crop(bbox)
side = max(im.size)
pad = int(side * 0.06)
canvas = Image.new("RGBA", (side + pad * 2, side + pad * 2), (0, 0, 0, 0))
canvas.paste(im, ((canvas.size[0] - im.size[0]) // 2, (canvas.size[1] - im.size[1]) // 2), im)

app = Path(r"C:\Users\olegk\code\portfolio\src\app")
pub = Path(r"C:\Users\olegk\code\portfolio\public\favicon")
pub.mkdir(parents=True, exist_ok=True)
tmp = Path(r"C:\Users\olegk\code\portfolio\tmp-favicon")
tmp.mkdir(exist_ok=True)

master = canvas
master.save(tmp / "master.png", optimize=True)
master.save(pub / "favicon-source.png", optimize=True)

sizes = {
    app / "icon.png": 32,
    app / "apple-icon.png": 180,
    pub / "favicon-96x96.png": 96,
    pub / "apple-touch-icon.png": 180,
    Path(r"C:\Users\olegk\code\portfolio\public\icon-192.png"): 192,
}
for path, size in sizes.items():
    master.resize((size, size), Image.Resampling.LANCZOS).save(path, optimize=True)
    print("wrote", path.name, size)

ico_sizes = [(16, 16), (32, 32), (48, 48)]
ico_imgs = [master.resize(s, Image.Resampling.LANCZOS) for s in ico_sizes]
ico_imgs[0].save(pub / "favicon.ico", format="ICO", sizes=ico_sizes)
ico_imgs[0].save(app / "favicon.ico", format="ICO", sizes=ico_sizes)
print("wrote favicon.ico")

buf = io.BytesIO()
master.resize((128, 128), Image.Resampling.LANCZOS).save(buf, format="PNG")
b64 = base64.b64encode(buf.getvalue()).decode("ascii")
svg = (
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128 128">\n'
    f'  <image href="data:image/png;base64,{b64}" width="128" height="128"/>\n'
    "</svg>\n"
)
(pub / "favicon.svg").write_text(svg, encoding="utf-8")
print("wrote favicon.svg", len(svg))
