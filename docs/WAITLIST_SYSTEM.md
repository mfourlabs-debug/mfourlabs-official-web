# Waitlist & Priority System - Complete Implementation Guide

## Overview

The mfourlabs early access waitlist system is a comprehensive solution for managing user registrations, tracking referrals, and prioritizing access based on multiple factors.

## Database Schema

### Collection: `lab_early_access_users`

```typescript
{
  // Basic User Information
  name: string,
  email: string,
  dob: string,
  role: string,
  organization: string,
  studentLevel?: string,
  degree?: string,
  
  // Enhanced Data Collection
  interestAreas: string[],
  experienceLevel: string,
  referralSource: string,
  motivation: string,
  
  // User Preferences
  privacy: boolean,
  newsletter: boolean,
  
  // Identity & Access
  accessId: string,              // Unique 8-char ID
  referralCode: string,           // Format: MFOUR-XXXXX
  referredBy: string | null,      // Who referred them
  
  // Waitlist & Status
  waitlistPosition: number,       // Position in queue
  status: 'pending' | 'approved' | 'active' | 'waitlist',
  approvedAt: Timestamp | null,
  lastActiveAt: Timestamp,
  
  // Timestamps
  createdAt: Timestamp,
  updatedAt: Timestamp,
  
  // Metadata
  ipAddress: string,
  userAgent: string,
}
```

## Features Implemented

### 1. Automatic Waitlist Position Assignment
- Each new registration automatically gets assigned a position
- Position = current user count + 1
- Stored in `waitlistPosition` field

### 2. Referral System
- **Unique Referral Code**: Each user gets a code (format: `MFOUR-XXXXX`)
- **Referral Tracking**: System tracks who referred whom via `referredBy` field
- **Referral Link**: `https://mfourlabs.dev?ref=MFOUR-XXXXX`
- **Position Boost**: Each successful referral moves user up 2 positions

### 3. Priority Scoring Algorithm

```typescript
Priority Score = Base Score + Referral Bonus + Engagement Bonus

Base Score:
  - 10 points per day since registration
  - Earlier registrations get higher scores

Referral Bonus:
  - 20 points per successful referral
  - Moves user up 2 positions per referral

Engagement Bonus:
  - Newsletter subscription: +5 points
  - Detailed motivation (>50 chars): +10 points
  - 3+ interest areas selected: +5 points
```

### 4. Status Management

**Status Types:**
- `pending`: Awaiting admin approval (default)
- `approved`: Admin has approved access
- `active`: User is actively using the platform
- `waitlist`: User is in the queue

**Status Transitions:**
```
pending → approved (admin action)
approved → active (user first login)
```

### 5. Metadata Collection

**Security & Analytics:**
- IP Address (via ipify.org API)
- User Agent (browser/device info)
- Registration timestamp
- Last activity timestamp

## User Flow

### Registration Process

1. **User fills form** with all required fields
2. **System generates**:
   - Unique Access ID (8 chars)
   - Unique Referral Code (MFOUR-XXXXX)
   - Waitlist Position (count + 1)
3. **System collects**:
   - IP address
   - User agent
   - Referral source (if came via ref link)
4. **Data saved to Firestore** with status: `pending`
5. **Success screen shows**:
   - Waitlist position
   - Referral code with copy button
   - Social sharing options

### Referral Flow

1. User shares referral link: `?ref=MFOUR-XXXXX`
2. New user clicks link and registers
3. System captures `referredBy` field
4. Original user's position improves by 2

## Admin Operations

### WaitlistService Methods

```typescript
// Get statistics
WaitlistService.getWaitlistStats()

// Find users
WaitlistService.getUserByEmail(email)
WaitlistService.getUserByReferralCode(code)
WaitlistService.getUsersByStatus('pending')

// Manage approvals
WaitlistService.updateUserStatus(email, 'approved')
WaitlistService.bulkApproveUsers(10)

// Analytics
WaitlistService.countReferrals(referralCode)
WaitlistService.getTopReferrers(10)
WaitlistService.calculatePriorityScore(userId, user)
```

### Admin Dashboard Features

**Stats Overview:**
- Total users
- Pending count
- Approved count
- Active count

**User Management:**
- View pending users
- Approve individual users
- Bulk approve (next N users)
- Export to CSV

**Referral Leaderboard:**
- Top 10 referrers
- Referral counts
- Position improvements

## Security Considerations

### Fraud Prevention

1. **IP Address Tracking**: Detect multiple registrations from same IP
2. **Email Validation**: Prevent duplicate emails
3. **User Agent Tracking**: Identify bot patterns
4. **Rate Limiting**: Implement in Firebase Security Rules

### Recommended Firebase Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /lab_early_access_users/{userId} {
      // Allow read for authenticated users only
      allow read: if request.auth != null;
      
      // Allow create with validation
      allow create: if request.resource.data.email is string
                    && request.resource.data.name is string
                    && request.resource.data.privacy == true;
      
      // Only admins can update
      allow update: if request.auth.token.admin == true;
      
      // No deletes
      allow delete: if false;
    }
  }
}
```

## Email Automation (Future Enhancement)

### Recommended Email Triggers

1. **Welcome Email** (on registration)
   - Thank you message
   - Waitlist position
   - Referral code
   - What to expect next

2. **Position Update** (when position improves)
   - New position
   - Reason (referral success)
   - Encourage more referrals

3. **Approval Notification** (status → approved)
   - Access granted
   - Login instructions
   - Onboarding guide

4. **Weekly Digest** (if newsletter = true)
   - Latest updates
   - Featured content
   - Community highlights

### Email Service Integration

**Recommended Services:**
- **Resend**: Modern, developer-friendly
- **SendGrid**: Enterprise-grade
- **Mailgun**: Reliable, scalable

**Implementation:**
```typescript
// Firebase Cloud Function
export const sendWelcomeEmail = functions.firestore
  .document('lab_early_access_users/{userId}')
  .onCreate(async (snap, context) => {
    const user = snap.data();
    
    await resend.emails.send({
      from: 'noreply@mfourlabs.dev',
      to: user.email,
      subject: 'Welcome to mfourlabs Early Access',
      html: generateWelcomeEmail(user)
    });
  });
```

## Analytics & Insights

### Key Metrics to Track

1. **Registration Metrics**
   - Daily/weekly signups
   - Conversion rate (landing → registration)
   - Drop-off points in form

2. **Referral Metrics**
   - Referral rate (% of users who refer)
   - Average referrals per user
   - Viral coefficient (K-factor)

3. **Engagement Metrics**
   - Newsletter opt-in rate
   - Interest area distribution
   - Experience level distribution

4. **Source Attribution**
   - Top referral sources
   - Channel performance
   - Geographic distribution

### Recommended Analytics Tools

- **Google Analytics 4**: Page tracking, events
- **Mixpanel**: User behavior, funnels
- **PostHog**: Product analytics, session replay

## API Endpoints (Future)

### Public Endpoints

```typescript
GET  /api/waitlist/stats
  → Returns public stats (total users, etc.)

POST /api/waitlist/register
  → Create new registration

GET  /api/waitlist/position/:email
  → Check waitlist position
```

### Admin Endpoints (Protected)

```typescript
GET    /api/admin/users?status=pending
  → List users by status

PATCH  /api/admin/users/:email/approve
  → Approve user

POST   /api/admin/users/bulk-approve
  → Bulk approve users

GET    /api/admin/analytics
  → Get detailed analytics
```

## Testing Checklist

- [ ] Registration form validation
- [ ] Duplicate email prevention
- [ ] Referral code generation
- [ ] Referral tracking (via URL param)
- [ ] Waitlist position calculation
- [ ] Status updates
- [ ] Priority score calculation
- [ ] Admin dashboard functionality
- [ ] CSV export
- [ ] Mobile responsiveness

## Deployment Notes

### Environment Variables

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### Firestore Indexes

Create composite indexes for:
- `status` + `createdAt` (for getUsersByStatus)
- `referredBy` + `createdAt` (for referral tracking)

## Next Steps

1. **Email Automation**: Set up welcome emails and notifications
2. **Admin Authentication**: Protect admin dashboard
3. **Analytics Dashboard**: Build detailed analytics view
4. **A/B Testing**: Test different form variations
5. **Social Proof**: Add live registration counter
6. **Urgency**: Add countdown timer for limited spots

## Support & Maintenance

### Monitoring

- Set up Firestore usage alerts
- Monitor registration rate
- Track error rates
- Watch for spam/fraud patterns

### Regular Tasks

- Weekly: Review pending approvals
- Weekly: Check referral leaderboard
- Monthly: Analyze conversion metrics
- Monthly: Export data for analysis

---

**Implementation Status**: ✅ Complete
**Last Updated**: 2025-12-07
**Version**: 1.0.0
