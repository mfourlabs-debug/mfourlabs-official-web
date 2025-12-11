# Email Templates - Quick Reference

## 📧 Template Overview

### Welcome Email
**File**: `functions/index.js` → `sendWelcomeEmail`  
**Trigger**: New user registration  
**Subject**: "Welcome to MFOURLABS Early Access"

```
┌─────────────────────────────┐
│     [M4 LOGO - 80x80]       │
│   Welcome to MFOURLABS      │
├─────────────────────────────┤
│ Hi [Name],                  │
│ Thank you for joining...    │
│                             │
│ ┌─────────────────────────┐ │
│ │ YOUR REFERRAL CODE      │ │
│ │   [MFOUR-XXXXX]         │ │
│ │ Share this code...      │ │
│ └─────────────────────────┘ │
│                             │
│ What's Next?                │
│ • We'll notify you...       │
│ • Follow on X...            │
│ • Connect on LinkedIn...    │
│                             │
│ Access ID: ABC12345         │
├─────────────────────────────┤
│ © 2025 MFOURLABS           │
│ First Principles Lab        │
└─────────────────────────────┘
```

### Access Granted Email
**File**: `functions/index.js` → `sendAccessGrantedEmail`  
**Trigger**: Admin approves user  
**Subject**: "🚀 Your MFOURLABS Access Has Been Approved"

```
┌─────────────────────────────┐
│ ╔═══════════════════════╗   │
│ ║  [WHITE LOGO - 80x80] ║   │
│ ║  Access Granted! 🚀   ║   │
│ ╚═══════════════════════╝   │
│   (Green Gradient Header)   │
├─────────────────────────────┤
│ Congratulations, [Name]!    │
│ Your early access...        │
│                             │
│ ┌─────────────────────────┐ │
│ │ 🎯 Getting Started      │ │
│ │ 1. Visit mfourlabs.dev  │ │
│ │ 2. Click "Lab Access"   │ │
│ │ 3. Complete profile     │ │
│ │ 4. Start learning       │ │
│ └─────────────────────────┘ │
│                             │
│   [Enter The Lab →]         │
│      (Black Button)         │
│                             │
│ Access ID: ABC12345         │
│ Email: user@example.com     │
├─────────────────────────────┤
│ © 2025 MFOURLABS           │
│ First Principles Lab        │
└─────────────────────────────┘
```

---

## 🎨 Design Specs

### Logo
- **Size**: 80x80px
- **URL**: `https://mfourlabs.dev/logo.png`
- **Welcome**: Normal logo
- **Access Granted**: White inverted (`filter: brightness(0) invert(1)`)

### Colors
| Element | Color | Hex |
|---------|-------|-----|
| Background | Light blue-gray | `#f6f9fc` |
| Card | White | `#ffffff` |
| Text Primary | Near black | `#1a1a1a` |
| Text Secondary | Dark gray | `#4a4a4a` |
| Success | Green | `#00C853` |
| Button | Black | `#1a1a1a` |

### Typography
- **Font**: -apple-system, BlinkMacSystemFont, Segoe UI
- **H1**: 28-32px, weight 600-700
- **Body**: 16px, line-height 1.6
- **Code**: 24px, monospace

### Layout
- **Max Width**: 600px
- **Padding**: 40px
- **Border Radius**: 8px
- **Shadow**: `0 2px 8px rgba(0,0,0,0.05)`

---

## 🔧 Quick Edits

### Change Logo
```javascript
const LOGO_URL = 'https://yourdomain.com/logo.png';
```

### Change Colors
```javascript
// Background
background-color: #f6f9fc

// Success gradient
background: linear-gradient(135deg, #00C853 0%, #00E676 100%)
```

### Change CTA Link
```javascript
<a href="https://mfourlabs.dev">Enter The Lab →</a>
```

---

## ✅ Testing Checklist

- [ ] Logo displays correctly
- [ ] All links work
- [ ] Responsive on mobile
- [ ] Colors render properly
- [ ] Text is readable
- [ ] CTA button is clickable
- [ ] Footer displays correctly

---

## 📚 Full Documentation

See: `docs/EMAIL_TEMPLATE_DESIGN.md`

---

**Version**: 2.0.0 (with M4 logo)
