# Garnier Color Naturals — Shade Finder Kiosk

Interactive 5-question shade-finder for the Garnier Color Naturals Eid activation.
Built for a landscape touchscreen kiosk (16:9, 1920×1080), fully offline.

## How to run
Open `index.html` in a browser (Chrome recommended). Keep the whole folder together.
For a real kiosk, launch locked to the app:
    chrome --kiosk "file:///FULL/PATH/index.html"

## Folder structure
    index.html              – markup (landing, quiz, result)
    css/style.css           – styling, fonts, animations
    js/script.js            – quiz data, exact result logic, interactions
    assets/
      fonts/                – TrashHand (.woff2 + .ttf) + Poppins + brush fallback
      images/
        logo.png            – Garnier logo (recoloured for light background)
        logo-white.png      – white logo (for dark/green backgrounds)
        shades/             – product packs per shade (box_1.webp … box_7_3.webp)
        float/              – floating botanicals (avocado, olive, leaf, drop SVGs)

## Fonts
Main brand font is "Trash Hand" (installed at assets/fonts/TrashHand.woff2 / .ttf).
Poppins is used only for body sentences and fine print, for readability.

## Editing content
- Questions, the 32-combination result mapping, shade names and result lines:
  data tables at the top of js/script.js.
- Idle auto-reset timing + brand colours: :root in css/style.css.

## Shade ↔ product pack mapping (please confirm with client)
The quiz logic uses 8 shade codes, mapped to the 7 packs provided:
    1  → box_1     4  → box_4     5  → box_5     7.3 → box_7_3
    6.60 (Intense Red)   → box_6_66   (name matches)
    5.32 (Caramel Brown) → box_5_3    (closest available)
    3.16 (Burgundy)      → box_3_6    (closest available)
    3    (Darkest Brown) → box_3_6    (no dedicated pack provided)
To use a different pack: add the image to assets/images/shades/ and update the
`box` value in the SHADES table in js/script.js.
