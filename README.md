# Capt. Mahajan & Sons KotaStone — v2 (Phase 1)

Minimal Next.js + Tailwind scaffold for Phase 1 (homepage, categories, sample products, cart store stub).

Quick start:

```bash
cd capt-mahajan-v2
npm install
npm run dev
```

To download remote product and category images into `public/` and generate local JSON files, run:

```bash
npm run download-images
```

This creates `data/products.local.json` and `data/categories.local.json` and saves images under `public/products/` and `public/categories/`.

What's included (Phase 1):
- App router skeleton (`app/page.tsx`, `app/layout.tsx`)
- Tailwind config
- Sample `data/products.json` and `data/categories.json`
- Core components: `Hero`, `CategoryGrid`, `ProductCarousel`, `ContactSection`
- Zustand cart store stub
- EmailJS placeholder lib

Next steps: implement category pages, cart drawer wiring, EmailJS integration, WhatsApp redirect, SEO, and deploy to Vercel.
