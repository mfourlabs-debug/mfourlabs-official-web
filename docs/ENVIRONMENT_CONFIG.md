# Environment Configuration Guide

This guide explains how to configure environment variables for production deployment.

## 📋 Required Environment Variables

### Frontend (.env.local)

Create a `.env.local` file in the root directory with the following variables:

```env
# Google Gemini API
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Firebase Configuration
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### Backend (Firebase Functions)

Configure Firebase Functions environment variables using Firebase CLI:

```bash
# Set Resend API Key
firebase functions:config:set resend.api_key="your_resend_api_key"

# Set Email Configuration
firebase functions:config:set email.from="noreply@mfourlabs.dev"

# View current configuration
firebase functions:config:get
```

## 🔑 Obtaining API Keys

### 1. Google Gemini API Key

1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add to `.env.local`

**Permissions needed:**
- Generative Language API access

### 2. Firebase Configuration

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project
3. Click the gear icon → Project settings
4. Scroll to "Your apps" section
5. Click the web app icon (</>)
6. Copy the configuration values

**Required Firebase Services:**
- Authentication (Anonymous)
- Firestore Database
- Cloud Functions
- Hosting

### 3. Resend API Key

1. Visit [Resend](https://resend.com/)
2. Sign up or log in
3. Go to API Keys section
4. Create a new API key
5. Copy the key (starts with `re_`)

**Permissions needed:**
- Email sending permissions
- Domain verification (for custom domain)

## 🔒 Security Best Practices

### DO ✅
- Store API keys in environment variables
- Use different keys for development and production
- Rotate API keys regularly
- Set up API key restrictions (IP, domain)
- Use Firebase security rules
- Enable rate limiting

### DON'T ❌
- Commit `.env.local` to git
- Hardcode API keys in source code
- Share API keys in public channels
- Use production keys in development
- Expose keys in client-side code

## 🌍 Environment-Specific Configuration

### Development
```env
# .env.local (Development)
VITE_GEMINI_API_KEY=dev_key_here
VITE_FIREBASE_PROJECT_ID=mfourlabs-dev
```

### Production
```env
# .env.production (Production)
VITE_GEMINI_API_KEY=prod_key_here
VITE_FIREBASE_PROJECT_ID=mfourlabs-prod
```

## 🚀 Deployment Configuration

### Firebase Functions Environment

Set environment variables for Cloud Functions:

```bash
# Production
firebase functions:config:set resend.api_key="re_prod_key"

# View configuration
firebase functions:config:get

# Deploy with new config
firebase deploy --only functions
```

### Verifying Configuration

After deployment, verify environment variables are set correctly:

```bash
# Check Firebase config
firebase functions:config:get

# Test functions locally
firebase emulators:start --only functions
```

## 📝 Environment Variable Reference

| Variable | Type | Required | Description |
|----------|------|----------|-------------|
| `VITE_GEMINI_API_KEY` | Frontend | Yes | Google Gemini API key for AI features |
| `VITE_FIREBASE_API_KEY` | Frontend | Yes | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Frontend | Yes | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Frontend | Yes | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Frontend | Yes | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Frontend | Yes | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Frontend | Yes | Firebase app ID |
| `RESEND_API_KEY` | Backend | Yes | Resend API key for email notifications |

## 🔍 Troubleshooting

### "API key not found" Error

**Problem**: Environment variable not loaded

**Solution**:
1. Check `.env.local` exists in root directory
2. Restart development server
3. Verify variable name has `VITE_` prefix

### Firebase Functions Config Not Working

**Problem**: Functions can't access environment variables

**Solution**:
```bash
# Set config
firebase functions:config:set resend.api_key="your_key"

# Deploy functions
firebase deploy --only functions
```

### Email Not Sending

**Problem**: Resend API key not configured

**Solution**:
1. Verify API key in Firebase Functions config
2. Check Resend dashboard for errors
3. Verify domain is verified in Resend

## 📚 Additional Resources

- [Firebase Environment Configuration](https://firebase.google.com/docs/functions/config-env)
- [Vite Environment Variables](https://vitejs.dev/guide/env-and-mode.html)
- [Resend Documentation](https://resend.com/docs)
- [Google AI Studio](https://makersuite.google.com/)

## 🆘 Support

If you encounter issues with environment configuration:
1. Check this guide
2. Review Firebase Console logs
3. Check Resend dashboard
4. Contact development team

---

**Last Updated**: December 2025
**Version**: 1.0.0
