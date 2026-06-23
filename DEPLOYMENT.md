# Capt. Mahajan & Sons KotaStone - Deployment Guide

## 🚀 Quick Start

This is a **mobile-first, modern product website** built with Next.js 15, React 18, Tailwind CSS, and integrated with **EmailJS** for order emails and **WhatsApp** for direct messaging.

### Project Features
✅ **Product Showcase** - Browse products by category  
✅ **Shopping Cart** - Add products, manage quantities, remove items  
✅ **Order Submission** - Submit orders via email (EmailJS) + WhatsApp redirect  
✅ **Direct WhatsApp Contact** - Floating "Message Us" button on all pages  
✅ **Mobile Responsive** - Fully optimized for mobile & tablet devices  
✅ **SEO Ready** - Sitemap.xml, robots.txt, optimized metadata  
✅ **Fast Performance** - Lazy-loaded images, preloaded critical resources  

---

## 📋 Prerequisites

- **Node.js** 18+ (download from [nodejs.org](https://nodejs.org))
- **npm** 9+ (comes with Node.js)
- **Vercel Account** (free, for deployment - [vercel.com](https://vercel.com))
- **EmailJS Account** (free plan available - [emailjs.com](https://emailjs.com))

---

## 🔧 Local Development Setup

### 1. **Clone / Navigate to Project**
```bash
cd "C:\Users\Lenovo\OneDrive\Documents\CaptMahajan&sons\capt-mahajan-v2"
```

### 2. **Install Dependencies**
```bash
npm install
```

### 3. **Create `.env.local` File** (Already Done)
The project includes a `.env.local` file with EmailJS credentials:
```env
EMAILJS_SERVICE=service_yefr2yx
EMAILJS_TEMPLATE=template_lzgf4nl
EMAILJS_USER=P6wKHr_MkAY5jJPi7
NEXT_PUBLIC_EMAILJS_SERVICE=service_yefr2yx
NEXT_PUBLIC_EMAILJS_TEMPLATE=template_lzgf4nl
NEXT_PUBLIC_EMAILJS_USER=P6wKHr_MkAY5jJPi7
```

**🔐 Note:** These credentials are loaded from `.env.local` which should **NOT** be committed to version control. For Vercel deployment, set these as environment variables in your project settings.

### 4. **Download Product Images** (Already Done)
```bash
npm run download-images
```
This downloads 35 product images from your remote source and creates local JSON data.

### 5. **Generate SEO Metadata** (Already Done)
```bash
npm run generate-sitemap
```
Generates `public/sitemap.xml` and `public/robots.txt` for SEO.

### 6. **Start Development Server**
```bash
npm run dev
```
Server runs at `http://localhost:3000`

---

## 🏗️ Project Structure

```
capt-mahajan-v2/
├── app/
│   ├── layout.tsx                    # Root layout with Header, Cart, WhatsApp button
│   ├── page.tsx                      # Home page (hero + products)
│   ├── globals.css                   # Global Tailwind styles
│   ├── api/
│   │   └── send-order/
│   │       └── route.ts              # API endpoint for order submission
│   └── products/
│       └── [category]/
│           └── page.tsx              # Dynamic category page
├── components/
│   ├── Header.tsx                    # Navigation header with cart button
│   ├── CartDrawer.tsx                # Shopping cart sidebar with order form
│   ├── CategoryGrid.tsx              # Product categories grid
│   ├── ProductCard.tsx               # Individual product card
│   ├── ProductCarousel.tsx           # Featured products carousel
│   ├── Hero.tsx                      # Hero banner section
│   ├── ContactSection.tsx            # Contact inquiry form
│   └── WhatsAppButton.tsx            # Floating WhatsApp message button
├── store/
│   └── cartStore.ts                  # Zustand cart state management
├── lib/
│   └── emailjs.ts                    # EmailJS integration
├── scripts/
│   ├── start-dev.js                  # Dev server startup script (Windows compatibility)
│   ├── download-images.js            # Download product images from remote URLs
│   └── generate-sitemap.js           # Generate sitemap & robots.txt
├── public/
│   ├── products/                     # Downloaded product images (1.jpg - 35.jpg)
│   ├── sitemap.xml                   # SEO sitemap
│   └── robots.txt                    # SEO robots file
├── data/
│   ├── products.local.json           # Local product data (generated)
│   └── categories.local.json         # Local category data (generated)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── next.config.js
```

---

## 📧 EmailJS Integration

### Configuration
The project is already configured with your EmailJS credentials:
- **Service ID:** `service_yefr2yx`
- **Template ID:** `template_lzgf4nl`
- **Public Key:** `P6wKHr_MkAY5jJPi7`
- **Recipient Email:** `chander151973@gmail.com`

### How It Works
1. User clicks **"Send Order"** in the cart drawer
2. Form validates customer name & phone
3. Cart items are sent to EmailJS API
4. Email is received at `chander151973@gmail.com`
5. WhatsApp web link opens with order summary (number: `9785843101`)

### Testing Locally
```bash
curl -X POST http://localhost:3000/api/send-order \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "phone": "9785843101",
    "items": [{"id": 1, "name": "Stone", "qty": 1}]
  }'
```

Expected response: `{"ok": true}`

---

## 🛒 Shopping Cart

### Features
- ✅ Add products to cart from category grid
- ✅ Update product quantities with +/- buttons
- ✅ Remove items from cart
- ✅ Real-time item count in header
- ✅ Slide-in drawer animation
- ✅ Order submission with customer details

### State Management
Uses **Zustand** for centralized cart state:
- `items[]` - Array of cart items
- `visible` - Cart drawer visibility
- `add(item)` - Add product to cart
- `remove(id)` - Remove product from cart
- `updateQty(id, qty)` - Update product quantity
- `toggle(visible)` - Toggle cart drawer
- `count()` - Get total item count

---

## 🚀 Deployment to Vercel

### Option 1: Deploy via GitHub (Recommended)

#### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "Initial commit: Capt. Mahajan & Sons website"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/capt-mahajan.git
git push -u origin main
```

#### Step 2: Deploy on Vercel
1. Go to [vercel.com](https://vercel.com) and sign up (free)
2. Click **"New Project"**
3. Import your GitHub repository
4. Vercel auto-detects Next.js configuration
5. **Set Environment Variables:**
   - `EMAILJS_SERVICE` = `service_yefr2yx`
   - `EMAILJS_TEMPLATE` = `template_lzgf4nl`
   - `EMAILJS_USER` = `P6wKHr_MkAY5jJPi7`
   - `NEXT_PUBLIC_EMAILJS_SERVICE` = `service_yefr2yx`
   - `NEXT_PUBLIC_EMAILJS_TEMPLATE` = `template_lzgf4nl`
   - `NEXT_PUBLIC_EMAILJS_USER` = `P6wKHr_MkAY5jJPi7`
6. Click **"Deploy"**
7. Your site will be live at `https://capt-mahajan.vercel.app`

### Option 2: Deploy via Vercel CLI
```bash
npm install -g vercel
vercel login
vercel --prod
```

Then add environment variables in Vercel dashboard.

---

## 🌍 Domain Setup (Optional)

After deploying to Vercel:

1. **Purchase a domain** (Namecheap, GoDaddy, etc.)
2. Go to Vercel **Project Settings** → **Domains**
3. Add your custom domain
4. Update DNS records according to Vercel instructions
5. Wait 24-48 hours for DNS propagation

Example: `www.captmahajan.com` → Vercel deployment

---

## 📱 WhatsApp Integration

### Configuration
- **WhatsApp Number:** `9785843101` (defined in components)
- **Contact Button:** Floating green button (bottom-right, all pages)
- **Direct Link:** `https://wa.me/9785843101`

### Customize Number
To change the WhatsApp number:

1. **WhatsAppButton.tsx:**
```tsx
const number = '9785843101'  // Change here
```

2. **CartDrawer.tsx** (order submission):
```tsx
const wa = `https://wa.me/9785843101?text=...`  // Change here
```

3. **ContactSection.tsx** (inquiry form):
```tsx
const wa = `https://wa.me/9785843101?text=...`  // Change here
```

---

## 🎨 Customization

### Change Business Name/Logo
Edit `app/layout.tsx`:
```tsx
export const metadata = {
  title: 'YOUR BUSINESS NAME',
  description: 'YOUR BUSINESS DESCRIPTION',
}
```

### Update Product Categories
Products are loaded from `data/products.local.json` and `data/categories.local.json` (generated by `npm run download-images`).

To update:
1. Modify the image URLs in your remote source
2. Run: `npm run download-images`

### Change Colors
Edit `tailwind.config.js` to customize color scheme:
```js
theme: {
  colors: {
    primary: '#663399',
    // ...
  }
}
```

### Update Contact Email
Edit `lib/emailjs.ts` or `.env.local` for EmailJS recipient changes.

---

## 📊 Performance Optimizations

✅ **Implemented:**
- Lazy-loaded product images (`loading="lazy"`)
- Image dimensions specified (prevents layout shift)
- Preloaded critical images in `layout.tsx`
- Favicon inline SVG (no external file needed)
- Minified Tailwind CSS (production build)
- Code splitting (Next.js default)
- Static site generation (home page pre-rendered)

✅ **Lighthouse Scores Target:**
- Performance: 90+
- Accessibility: 95+
- SEO: 100
- Best Practices: 95+

---

## 🛠️ Build & Production

### Build for Production
```bash
npm run build
```

Generates optimized `.next/` folder (~150MB).

### Start Production Server
```bash
npm run start
```

Runs at `http://localhost:3000` (production mode).

### Preview Lighthouse Audit
```bash
npm run build && npx lighthouse http://localhost:3000 --output-path=lighthouse-report.json
```

---

## 🔒 Security Notes

- ✅ `.env.local` is in `.gitignore` (never committed)
- ✅ EmailJS API calls use HTTPS
- ✅ No sensitive data in frontend code
- ✅ API route validates input before sending
- ✅ CORS handled by Next.js API routes

---

## 🐛 Troubleshooting

### Issue: "Cannot find module 'emailjs-com'"
**Solution:** 
```bash
npm install emailjs-com
```

### Issue: Cart not persisting on page reload
**Solution:** Cart is session-based (Zustand). To add persistence:
```tsx
// store/cartStore.ts
import { persist } from 'zustand/middleware'

const useCart = create(persist(() => ({...})))
```

### Issue: Images not loading in production
**Solution:** Ensure all product images are in `public/products/` directory and paths in `products.local.json` start with `/products/`.

### Issue: EmailJS not sending emails
**Solution:**
1. Verify `.env.local` has correct credentials
2. Restart dev server: `npm run dev`
3. Test API: `POST /api/send-order` with sample data
4. Check EmailJS dashboard for API errors

### Issue: WhatsApp link not opening
**Solution:**
1. Ensure number format is correct: `9785843101` (no + or spaces)
2. Test link: `https://wa.me/9785843101`
3. User must have WhatsApp Web enabled

---

## 📦 Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| next | 15.0.0 | React framework |
| react | 18.2.0 | UI library |
| react-dom | 18.2.0 | DOM rendering |
| tailwindcss | ^3.4.0 | CSS framework |
| zustand | ^4.0.0 | State management |
| framer-motion | ^10.0.0 | Animations |
| emailjs-com | ^3.2.0 | Email service |
| typescript | ^5.0.0 | Type safety |
| postcss | ^8.4.0 | CSS processing |
| autoprefixer | ^10.4.0 | CSS vendor prefixes |

---

## 📞 Support Contacts

**WhatsApp:** 9785843101  
**Email:** chander151973@gmail.com  
**Website:** (Vercel deployment URL)

---

## 📄 License

This project is proprietary. All rights reserved by Capt. Mahajan & Sons.

---

## ✅ Checklist Before Going Live

- [ ] Update EmailJS credentials in Vercel environment variables
- [ ] Update WhatsApp number (if different from 9785843101)
- [ ] Update business name/description in metadata
- [ ] Test order submission flow (cart → email → WhatsApp)
- [ ] Test WhatsApp contact button
- [ ] Verify all product images load correctly
- [ ] Run Lighthouse audit and verify scores
- [ ] Test on mobile devices (iPhone, Android)
- [ ] Set up custom domain (optional)
- [ ] Add Google Analytics (optional)
- [ ] Monitor EmailJS usage (free tier: 200 emails/day)

---

**Last Updated:** June 2026  
**Status:** Production Ready ✅
