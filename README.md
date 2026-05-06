# Career Draft

Career Draft is a job board built for early-career talent — students and candidates with 0–3 years of experience. Every listing on the platform comes with an AI-generated match score for your CV, showing exactly how well you fit the role and what to fix before you apply. Instant resume feedback, AI-powered rewrites, and one-click apply packs are built in.

## Tech stack

- **Next.js 15** — App Router, TypeScript
- **Tailwind CSS** — utility-first styling
- **lucide-react** — icons
- **Google Fonts** — Fraunces (display), Inter Tight (body), JetBrains Mono (mono)

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the landing page.

## Deploy to Vercel

**CLI (fastest):**

```bash
npm i -g vercel
vercel --prod
```

**GitHub import:**

1. Push this repo to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import the repository — Vercel auto-detects Next.js, no extra config needed
4. Click **Deploy**

## Custom domain

1. Open your project in the [Vercel dashboard](https://vercel.com/dashboard)
2. Go to **Settings → Domains**
3. Add your domain and follow the DNS instructions (CNAME or A record)

## Project structure

```
career-draft/
├── app/
│   ├── favicon.svg       # Emerald rounded-square logo
│   ├── globals.css       # Tailwind base + dark background
│   ├── layout.tsx        # Root layout with SEO metadata
│   └── page.tsx          # Landing page (single component)
├── next.config.js
├── tailwind.config.js
├── tsconfig.json
└── package.json
```
