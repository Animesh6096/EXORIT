"""
Generates transparent-background cut-outs of the founder portraits for the Team
page, where each head breaks out above a rounded panel.

Runs entirely locally with rembg (U2Net) — no third-party upload of the
founders' photos. Set up once:

    python3.12 -m venv /tmp/rembg-env
    /tmp/rembg-env/bin/pip install "rembg[cpu]" pillow

Then:

    /tmp/rembg-env/bin/python scripts/generate-team-cutouts.py

Reads from ../assets-src/originals and writes WebP with alpha to
public/team/<name>-cutout.webp. The first run downloads the U2Net model to
~/.u2net (about 175 MB) and is slow; later runs are fast.
"""

from pathlib import Path

import numpy as np
from PIL import Image
from rembg import new_session, remove
from scipy import ndimage

REPO_ROOT = Path(__file__).resolve().parent.parent
ORIGINALS = REPO_ROOT.parent / "assets-src" / "originals"
OUT_DIR = REPO_ROOT / "public" / "team"

# Long edge of the exported cut-out. The portraits render around 380px wide on
# desktop, so 900 leaves comfortable headroom for 2x displays.
TARGET_LONG_EDGE = 900

# `crop` is (left, upper, right, lower) applied to the source before removal.
# Tawhid's photo was taken at a crowded event with another guest overlapping his
# shoulder, so it needs cropping down to roughly the same head-and-shoulders
# framing as the two studio portraits. Replace it with a real headshot when one
# exists and the crop can go.
SOURCES = [
    {"src": "Animesh.png", "out": "animesh-cutout.webp", "crop": None},
    {"src": "Golam_Tawhid.jpg", "out": "tawhid-cutout.webp", "crop": (500, 150, 1180, 900)},
    {"src": "Maisha.png", "out": "maisha-cutout.webp", "crop": None},
]


def keep_largest_subject(image: Image.Image) -> Image.Image:
    """Drop everything but the largest connected blob in the alpha channel.

    Background-removal models keep any salient subject, so a bystander standing
    behind the person survives as a second floating blob. Keeping only the
    largest connected region removes them, provided they are not touching the
    intended subject.
    """
    alpha = np.array(image.getchannel("A"))
    labels, count = ndimage.label(alpha > 8)
    if count <= 1:
        return image

    # Index 0 is background; find the largest labelled region.
    sizes = ndimage.sum(np.ones_like(labels), labels, range(1, count + 1))
    largest_label = int(np.argmax(sizes)) + 1

    cleaned_alpha = np.where(labels == largest_label, alpha, 0).astype(np.uint8)
    result = image.copy()
    result.putalpha(Image.fromarray(cleaned_alpha))
    print(f"  removed {count - 1} stray region(s) from the cut-out")
    return result


def trim_to_subject(image: Image.Image, padding: int = 12) -> Image.Image:
    """Crop to the subject's alpha bounding box so the cut-out has no dead space.

    Without this the PNG keeps the original frame's empty margins, which makes
    positioning the head relative to the panel guesswork in CSS.
    """
    bbox = image.getbbox()
    if not bbox:
        return image

    left, upper, right, lower = bbox
    left = max(0, left - padding)
    upper = max(0, upper - padding)
    right = min(image.width, right + padding)
    lower = min(image.height, lower + padding)
    return image.crop((left, upper, right, lower))


def main() -> None:
    OUT_DIR.mkdir(parents=True, exist_ok=True)
    session = new_session("u2net")

    for entry in SOURCES:
        source_path = ORIGINALS / entry["src"]
        if not source_path.exists():
            print(f"skipped {entry['src']} — not found at {source_path}")
            continue

        with Image.open(source_path) as src:
            src = src.convert("RGBA")
            if entry["crop"]:
                src = src.crop(entry["crop"])
            # alpha_matting gives a far cleaner edge on hair, which is the part
            # that gives away a bad cut-out. Both portraits are dark hair on a
            # dark ground, which is the hard case for a plain threshold.
            cut = remove(
                src,
                session=session,
                alpha_matting=True,
                alpha_matting_foreground_threshold=270,
                alpha_matting_background_threshold=20,
                alpha_matting_erode_size=11,
            )

        cut = keep_largest_subject(cut)
        cut = trim_to_subject(cut)
        cut.thumbnail((TARGET_LONG_EDGE, TARGET_LONG_EDGE), Image.LANCZOS)

        out_path = OUT_DIR / entry["out"]
        cut.save(out_path, "WEBP", quality=88, method=6)
        size_kb = out_path.stat().st_size / 1024
        print(f"generated {out_path.relative_to(REPO_ROOT)} — {cut.width}x{cut.height}, {size_kb:.0f} kB")


if __name__ == "__main__":
    main()
