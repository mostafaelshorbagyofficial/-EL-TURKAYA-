# TURKEYA — Asset Inventory (`ASSET_INVENTORY.md`)

All local assets were copied non-destructively from `D:\mhare3\pro\التركايه` into `public/assets/` preserving exact original filenames. Original source files were not modified or deleted.

## 1. Copied Local Assets (`public/assets/`)

| # | Original Filename | Public Path | Type | Dimensions | Size | Subject | Classification | Verification |
| :-: | :--- | :--- | :---: | :---: | :---: | :--- | :--- | :---: |
| 1 | `promedia-logo.png` | `/assets/promedia-logo.png` | PNG (RGBA) | 572 × 433 | 27.5 KB | ProMedia Official Logo | Brand Logo (White BG Only) | Confirmed |
| 2 | `التركايه .png` | `/assets/التركايه .png` | PNG (RGB) | 1726 × 911 | 1,165 KB | TURKEYA Official Show Logo | Brand Logo (Wood-grain BG) | Confirmed |
| 3 | `مصطفي جمال .jpeg` | `/assets/مصطفي جمال .jpeg` | JPEG | 1067 × 1600 | 228 KB | Mostafa Gamal | Guest Portrait (#1) | Confirmed |
| 4 | `لونا  الحفني .jpeg` | `/assets/لونا  الحفني .jpeg` | JPEG | 1280 × 1600 | 494 KB | Dr. Luna El Hanafy / El Hefny | Guest Portrait (#2) | Confirmed *(spelling note)* |
| 5 | `كريم الشازلي .jpeg` | `/assets/كريم الشازلي .jpeg` | JPEG | 1600 × 1600 | 251 KB | Karim El Shazly | Guest Portrait (#3) | Confirmed |
| 6 | `د-اسامه طة.jpeg` | `/assets/د-اسامه طة.jpeg` | JPEG | 1600 × 1600 | 312 KB | Dr. Osama Taha | Guest Portrait (#4) | Confirmed |
| 7 | `عمرو عزالدين.jpeg` | `/assets/عمرو عزالدين.jpeg` | JPEG | 1600 × 1116 | 232 KB | Amr Ezz (Studio Still) | Guest Portrait (#5) & Hero Studio Frame | Confirmed |
| 8 | `نِسْمَة خِضْر.jpeg` | `/assets/نِسْمَة خِضْر.jpeg` | JPEG | 1200 × 1600 | 159 KB | Nesma Khader | Guest Portrait (#6) | Confirmed |
| 9 | `ايهاب مسلم.jpg` | `/assets/ايهاب مسلم.jpg` | JPG | 492 × 623 | 21 KB | Ehab Muslim | Guest Portrait (#8, moderate res) | Confirmed |
| 10 | `محمد الهجان .jpg` | `/assets/محمد الهجان .jpg` | JPG | 447 × 447 | 11 KB | Mohamed Elhagan | Host Portrait (low res — card only) | Confirmed |
| 11 | `الزوزات.jpeg` | `/assets/الزوزات.jpeg` | JPEG | 303 × 403 | 34 KB | El-Zozat (duo portrait) | Unlisted / Uncertain (excluded from public grid) | Uncertain |

## 2. Image Optimization Strategy

- **Format Conversion:** `next.config.ts` enables `images.formats = ["image/avif", "image/webp"]` with responsive `deviceSizes` starting from `320px`.
- **Priority & Lazy Loading:** Hero logo and hero studio still use `priority`; all below-the-fold portraits use `loading="lazy"`.
- **Layout Stability (CLS):** All images live inside explicit aspect-ratio containers (`aspect-[16/11]`, `aspect-[4/5]`) or explicit `width`/`height` bounds.
- **Facial Cropping:** Portraits use `object-cover` with tuned `objectPosition` (`center 15%`–`center 22%`) to prevent head/face clipping.

## 3. Pending Assets (Not Yet Supplied)

- Portrait for **Guest #7 (Saudi Guest — Name Pending)**.
- Portrait for **Guest #9 (Dr. Ahmed El Shafie)**.
- Transparent/vector TURKEYA logo (optional upgrade).
- Dedicated episode thumbnails & Behind-the-Scenes production photographs.
- Higher-resolution portraits for **Mohamed Elhagan** and **Ehab Muslim**.
