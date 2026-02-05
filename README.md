# 🎨 Background Remover Pro

[![Deploy to GitHub Pages](https://github.com/yashnaiduu/background-remover-pro/actions/workflows/deploy.yml/badge.svg)](https://github.com/yashnaiduu/background-remover-pro/actions/workflows/deploy.yml)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

> AI-powered background removal tool with premium features, authentication, and payment integration.

**🌐 Live Demo**: [https://yashnaiduu.github.io/background-remover-pro](https://yashnaiduu.github.io/background-remover-pro)

## ✨ Features

- 🌗 Dual theme with animated toggle (sun/moon) and glassmorphism surfaces
- 📤 Drag & drop upload with glowing border and micro‑interactions
- 🔀 Before/After preview, one‑click download (PNG/JPG/WebP)
- 🧠 AI engine with configurable options and fallback
- 💳 Premium payment system with Buy Me a Coffee integration
- 👤 User authentication and management
- 📊 Usage analytics and tracking
- 📧 Email notifications for payments and user registration

## 🧱 Tech Stack

- Next.js App Router, TailwindCSS v4, Framer Motion, Lucide Icons
- Flask API (`/api/remove_background`), Pillow

## 🚀 Quickstart

Prereqs: Node 18+, Python 3.10+, Git

```bash
# 1) Install Python deps
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
pip install backgroundremover

# 2) Install frontend deps
cd next-frontend && npm i

# 3) Run both servers
# Terminal A (backend)
cd .. && ./venv/bin/python app.py
# Terminal B (frontend)
cd next-frontend && npm run dev

# Open frontend (single link; API rewrites to Flask)
open http://localhost:3000
```

First run downloads the model to `~/.u2net/`. Subsequent runs are fast.

## 🔌 API

POST `/api/remove_background`

Body:

```json
{
  "image": "data:image/png;base64,....",
  "format": "PNG",
  "model": "u2net",
  "alpha_matting": true,
  "alpha_matting_foreground_threshold": 240,
  "alpha_matting_background_threshold": 10,
  "alpha_matting_erode_structure_size": 10,
  "alpha_matting_base_size": 1000
}
```

Response:

```json
{
  "success": true,
  "image": "data:image/png;base64,....",
  "format": "PNG",
  "engine": "backgroundremover"
}
```

## 🖼️ UI Structure

- `next-frontend/src/app/page.tsx`: hero, tool, sections
- `next-frontend/src/components/upload-tool.tsx`: drag & drop, preview, download
- `next-frontend/src/components/theme-toggle.tsx`, `next-frontend/src/providers/theme-provider.tsx`
- `next-frontend/src/components/navbar.tsx`, `next-frontend/src/components/footer.tsx`

## 🌐 Deployment

This project is configured for production deployment:

- **Frontend**: GitHub Pages (free, static hosting)
- **Backend**: Render.com (free tier with PostgreSQL)

### Quick Deploy

1. **Deploy Backend to Render**
   - Push to GitHub
   - Connect to Render
   - Deploy automatically with `render.yaml`

2. **Deploy Frontend to GitHub Pages**
   - Enable GitHub Pages in repo settings
   - Set `NEXT_PUBLIC_API_BASE` secret
   - Push to trigger automatic deployment

📖 **Full deployment guide**: See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed step-by-step instructions.

## 🧠 Notes

- First run downloads the model to the user cache; subsequent runs are fast.
- Free Render tier sleeps after 15 min of inactivity (wakes in ~30 seconds)
- GitHub Pages updates automatically on push to main branch

## 📣 Credits & License

MIT © 2025. See LICENSE.

