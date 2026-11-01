# Shivam Pandey — 3D Developer Portfolio

Premium interactive portfolio built with React, TypeScript, Tailwind CSS, Three.js (React Three Fiber) and Framer Motion.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173

## Production build

```bash
npm run build
npm run preview
```

Output goes to `dist/`.

## Deploy (free)

**Vercel** — https://vercel.com/new
1. Push this folder to a GitHub repository.
2. Import the repo in Vercel. Framework auto-detected: **Vite**. Build command `npm run build`, output `dist`. Deploy.

**Netlify** — https://app.netlify.com/drop or connect the repo:
- Build command: `npm run build`
- Publish directory: `dist`

**GitHub Pages** — build `dist/` and publish with any Pages workflow, or use the `vite-plugin-gh-pages` style flow.

## Notes

- Profile photo: `public/images/shiva.JPEG` (served at `/images/shiva.JPEG`).
- Contact form validates input and opens the visitor's email client via `mailto:` — no backend or third-party service is configured, so nothing is faked.
- Three.js is code-split and only loaded in the hero; particles reduce automatically on mobile, and the 3D scene is skipped when WebGL is unavailable or the user prefers reduced motion.
