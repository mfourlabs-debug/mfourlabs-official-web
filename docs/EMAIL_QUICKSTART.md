# Email Notifications - Quick Start Checklist

## ✅ Pre-Deployment Checklist

### 1. Resend Setup
- [ ] Create account at [resend.com](https://resend.com)
- [ ] Get API key from dashboard
- [ ] Verify domain OR use test domain (`onboarding@resend.dev`)

### 2. Firebase Setup
- [ ] Install Firebase CLI: `npm install -g firebase-tools`
- [ ] Login: `firebase login`
- [ ] Initialize project: `firebase init functions`

### 3. Configuration
- [ ] Install dependencies: `cd functions && npm install`
- [ ] Set Resend API key: `firebase functions:config:set resend.api_key="YOUR_KEY"`
- [ ] Update `FROM_EMAIL` in `functions/index.js`

### 4. Testing
- [ ] Test locally: `npm run serve` (in functions folder)
- [ ] Create test registration
- [ ] Check logs: `npm run logs`

### 5. Deployment
- [ ] Deploy: `npm run deploy` (in functions folder)
- [ ] Verify in Firebase Console
- [ ] Test with real registration

## 🚀 Quick Commands

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Set Resend API Key
firebase functions:config:set resend.api_key="re_YOUR_KEY_HERE"

# Deploy all functions
cd functions
npm run deploy

# View logs
npm run logs

# Test locally
npm run serve
```

## 📧 Email Functions

| Function | Trigger | Description |
|----------|---------|-------------|
| `sendWelcomeEmail` | New user registration | Welcome + waitlist position + referral code |
| `sendPositionUpdateEmail` | Position improves | Celebration + new position |
| `sendAccessGrantedEmail` | Status → approved | Access granted + login instructions |
| `sendWeeklyDigest` | Every Monday 9 AM UTC | Weekly updates (newsletter subscribers only) |

## 🎯 Expected Behavior

### After User Registers:
1. ✅ User fills form and submits
2. ✅ Data saved to Firestore
3. ✅ `sendWelcomeEmail` function triggers
4. ✅ Email sent via Resend
5. ✅ User receives welcome email with:
   - Waitlist position
   - Referral code
   - Next steps

### After Referral Success:
1. ✅ Friend registers with referral code
2. ✅ Original user's position updates
3. ✅ `sendPositionUpdateEmail` triggers
4. ✅ User receives position update email

### After Admin Approval:
1. ✅ Admin changes status to 'approved'
2. ✅ `sendAccessGrantedEmail` triggers
3. ✅ User receives access granted email

### Weekly Digest:
1. ✅ Every Monday at 9 AM UTC
2. ✅ `sendWeeklyDigest` runs
3. ✅ All newsletter subscribers receive digest

## 🐛 Troubleshooting

### Emails not sending?
```bash
# Check function logs
firebase functions:log --only sendWelcomeEmail

# Verify API key is set
firebase functions:config:get

# Check Resend dashboard for delivery status
```

### Function not triggering?
```bash
# List deployed functions
firebase functions:list

# Check Firestore collection name
# Must be: lab_early_access_users

# Verify function is deployed
firebase deploy --only functions:sendWelcomeEmail
```

### Domain verification pending?
- Use test domain: `onboarding@resend.dev`
- DNS can take up to 48 hours
- Check DNS records: [dnschecker.org](https://dnschecker.org)

## 💰 Cost Tracking

**Free Tier Limits:**
- Resend: 3,000 emails/month, 100/day
- Firebase: 2M invocations/month

**Monitor Usage:**
- Resend Dashboard: [resend.com/dashboard](https://resend.com/dashboard)
- Firebase Console: [console.firebase.google.com](https://console.firebase.google.com)

## 📚 Documentation

- Full Setup Guide: `EMAIL_SETUP_GUIDE.md`
- Function Code: `functions/index.js`
- Resend Docs: [resend.com/docs](https://resend.com/docs)
- Firebase Docs: [firebase.google.com/docs/functions](https://firebase.google.com/docs/functions)

## ✨ Next Steps

After deployment:
1. Test with real registration
2. Monitor email delivery
3. Customize email templates
4. Set up analytics tracking
5. Add unsubscribe links
6. A/B test email content

---

**Ready to Deploy?** Follow the checklist above! 🚀
