#!/usr/bin/env python3
"""
Replace 'Sanjay' with 'Roy' in app screenshot images using OCR to find text and Pillow to redraw.
Requires: pip install pillow pytesseract
System: brew install tesseract (macOS) or apt install tesseract-ocr (Linux)
"""

import os
import sys
from pathlib import Path

try:
    from PIL import Image, ImageDraw, ImageFont
except ImportError:
    print("Install Pillow: pip install pillow")
    sys.exit(1)

try:
    import pytesseract
except ImportError:
    print("Install pytesseract: pip install pytesseract")
    sys.exit(1)

# Screenshot files (relative to project root)
SCREENSHOTS = [
    "dashboard-screenshot.png",
    "N_logging_01.png",
    "N_logging_02.png",
    "coach-chat.png",
    "workout-screenshot.png",
    "nutrition-screenshot-1.png",
    "nutrition-screenshot-2.png",
]

OLD_NAME = "Sanjay"
NEW_NAME = "James"   # 5-letter name so it fills the space like "Sanjay"
# Font size (pt) for the name so it matches "Hey" / body text in the chat bubble
NAME_FONT_SIZE = 34
# Move name up a bit (negative = up, in pixels)
NAME_VERTICAL_OFFSET = -6
# Move name left (negative = left, in pixels)
NAME_HORIZONTAL_OFFSET = -8

# Project root = parent of scripts/
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent


def get_font_for_height(height_px: int):
    """Try to load a system font at a size that fits the given height (or fixed name size)."""
    size = NAME_FONT_SIZE  # fixed so "Roy" matches chat text, not OCR box
    sizes = [size, int(size * 0.95), int(size * 0.9)]
    candidates = [
        "/System/Library/Fonts/Helvetica.ttc",   # macOS
        "/System/Library/Fonts/SFNS.ttf",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
        "/usr/share/fonts/truetype/liberation/LiberationSans-Regular.ttf",
    ]
    for path in candidates:
        if os.path.isfile(path):
            for size in sizes:
                try:
                    return ImageFont.truetype(path, size)
                except OSError:
                    continue
    return ImageFont.load_default()


def replace_name_in_image(img_path: Path) -> bool:
    """Find 'Sanjay' in image via OCR and draw 'Roy' over it. Returns True if any replacement was made."""
    if not img_path.is_file():
        return False

    img = Image.open(img_path).convert("RGBA")
    width, height = img.size

    # Get word-level OCR data (bounding box + text)
    # Try sparse text mode (PSM 11) for UI screenshots; fall back to default
    try:
        data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT, config="--psm 11")
    except Exception:
        try:
            data = pytesseract.image_to_data(img, output_type=pytesseract.Output.DICT)
        except Exception as e:
            print(f"  OCR failed: {e}")
            return False

    n_boxes = len(data["text"])
    replaced = False
    draw = ImageDraw.Draw(img)

    # Also find name as the word right after "Hey" (handles OCR misreading "Roy" as "Ga" etc.)
    name_after_hey = None
    for i in range(n_boxes - 1):
        t = (data["text"][i] or "").strip().lower()
        next_t = (data["text"][i + 1] or "").strip()
        if t == "hey" and next_t and 2 <= len(next_t) <= 12:
            name_after_hey = i + 1
            break

    for i in range(n_boxes):
        text = (data["text"][i] or "").strip()
        # Match old name, new name, common variants, or the word after "Hey" (name slot)
        name_lower = text.lower()
        is_name_token = (
            text
            and (
                OLD_NAME.lower() in name_lower
                or NEW_NAME.lower() in name_lower
                or "royijay" in name_lower
                or "royjhay" in name_lower
                or (name_after_hey is not None and i == name_after_hey)
            )
        )
        if not is_name_token:
            continue
        # Use bbox of this token; we'll draw NEW_NAME only (no trailing punctuation)

        x = data["left"][i]
        y = data["top"][i]
        w = data["width"][i]
        h = data["height"][i]

        if w <= 0 or h <= 0:
            continue

        font = get_font_for_height(h)
        draw_x = x + NAME_HORIZONTAL_OFFSET
        draw_y = y + NAME_VERTICAL_OFFSET
        # Fill box: cover full OCR bbox (e.g. "Royijay") so no leftover letters; use tight box for short names
        try:
            bx1, by1, bx2, by2 = draw.textbbox((draw_x, draw_y), NEW_NAME, font=font)
        except AttributeError:
            bx1, by1, bx2, by2 = x, y, x + w, y + h
        pad = 1
        # Use union of OCR bbox and new text bbox so we always cover old text (e.g. Royijay)
        rx1 = max(0, min(x - pad, bx1 - pad))
        ry1 = max(0, min(y - pad, by1 - pad))
        rx2 = min(width, max(x + w + pad, bx2 + pad))
        ry2 = min(height, max(y + h + pad, by2 + pad))

        # Sample background from a strip LEFT of the text (chat bubble color)
        strip_w = min(12, x)
        if strip_w > 0:
            left = max(0, x - strip_w)
            strip = img.crop((left, ry1, x, ry2))
            pixels = list(strip.getdata())
        else:
            pixels = list(img.crop((rx1, ry1, rx2, ry2)).getdata())
        if pixels:
            n = len(pixels)
            rs = sorted(p[0] for p in pixels)
            gs = sorted(p[1] for p in pixels)
            bs = sorted(p[2] for p in pixels)
            mid = n // 2
            r = rs[mid] if n % 2 else (rs[mid - 1] + rs[mid]) // 2
            g = gs[mid] if n % 2 else (gs[mid - 1] + gs[mid]) // 2
            b = bs[mid] if n % 2 else (bs[mid - 1] + bs[mid]) // 2
            fill = (r, g, b, 255)
        else:
            fill = (255, 255, 255, 255)

        # Fill only the tight box around "Roy", not the old wider "Sanjay!" box
        draw.rectangle([rx1, ry1, rx2, ry2], fill=fill)

        text_color = (0, 0, 0) if (r + g + b) / 3 > 128 else (255, 255, 255)
        draw.text((draw_x, draw_y), NEW_NAME, fill=text_color, font=font)
        replaced = True

    if replaced:
        img.convert("RGB").save(img_path, "PNG", optimize=True)
        return True
    return False


def main():
    import argparse
    parser = argparse.ArgumentParser(description="Replace name in screenshot images")
    parser.add_argument("--debug", action="store_true", help="Print all OCR text from each image")
    args = parser.parse_args()

    os.chdir(PROJECT_ROOT)
    print(f"Replacing '{OLD_NAME}' with '{NEW_NAME}' in screenshots (project root: {PROJECT_ROOT})\n")

    for name in SCREENSHOTS:
        path = PROJECT_ROOT / name
        if not path.is_file():
            print(f"Skip (not found): {name}")
            continue
        print(f"Processing: {name} ... ", end="", flush=True)
        if args.debug:
            img = Image.open(path).convert("RGB")
            try:
                text = pytesseract.image_to_string(img, config="--psm 11")
            except Exception:
                text = pytesseract.image_to_string(img)
            words = [w.strip() for w in text.split() if w.strip()]
            print()
            print(f"  OCR words (sample): {words[:40]}...")
            if OLD_NAME.lower() in text.lower():
                print(f"  -> '{OLD_NAME}' IS in raw OCR output")
            continue
        if replace_name_in_image(path):
            print("replaced")
        else:
            print("no match or OCR missed it")


if __name__ == "__main__":
    main()
