# BabyBowl — Fake Door MVP Landing Page

A landing page to test real purchase intent for BabyBowl, a clean-label millet-based instant baby meal mix.

## What This Captures (Fake Door Test Data)
- Name + Email + Phone (real contact intent)
- Baby's age (segment validation)
- Packaged food frequency (use case validation)
- Willingness to pay (pricing hypothesis)
- How they heard about us (channel validation)

## Deploy to Render.com

### Step 1: Push to GitHub
```bash
git init
git add .
git commit -m "BabyBowl landing page"
git remote add origin https://github.com/YOUR_USERNAME/babybowl.git
git push -u origin main
```

### Step 2: Deploy on Render
1. Go to https://render.com and sign up / log in
2. Click "New" → "Web Service"
3. Connect your GitHub repo
4. Settings:
   - **Build Command:** `npm install`
   - **Start Command:** `npm start`
   - **Environment:** Node
5. Click "Create Web Service"
6. Wait ~2 minutes for deployment

### Step 3: View Your Leads
Visit: `https://your-app-name.onrender.com/admin/leads`

This shows all signups in a table with all captured data.

## Local Development
```bash
npm install
npm start
```
Visit http://localhost:3000
