"""Optimize Kling frames for web hero scroll animation.

Produces three resolution tiers under public/frames:
  - mobile  (640w)   : low-data devices
  - tablet  (960w)   : medium devices
  - desktop (1440w)  : full quality for big screens

Output format: WebP at quality 75 (visually lossless, ~10x smaller than JPG).
We keep all 151 frames so the cinematic scroll feels frame-perfect.
"""

from __future__ import annotations

from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
SRC = ROOT / "temp_frames"
OUT = ROOT / "public" / "frames"

TIERS = {
    "mobile": 640,
    "tablet": 960,
    "desktop": 1440,
}


def main() -> None:
    frames = sorted(SRC.glob("ezgif-frame-*.jpg"))
    if not frames:
        print(f"No frames found in {SRC}")
        return

    print(f"Processing {len(frames)} frames -> {OUT}")
    for tier, width in TIERS.items():
        (OUT / tier).mkdir(parents=True, exist_ok=True)

    for index, src_path in enumerate(frames, start=1):
        with Image.open(src_path) as img:
            img = img.convert("RGB")
            for tier, target_w in TIERS.items():
                ratio = target_w / img.width
                target_h = int(img.height * ratio)
                resized = img.resize((target_w, target_h), Image.LANCZOS)
                dst = OUT / tier / f"frame-{index:03d}.webp"
                quality = 70 if tier == "desktop" else 65
                resized.save(dst, "WEBP", quality=quality, method=6)
        if index % 25 == 0 or index == len(frames):
            print(f"  ...{index}/{len(frames)}")

    total_kb = sum(f.stat().st_size for f in OUT.rglob("*.webp")) / 1024
    print(f"Done. Total size: {total_kb / 1024:.2f} MB across {len(frames) * 3} files")


if __name__ == "__main__":
    main()
