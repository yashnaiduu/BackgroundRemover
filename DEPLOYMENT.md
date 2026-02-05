# 🚀 Deployment Guide

This project is configured for deployment with:
- **Frontend**: GitHub Pages (static hosting)
- **Backend**: Render.com (free tier)

## 📋 Prerequisites

- GitHub account
- Render.com account (free)
- Your repository pushed to GitHub

---

## 🎯 Step 1: Deploy Backend to Render

### Option A: One-Click Deploy (Recommended)

1. **Push your code to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Go to Render Dashboard**
   - Visit: https://dashboard.render.com/
   - Click "New +" → "Blueprint"
   - Connect your GitHub repository
   - Render will automatically detect `render.yaml`
   - Click "Apply"

3. **Wait for deployment** (5-10 minutes)
   - Render will install dependencies and start your backend
   - You'll get a URL like: `https://background-remover-api.onrender.com`

4. **Copy your backend URL** - you'll need it for the frontend!

### Option B: Manual Deploy

1. Go to Render Dashboard → "New +" → "Web Service"
2. Connect your GitHub repo
3. Configure:
   - **Name**: `background-remover-api`
   - **Runtime**: Python 3
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `gunicorn app:app`
4. Add environment variables:
   - `SECRET_KEY`: (auto-generate)
   - `JWT_SECRET_KEY`: (auto-generate)
   - `DATABASE_URL`: (add PostgreSQL database)
5. Click "Create Web Service"

---

## 🌐 Step 2: Deploy Frontend to GitHub Pages

### 1. Update Frontend Environment

Edit `.github/workflows/deploy.yml` and update the backend URL:
- Go to your GitHub repo → Settings → Secrets and variables → Actions
- Add new repository secret:
  - **Name**: `NEXT_PUBLIC_API_BASE`
  - **Value**: `https://your-backend-url.onrender.com` (from Step 1)

### 2. Enable GitHub Pages

1. Go to your GitHub repo → Settings → Pages
2. Under "Build and deployment":
   - **Source**: GitHub Actions
3. Save

### 3. Update Repository Name (if needed)

✅ **Already configured!** Your repo is `background-remover-pro` and the `basePath` is already set correctly in `next.config.ts`.

### 4. Push to Deploy

```bash
git add .
git commit -m "Configure for deployment"
git push origin main
```

GitHub Actions will automatically:
- Build your Next.js app
- Deploy to GitHub Pages
- Your site will be live at: `https://yashnaiduu.github.io/background-remover-pro`

---

## 🔧 Step 3: Update CORS Settings

After deployment, update your backend to allow your frontend domain:

1. Go to Render Dashboard → Your Service → Environment
2. Add environment variable:
   - **Key**: `FRONTEND_URL`
   - **Value**: `https://yashnaiduu.github.io`
3. Save and redeploy

---

## ✅ Verify Deployment

### Backend Health Check
Visit: `https://your-backend-url.onrender.com/api/auth/profile`
- Should return: `{"message": "Token is missing!"}`
- This means the API is working!

### Frontend Check
Visit: `https://yashnaiduu.github.io/background-remover-pro`
- Should see your beautiful UI
- Try uploading an image

---

## 🐛 Troubleshooting

### Frontend can't connect to backend
1. Check browser console for errors
2. Verify `NEXT_PUBLIC_API_BASE` secret in GitHub
3. Check CORS settings in backend

### Backend not starting
1. Check Render logs
2. Verify all environment variables are set
3. Check `requirements.txt` dependencies

### Images not loading
1. Verify backend is running
2. Check API URL in browser network tab
3. Test backend endpoint directly

---

## 💰 Cost

- **GitHub Pages**: FREE ✅
- **Render Free Tier**: FREE ✅
  - 750 hours/month
  - Sleeps after 15 min of inactivity
  - Wakes up on request (takes ~30 seconds)

---

## 🔄 Updating Your Site

### Update Frontend
```bash
# Make changes to next-frontend/
git add .
git commit -m "Update frontend"
git push origin main
# GitHub Actions will auto-deploy
```

### Update Backend
```bash
# Make changes to app.py or models.py
git add .
git commit -m "Update backend"
git push origin main
# Render will auto-deploy
```

---

## 📝 Environment Variables Reference

### Backend (Render)
- `SECRET_KEY`: Flask secret (auto-generate)
- `JWT_SECRET_KEY`: JWT signing key (auto-generate)
- `DATABASE_URL`: Database connection (auto from Render PostgreSQL)
- `FRONTEND_URL`: Your GitHub Pages URL
- `MAIL_SERVER`: (optional) SMTP server for emails
- `MAIL_USERNAME`: (optional) Email username
- `MAIL_PASSWORD`: (optional) Email password

### Frontend (GitHub Secrets)
- `NEXT_PUBLIC_API_BASE`: Your Render backend URL

---

## 🎉 You're Done!

Your app is now live:
- **Frontend**: `https://yashnaiduu.github.io/background-remover-pro`
- **Backend**: `https://your-backend-url.onrender.com`

Share it with the world! 🌍
