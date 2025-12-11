# Email Notifications Setup Guide

## Overview

This guide will help you set up automated email notifications for your mfourlabs early access waitlist using **Firebase Cloud Functions** and **Resend** (free tier).

## 📧 Email Triggers

1. **Welcome Email** - Sent when user registers
2. **Position Update** - Sent when waitlist position improves
3. **Access Granted** - Sent when admin approves access
4. **Weekly Digest** - Sent every Monday at 9 AM UTC (if subscribed)

## 🆓 Free Tier Limits

**Resend Free Tier:**
- 3,000 emails/month
- 100 emails/day
- Perfect for early access programs!

**Firebase Cloud Functions (Spark Plan - Free):**
- 2,000,000 invocations/month
- 400,000 GB-seconds/month
- 200,000 CPU-seconds/month

## 🚀 Setup Instructions

### Step 1: Create Resend Account

1. Go to [resend.com](https://resend.com)
2. Sign up for a free account
3. Verify your email address
4. Navigate to **API Keys** section
5. Click **Create API Key**
6. Copy your API key (starts with `re_`)

### Step 2: Verify Your Domain (or use Resend's test domain)

**Option A: Use Resend Test Domain (Quick Start)**
- You can send emails from `onboarding@resend.dev`
- Limited to 100 emails/day
- Good for testing

**Option B: Verify Your Own Domain (Recommended for Production)**
1. Go to **Domains** in Resend dashboard
2. Click **Add Domain**
3. Enter your domain (e.g., `mfourlabs.dev`)
4. Add the DNS records provided by Resend to your domain registrar
5. Wait for verification (usually 5-10 minutes)
6. Update `FROM_EMAIL` in `functions/index.js` to use your domain

### Step 3: Install Firebase CLI

```bash
npm install -g firebase-tools
```

### Step 4: Login to Firebase

```bash
firebase login
```

### Step 5: Initialize Firebase Functions

```bash
# In your project root
firebase init functions
```

Select:
- Use existing project (select your Firebase project)
- JavaScript
- Yes to ESLint
- Yes to install dependencies

### Step 6: Install Dependencies

```bash
cd functions
npm install firebase-functions firebase-admin resend
```

### Step 7: Set Resend API Key

```bash
# Set the Resend API key as a Firebase config variable
firebase functions:config:set resend.api_key="YOUR_RESEND_API_KEY"
```

Replace `YOUR_RESEND_API_KEY` with your actual Resend API key.

### Step 8: Update Email Sender

Edit `functions/index.js` and update the `FROM_EMAIL` constant:

```javascript
// If using Resend test domain:
const FROM_EMAIL = 'onboarding@resend.dev';

// If using your own verified domain:
const FROM_EMAIL = 'noreply@mfourlabs.dev';
```

### Step 9: Deploy Functions

```bash
# Deploy all functions
firebase deploy --only functions
```

Or deploy individual functions:

```bash
firebase deploy --only functions:sendWelcomeEmail
firebase deploy --only functions:sendPositionUpdateEmail
firebase deploy --only functions:sendAccessGrantedEmail
firebase deploy --only functions:sendWeeklyDigest
```

## 📝 Function Details

### 1. Welcome Email (`sendWelcomeEmail`)

**Trigger:** New document created in `lab_early_access_users`

**Includes:**
- Personalized greeting
- Waitlist position
- Referral code with shareable link
- Next steps
- Social media links

**Example:**
```
Subject: Welcome to mfourlabs Early Access! You're #42
```

### 2. Position Update (`sendPositionUpdateEmail`)

**Trigger:** Document updated in `lab_early_access_users` with improved position

**Includes:**
- Celebration message
- New position number
- Position improvement count
- Encouragement to share more

**Example:**
```
Subject: 🎉 You moved up 2 positions! Now #40
```

### 3. Access Granted (`sendAccessGrantedEmail`)

**Trigger:** Document updated with `status` changed to `'approved'`

**Includes:**
- Congratulations message
- Getting started guide
- Login instructions
- Access credentials

**Example:**
```
Subject: 🚀 Your mfourlabs Access Has Been Approved!
```

### 4. Weekly Digest (`sendWeeklyDigest`)

**Trigger:** Scheduled every Monday at 9 AM UTC

**Sent to:** Users with `newsletter: true`

**Includes:**
- Weekly highlights
- New features
- Community spotlight
- Current waitlist position
- Referral reminder

**Example:**
```
Subject: 📬 mfourlabs Weekly Digest - First Principles Engineering
```

## 🧪 Testing

### Test Welcome Email Locally

```bash
# Install Firebase Functions Emulator
firebase emulators:start --only functions

# In another terminal, trigger a test
# (Create a test document in Firestore)
```

### Test with Real Data

1. Register a new user through your form
2. Check Firebase Functions logs:
```bash
firebase functions:log
```

3. Check Resend dashboard for email delivery status

### View Logs

```bash
# Real-time logs
firebase functions:log --only sendWelcomeEmail

# All functions
firebase functions:log
```

## 🎨 Customizing Email Templates

Email templates are in `functions/index.js`:

- `generateWelcomeEmail(user, referralLink)`
- `generatePositionUpdateEmail(user, improvement)`
- `generateAccessGrantedEmail(user)`
- `generateWeeklyDigestEmail(user)`

**Tips:**
- Use inline CSS (email clients don't support external stylesheets)
- Test on multiple email clients (Gmail, Outlook, Apple Mail)
- Use [Litmus](https://litmus.com) or [Email on Acid](https://www.emailonacid.com) for testing
- Keep images small and use alt text

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use Firebase config** for sensitive data
3. **Validate email addresses** before sending
4. **Rate limit** email sends to prevent abuse
5. **Monitor usage** in Resend dashboard

## 📊 Monitoring

### Resend Dashboard
- Email delivery status
- Open rates
- Click rates
- Bounce rates
- Spam complaints

### Firebase Console
- Function invocations
- Error rates
- Execution time
- Logs

## 🐛 Troubleshooting

### Emails Not Sending

1. **Check Resend API key:**
```bash
firebase functions:config:get
```

2. **Check function logs:**
```bash
firebase functions:log --only sendWelcomeEmail
```

3. **Verify domain** in Resend dashboard

4. **Check email limits:**
   - Free tier: 100 emails/day
   - Verify you haven't exceeded limits

### Function Not Triggering

1. **Check Firestore triggers:**
   - Ensure collection name is correct (`lab_early_access_users`)
   - Verify document structure matches expected format

2. **Check function deployment:**
```bash
firebase functions:list
```

3. **Test locally:**
```bash
firebase emulators:start
```

### Domain Verification Issues

1. **DNS propagation** can take up to 48 hours
2. **Check DNS records** using [DNS Checker](https://dnschecker.org)
3. **Use Resend test domain** while waiting for verification

## 💰 Cost Estimation

**For 1,000 early access users:**

**Resend (Free Tier):**
- Welcome emails: 1,000 (one-time)
- Position updates: ~500/month (assuming 50% get referrals)
- Access granted: ~100/month (10% approval rate)
- Weekly digest: ~800/month (80% newsletter opt-in)
- **Total: ~2,400 emails/month** ✅ Within free tier!

**Firebase Functions (Free Tier):**
- Function invocations: ~2,400/month
- **Well within free tier limits** ✅

## 🚀 Scaling Beyond Free Tier

When you exceed free tier limits:

**Resend Pricing:**
- $20/month for 50,000 emails
- $80/month for 250,000 emails

**Firebase Blaze Plan (Pay-as-you-go):**
- $0.40 per million invocations
- Very affordable for most use cases

## 📚 Additional Resources

- [Resend Documentation](https://resend.com/docs)
- [Firebase Functions Documentation](https://firebase.google.com/docs/functions)
- [Email Best Practices](https://sendgrid.com/blog/email-best-practices/)
- [HTML Email Templates](https://github.com/leemunroe/responsive-html-email-template)

## 🎯 Next Steps

1. ✅ Set up Resend account
2. ✅ Verify domain (or use test domain)
3. ✅ Install Firebase CLI
4. ✅ Deploy functions
5. ✅ Test with real registration
6. ✅ Monitor email delivery
7. ✅ Customize templates
8. ✅ Set up analytics tracking

## 📞 Support

- **Resend Support:** support@resend.com
- **Firebase Support:** [Firebase Community](https://firebase.google.com/support)
- **Email Issues:** Check spam folder, verify domain, check logs

---

**Status:** Ready to Deploy
**Last Updated:** 2025-12-07
**Version:** 1.0.0
