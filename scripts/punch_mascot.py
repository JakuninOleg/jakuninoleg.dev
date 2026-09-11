from PIL import Image
from pathlib import Path


def punch(src: Path, dst: Path) -> None:
    im = Image.open(src).convert("RGBA")
    px = im.load()
    w, h = im.size
    for y in range(h):
        for x in range(w):
            r, g, b, a = px[x, y]
            luma = 0.2126 * r + 0.7152 * g + 0.0722 * b
            # Key near-black studio plate
            if luma < 18 and max(r, g, b) < 28:
                px[x, y] = (0, 0, 0, 0)
            elif luma < 36 and max(r, g, b) < 48:
                alpha = int(max(0, min(255, (luma - 18) / 18 * 255)))
                px[x, y] = (r, g, b, alpha)

    bbox = im.getbbox()
    if bbox:
        im = im.crop(bbox)

    # Keep character from touching edges
    pad = int(max(im.size) * 0.06)
    side = max(im.size) + pad * 2
    canvas = Image.new("RGBA", (side, side), (0, 0, 0, 0))
    ox = (side - im.size[0]) // 2
    oy = (side - im.size[1]) // 2
    canvas.paste(im, (ox, oy), im)
    canvas.save(dst, optimize=True)
    print(dst.name, canvas.size)


assets = Path(r"C:\Users\olegk\.cursor\projects\c-Users-olegk-code-portfolio\assets")
out = Path(r"C:\Users\olegk\code\portfolio\public\mascot")
out.mkdir(parents=True, exist_ok=True)
punch(assets / "mascot-base-v2.png", out / "mascot-base.png")
punch(assets / "mascot-reveal-v2.png", out / "mascot-reveal.png")
