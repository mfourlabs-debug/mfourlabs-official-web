# 🚀 Quick Deploy Guide

**Fast track to production deployment**

---

## ⚡ Quick Start (5 Minutes)

### 1. Configure Environment (2 min)

Create `.env.local` in root:
```env
VITE_GEMINI_API_KEY=your_gemini_key
VITE_FIREBASE_API_KEY=your_firebase_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

Set Firebase Functions config:
```bash
firebase functions:config:set resend.api_key="your_resend_key"
```

### 2. Build & Test (2 min)

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` and test the app.

### 3. Deploy (1 min)

```bash
npm run deploy
```

**Done! 🎉**

---

## 📋 Pre-Flight Checklist

Quick checks before deploying:

```bash
# ✅ Type check
npm run lint

# ✅ Build test
npm run build

# ✅ Preview test
npm run preview
```

- [ ] All environment variables set
- [ ] Build completes without errors
- [ ] Preview works correctly
- [ ] Registration form tested
- [ ] Email notifications configured

---

## 🔧 Common Issues

### Build Fails
```bash
# Clean and rebuild
npm run clean
npm install
npm run build
```

### Environment Variables Not Working
- Restart dev server after changing `.env.local`
- Ensure variables have `VITE_` prefix
- Check for typos in variable names

### Firebase Deploy Fails
```bash
# Login again
firebase login

# Check project
firebase use --add

# Deploy specific service
firebase deploy --only hosting
```

---

## 📚 Full Documentation

For detailed guides, see:
- `PRODUCTION_READY.md` - Complete production summary
- `docs/PRODUCTION_CHECKLIST.md` - Detailed checklist
- `docs/ENVIRONMENT_CONFIG.md` - Environment setup
- `docs/FIREBASE_DEPLOYMENT_GUIDE.md` - Firebase deployment

---

## 🆘 Need Help?

1. Check `PRODUCTION_READY.md`
2. Review `/docs` folder
3. Check Firebase Console logs
4. Contact: support@mfourlabs.dev

---

**Ready to deploy? Run: `npm run deploy` 🚀**
