# 🚀 Quick Deployment Guide - Email Notifications

## ✅ Current Status

- ✅ Resend API Key: `re_XAygy3t1_Mjnqe4RPyWc4twANwTPq6fm8`
- ✅ Functions code ready in `functions/index.js`
- ✅ Using Resend test domain: `onboarding@resend.dev`
- ⏳ Firebase CLI installing...

## 📋 Next Steps

### 1. Wait for Firebase CLI Installation

The command `npm install -g firebase-tools` is currently running. Wait for it to complete.

### 2. Login to Firebase

```bash
firebase login
```

This will open a browser window for you to authenticate with your Google account.

### 3. Initialize Firebase (if not done)

```bash
firebase init
```

Select:
- **Functions**: Configure Cloud Functions
- Use existing project
- JavaScript
- ESLint: Yes
- Install dependencies: Yes

### 4. Deploy Functions

```bash
cd functions
npm run deploy
```

Or deploy all at once:

```bash
firebase deploy --only functions
```

### 5. Test the Email System

After deployment, register a new user through your form at http://localhost:3000

**Expected behavior:**
1. User fills registration form
2. Data saves to Firestore
3. `sendWelcomeEmail` function triggers automatically
4. Email sent to user's email address
5. Check your inbox!

## 📧 Email Limits (Free Tier)

**Resend Test Domain (`onboarding@resend.dev`):**
- ✅ 100 emails/day
- ✅ 3,000 emails/month
- ✅ No domain verification needed
- ⚠️ May go to spam folder initially

## 🔄 Upgrade to Your Own Domain (Later)

When ready for production:

1. **Verify your domain** in Resend dashboard
2. **Update `FROM_EMAIL`** in `functions/index.js`:
   ```javascript
   const FROM_EMAIL = 'noreply@mfourlabs.dev';
   ```
3. **Redeploy**:
   ```bash
   firebase deploy --only functions
   ```

## 🧪 Testing Checklist

After deployment:

- [ ] Register a new test user
- [ ] Check Firestore for new document
- [ ] Check Firebase Functions logs: `firebase functions:log`
- [ ] Check your email inbox
- [ ] Verify email content looks correct
- [ ] Test referral link in email

## 🐛 Troubleshooting

### Email not received?

1. **Check spam folder**
2. **View Firebase logs**:
   ```bash
   firebase functions:log --only sendWelcomeEmail
   ```
3. **Check Resend dashboard**: [resend.com/emails](https://resend.com/emails)
4. **Verify function deployed**:
   ```bash
   firebase functions:list
   ```

### Function not triggering?

1. **Check Firestore collection name**: Must be `lab_early_access_users`
2. **Verify function is deployed**: `firebase functions:list`
3. **Check Firebase Console** → Functions section

### API Key issues?

The API key is hardcoded in the function for now. For production, set it properly:

```bash
firebase functions:config:set resend.api_key="re_XAygy3t1_Mjnqe4RPyWc4twANwTPq6fm8"
```

Then update `functions/index.js` to use:
```javascript
const resend = new Resend(functions.config().resend.api_key);
```

## 📊 Monitor Usage

**Resend Dashboard**: [resend.com/dashboard](https://resend.com/dashboard)
- Email delivery status
- Daily/monthly usage
- Bounce rates
- Open rates (if tracking enabled)

**Firebase Console**: [console.firebase.google.com](https://console.firebase.google.com)
- Function invocations
- Error rates
- Execution time
- Logs

## 🎯 What Each Function Does

| Function | Trigger | Email Sent |
|----------|---------|------------|
| `sendWelcomeEmail` | New user registers | Welcome + waitlist position + referral code |
| `sendPositionUpdateEmail` | Position improves | Celebration + new position |
| `sendAccessGrantedEmail` | Status → approved | Access granted + login info |
| `sendWeeklyDigest` | Every Monday 9 AM UTC | Weekly updates (newsletter only) |

## 💡 Tips

1. **Test with your own email first** before inviting real users
2. **Monitor Resend dashboard** for delivery issues
3. **Check spam folder** when testing
4. **Customize email templates** in `functions/index.js`
5. **Set up proper domain** before production launch

## 🔐 Security Note

⚠️ **Important**: The API key is currently hardcoded in the function. This is OK for testing, but for production:

1. Remove the hardcoded key
2. Set it via Firebase config:
   ```bash
   firebase functions:config:set resend.api_key="YOUR_KEY"
   ```
3. Use `functions.config().resend.api_key` in code

## 📞 Need Help?

- **Resend Docs**: [resend.com/docs](https://resend.com/docs)
- **Firebase Docs**: [firebase.google.com/docs/functions](https://firebase.google.com/docs/functions)
- **Check logs**: `firebase functions:log`

---

**Ready?** Wait for Firebase CLI to finish installing, then follow the steps above! 🚀
