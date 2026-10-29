# Omkr — portfolio

React + TypeScript + Vite + Tailwind CSS v4 + Motion. Fonts: Geist and Geist Mono (bundled in `public/fonts`).

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # outputs dist/
```

## Make it yours

Everything editable lives in `src/data.ts`:

- `profile`: name, email, social links (an empty `href` hides the link), resume file name
- `cloudProjects`: title, summary, stack, GitHub URL (replace every `your-username` placeholder)
- `designProjects`: title, summary, and the `file` to show when a card is opened
- `about`: heading, paragraphs, skills

### Resume

Put your PDF at `public/resume.pdf`. The Resume button opens `/resume`, which shows the PDF
and has a Download resume button. Until the file exists, the page tells you to add it.

### Design files

Put each design in `public/work/` using the names in `data.ts` (for example `swarnsootra.png`).
Cards show a placeholder cover until the real file loads. For a PDF, set `kind: "pdf"`.
Design projects have no GitHub link by design; they only show the file.

## Deploy

The `/resume` route needs a fallback to `index.html`:

- Vercel: `vercel.json` is included
- Netlify / Cloudflare Pages: `public/_redirects` is included
- S3 + CloudFront: set the error document and a 403/404 custom error response to `/index.html` with status 200
