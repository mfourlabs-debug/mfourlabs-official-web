# Firebase Functions Deployment Guide

## 🎯 Why You Need to Deploy

Firebase Cloud Functions run on Google's servers, not locally. The email automation triggers when:
- A new user registers (Firestore onCreate)
- User status changes to approved (Firestore onUpdate)
- Weekly digest schedule runs (every Monday at 9 AM UTC)

**Without deployment, these triggers don't work!**

---

## 📋 Prerequisites

Before deploying, ensure you have:

- [x] Firebase project created
- [x] Firebase CLI installed (`npm install -g firebase-tools`)
- [x] Resend account with verified domain (`mfourlabs.dev`)
- [x] Resend API key (`re_XAygy3t1_Mjnqe4RPyWc4twANwTPq6fm8`)

---

## 🚀 Deployment Steps

### **1. Login to Firebase**

```bash
firebase login
```

**What happens:**
1. Browser opens for Google authentication
2. Sign in with your Google account
3. Allow Firebase CLI access
4. Terminal shows: "✔ Success! Logged in as..."

**Already logged in?** Skip to step 2.

---

### **2. Verify Your Project**

```bash
firebase projects:list
```

**Expected output:**
```
┌──────────────────────┬────────────────┬────────────────┐
│ Project Display Name │ Project ID     │ Resource       │
├──────────────────────┼────────────────┼────────────────┤
│ MFOURLABS            │ your-project   │ your-project   │
└──────────────────────┴────────────────┴────────────────┘
```

---

### **3. Select Your Project**

```bash
firebase use your-project-id
```

Or use interactive mode:

```bash
firebase use
```

Then select your project from the list.

---

### **4. Set Resend API Key**

```bash
firebase functions:config:set resend.api_key="re_XAygy3t1_Mjnqe4RPyWc4twANwTPq6fm8"
```

**Expected output:**
```
✔  Functions config updated.
```

**Verify it's set:**
```bash
firebase functions:config:get
```

**Expected output:**
```json
{
  "resend": {
    "api_key": "re_XAygy3t1_Mjnqe4RPyWc4twANwTPq6fm8"
  }
}
```

---

### **5. Deploy Functions**

```bash
firebase deploy --only functions
```

**What happens:**
1. Functions code is uploaded
2. Dependencies are installed on Firebase servers
3. Triggers are configured
4. Functions become live

**Expected output:**
```
=== Deploying to 'your-project'...

i  deploying functions
i  functions: ensuring required API cloudfunctions.googleapis.com is enabled...
i  functions: ensuring required API cloudbuild.googleapis.com is enabled...
✔  functions: required API cloudfunctions.googleapis.com is enabled
✔  functions: required API cloudbuild.googleapis.com is enabled
i  functions: preparing functions directory for uploading...
i  functions: packaged functions (X KB) for uploading
✔  functions: functions folder uploaded successfully
i  functions: creating Node.js 18 function sendWelcomeEmail(us-central1)...
i  functions: creating Node.js 18 function sendAccessGrantedEmail(us-central1)...
i  functions: creating Node.js 18 function sendWeeklyDigest(us-central1)...
✔  functions[sendWelcomeEmail(us-central1)]: Successful create operation.
✔  functions[sendAccessGrantedEmail(us-central1)]: Successful create operation.
✔  functions[sendWeeklyDigest(us-central1)]: Successful create operation.

✔  Deploy complete!
```

**Deployment time:** 2-5 minutes

---

## ✅ Verify Deployment

### **Check Function Status**

```bash
firebase functions:list
```

**Expected output:**
```
┌──────────────────────────┬────────────┬─────────┐
│ Function                 │ Trigger    │ Region  │
├──────────────────────────┼────────────┼─────────┤
│ sendWelcomeEmail         │ Firestore  │ us-c... │
│ sendAccessGrantedEmail   │ Firestore  │ us-c... │
│ sendWeeklyDigest         │ Schedule   │ us-c... │
└──────────────────────────┴────────────┴─────────┘
```

### **Test Welcome Email**

1. **Clear your localStorage** (to register again):
   ```javascript
   localStorage.clear()
   ```

2. **Register a new user** on your website

3. **Check Firebase Console**:
   - Go to Firebase Console → Functions
   - Click on `sendWelcomeEmail`
   - View logs to see if it executed

4. **Check your email** (the one you registered with)

---

## 🐛 Troubleshooting

### **Issue: "Permission denied"**

**Solution:**
```bash
firebase login --reauth
```

---

### **Issue: "Project not found"**

**Solution:**
```bash
firebase use --add
```
Then select your project.

---

### **Issue: "Billing required"**

Firebase Functions require the **Blaze Plan** (pay-as-you-go).

**Solution:**
1. Go to Firebase Console
2. Click "Upgrade" in the bottom left
3. Select "Blaze Plan"
4. Add payment method

**Don't worry:** Free tier includes:
- 2M invocations/month
- 400,000 GB-seconds/month
- 200,000 CPU-seconds/month

For your use case (welcome emails), this is **completely free** unless you have thousands of registrations per day.

---

### **Issue: "API not enabled"**

**Solution:**
Firebase will prompt you to enable required APIs. Just say "Yes" when asked.

---

### **Issue: Email not received**

**Check:**

1. **Function logs:**
   ```bash
   firebase functions:log
   ```

2. **Firestore trigger:**
   - Go to Firebase Console → Firestore
   - Check if `lab_early_access_users` collection exists
   - Verify a document was created when you registered

3. **Resend dashboard:**
   - Go to https://resend.com/emails
   - Check if email was sent
   - Check delivery status

4. **Spam folder:**
   - Check your spam/junk folder

---

## 📊 Monitor Functions

### **View Logs**

```bash
firebase functions:log
```

**Or in Firebase Console:**
1. Go to Firebase Console → Functions
2. Click on a function
3. Click "Logs" tab

---

### **View Metrics**

Firebase Console → Functions → Click on function → "Metrics" tab

Shows:
- Invocations
- Execution time
- Errors
- Memory usage

---

## 🔄 Update Functions

After making changes to `functions/index.js`:

```bash
firebase deploy --only functions
```

**Tip:** Deploy only a specific function:
```bash
firebase deploy --only functions:sendWelcomeEmail
```

---

## 💰 Cost Estimate

**For 100 registrations/day:**
- Welcome emails: 100 invocations/day = 3,000/month
- Access granted emails: ~10/month (when you approve users)
- Weekly digest: 4 invocations/month

**Total:** ~3,014 invocations/month

**Cost:** $0 (well within free tier of 2M invocations)

---

## 🎯 Quick Deploy Script

I've created a PowerShell script for you:

```powershell
.\deploy-functions.ps1
```

This script will:
1. Check if you're logged in
2. Show current project
3. Set Resend API key
4. Deploy functions
5. Show success/error message

---

## 📧 Email Templates

After deployment, these emails will be sent automatically:

### **1. Welcome Email**
- **Trigger:** New user registers
- **Sent to:** User's email
- **Contains:** 
  - Welcome message
  - Referral code
  - Access ID
  - Next steps

### **2. Access Granted Email**
- **Trigger:** Admin changes status to "approved"
- **Sent to:** User's email
- **Contains:**
  - Congratulations message
  - Getting started steps
  - Lab access link

### **3. Weekly Digest**
- **Trigger:** Every Monday at 9 AM UTC
- **Sent to:** Users who opted in for newsletter
- **Contains:**
  - New features
  - Latest articles
  - Community spotlight

---

## 🔐 Security Notes

1. **API Key:** Stored as environment variable (not in code)
2. **Firestore Rules:** Deployed separately (`firebase deploy --only firestore:rules`)
3. **HTTPS Only:** All functions use HTTPS
4. **Rate Limiting:** Built into Firestore triggers

---

## 📞 Need Help?

**Firebase Support:**
- Documentation: https://firebase.google.com/docs/functions
- Community: https://stackoverflow.com/questions/tagged/google-cloud-functions

**Resend Support:**
- Documentation: https://resend.com/docs
- Dashboard: https://resend.com/emails

---

## ✅ Deployment Checklist

Before going live:

- [ ] Logged into Firebase CLI
- [ ] Selected correct project
- [ ] Set Resend API key
- [ ] Deployed functions successfully
- [ ] Tested welcome email (register new user)
- [ ] Verified email received
- [ ] Checked function logs (no errors)
- [ ] Deployed Firestore rules
- [ ] Verified billing plan (Blaze for production)

---

**Last Updated:** December 8, 2025  
**Status:** Ready to Deploy

---

## 🚀 Quick Commands Reference

```bash
# Login
firebase login

# List projects
firebase projects:list

# Select project
firebase use your-project-id

# Set API key
firebase functions:config:set resend.api_key="YOUR_KEY"

# Deploy functions
firebase deploy --only functions

# View logs
firebase functions:log

# List functions
firebase functions:list
```

---

**Once deployed, email automation will work automatically!** 📧
