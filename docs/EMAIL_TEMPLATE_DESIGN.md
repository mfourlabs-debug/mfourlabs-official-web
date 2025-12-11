# Email Template Design Guide

**Professional Google/Apple-Style Email Templates**

---

## 🎨 Design Overview

The email templates have been redesigned to match the professional standards of Google and Apple emails, featuring:

- **M4 Logo** - Prominently displayed in the header
- **Responsive Table Layout** - Works across all email clients
- **Modern Typography** - System fonts for consistency
- **Clean Spacing** - Professional padding and margins
- **Subtle Shadows** - Depth without being overwhelming
- **Mobile-First** - Optimized for mobile devices

---

## 📧 Email Templates

### 1. Welcome Email
**Trigger**: When a user registers for early access  
**Subject**: "Welcome to MFOURLABS Early Access"

**Features**:
- M4 logo at the top (80x80px)
- Personalized greeting
- Referral code in highlighted box
- "What's Next?" section
- Access ID footer
- Professional footer

**Design Elements**:
- Background: `#f6f9fc` (light blue-gray)
- Card: White with subtle shadow
- Logo: 80x80px, centered
- Typography: -apple-system font stack
- Referral code: Monospace font, 24px

### 2. Access Granted Email
**Trigger**: When admin approves a user  
**Subject**: "🚀 Your MFOURLABS Access Has Been Approved"

**Features**:
- Success gradient header (green)
- White inverted logo on gradient
- Congratulations message
- Getting started checklist
- CTA button "Enter The Lab"
- Access details box
- Help text

**Design Elements**:
- Header gradient: `#00C853` to `#00E676`
- Logo: White (inverted) on gradient
- CTA button: Black with shadow
- Border accent: Green left border

---

## 🖼️ Logo Implementation

### Logo URL
```javascript
const LOGO_URL = 'https://mfourlabs.dev/logo.png';
```

### Logo Specifications

**Welcome Email**:
```html
<img src="${LOGO_URL}" 
     alt="MFOURLABS" 
     style="width: 80px; 
            height: 80px; 
            margin-bottom: 24px; 
            display: block; 
            margin-left: auto; 
            margin-right: auto;">
```

**Access Granted Email** (Inverted on gradient):
```html
<img src="${LOGO_URL}" 
     alt="MFOURLABS" 
     style="width: 80px; 
            height: 80px; 
            margin-bottom: 24px; 
            display: block; 
            margin-left: auto; 
            margin-right: auto; 
            filter: brightness(0) invert(1);">
```

---

## 🎨 Color Palette

### Primary Colors
- **Background**: `#f6f9fc` - Light blue-gray
- **Card**: `#ffffff` - White
- **Text Primary**: `#1a1a1a` - Near black
- **Text Secondary**: `#4a4a4a` - Dark gray
- **Text Muted**: `#6c757d` - Medium gray

### Accent Colors
- **Success**: `#00C853` - Green
- **Success Light**: `#00E676` - Light green
- **Border**: `#e9ecef` - Light gray
- **Background Alt**: `#f8f9fa` - Off-white

### Semantic Colors
- **Link**: `#00C853` - Green
- **Button**: `#1a1a1a` - Black
- **Code**: `#1a1a1a` - Black

---

## 📐 Layout Structure

### Email Container
```
┌─────────────────────────────────────┐
│  Background (#f6f9fc)               │
│  ┌───────────────────────────────┐  │
│  │  Card (600px max, white)      │  │
│  │  ┌─────────────────────────┐  │  │
│  │  │  Header (Logo + Title)  │  │  │
│  │  ├─────────────────────────┤  │  │
│  │  │  Content                │  │  │
│  │  │  - Greeting             │  │  │
│  │  │  - Message              │  │  │
│  │  │  - Highlighted Box      │  │  │
│  │  │  - CTA/Info             │  │  │
│  │  ├─────────────────────────┤  │  │
│  │  │  Footer                 │  │  │
│  │  └─────────────────────────┘  │  │
│  └───────────────────────────────┘  │
└─────────────────────────────────────┘
```

### Spacing Guidelines
- **Outer padding**: 40px
- **Card padding**: 40px
- **Section spacing**: 32px
- **Paragraph spacing**: 16-24px
- **List item spacing**: 8px

---

## 🔤 Typography

### Font Stack
```css
font-family: -apple-system, BlinkMacSystemFont, 
             'Segoe UI', 'Roboto', 'Helvetica', 
             'Arial', sans-serif;
```

### Font Sizes
- **H1 (Main Title)**: 28-32px, weight 600-700
- **H2 (Section)**: 24px, weight 600
- **H3 (Subsection)**: 18-20px, weight 600
- **Body**: 16px, line-height 1.6
- **Small**: 14-15px, line-height 1.5
- **Tiny**: 12-13px, line-height 1.5
- **Code**: 24px (referral), monospace

### Monospace Font Stack
```css
font-family: 'SF Mono', 'Monaco', 'Inconsolata', 
             'Roboto Mono', monospace;
```

---

## 📱 Mobile Responsiveness

### Table-Based Layout
Uses `<table role="presentation">` for maximum email client compatibility.

### Responsive Features
- Max-width: 600px
- Fluid width: 100%
- Padding adjusts for mobile
- Touch-friendly buttons (min 44px height)

### Email Client Support
✅ Gmail (Web, iOS, Android)  
✅ Apple Mail (macOS, iOS)  
✅ Outlook (Web, Desktop)  
✅ Yahoo Mail  
✅ ProtonMail  
✅ Thunderbird  

---

## 🎯 Key Components

### 1. Header with Logo
```html
<td style="padding: 40px 40px 32px; text-align: center;">
  <img src="${LOGO_URL}" alt="MFOURLABS" 
       style="width: 80px; height: 80px; ...">
  <h1>Welcome to MFOURLABS</h1>
</td>
```

### 2. Highlighted Box (Referral Code)
```html
<table role="presentation" style="...">
  <tr>
    <td style="padding: 24px; background-color: #f8f9fa; 
                border-radius: 8px; border: 1px solid #e9ecef;">
      <p>Your Referral Code</p>
      <code>${user.referralCode}</code>
    </td>
  </tr>
</table>
```

### 3. CTA Button
```html
<a href="https://mfourlabs.dev" 
   style="display: inline-block; 
          padding: 16px 40px; 
          background-color: #1a1a1a; 
          color: #ffffff; 
          text-decoration: none; 
          border-radius: 8px; 
          font-weight: 600;">
  Enter The Lab →
</a>
```

### 4. Footer
```html
<td style="padding: 32px 40px; 
           background-color: #f8f9fa; 
           border-top: 1px solid #e9ecef;">
  <p>© 2025 MFOURLABS. All rights reserved.</p>
  <p>First Principles Engineering Research Lab</p>
</td>
```

---

## 🔧 Customization

### Changing Logo
Update the `LOGO_URL` constant in `functions/index.js`:
```javascript
const LOGO_URL = 'https://yourdomain.com/your-logo.png';
```

**Logo Requirements**:
- Format: PNG with transparency
- Size: 80x80px (or larger, will be scaled)
- Hosted: Must be publicly accessible URL
- Alt text: "MFOURLABS"

### Changing Colors
Update inline styles in the email templates:
```javascript
// Primary background
background-color: #f6f9fc

// Success gradient
background: linear-gradient(135deg, #00C853 0%, #00E676 100%)

// Button color
background-color: #1a1a1a
```

### Changing Text
Update the HTML content in the template strings:
```javascript
html: `
  <h1>Your Custom Title</h1>
  <p>Your custom message</p>
`
```

---

## ✅ Best Practices

### DO ✅
- Use table-based layouts for email
- Inline all CSS styles
- Use system fonts
- Test across email clients
- Include alt text for images
- Use semantic HTML
- Keep max-width at 600px
- Use web-safe colors

### DON'T ❌
- Use external CSS files
- Rely on JavaScript
- Use background images (limited support)
- Use web fonts (limited support)
- Use complex layouts
- Forget mobile testing
- Use tiny fonts (<12px)
- Use too many colors

---

## 🧪 Testing

### Test Email Clients
1. Gmail (Web, Mobile)
2. Apple Mail (macOS, iOS)
3. Outlook (Web, Desktop)
4. Yahoo Mail
5. ProtonMail

### Testing Tools
- [Litmus](https://litmus.com/) - Email testing platform
- [Email on Acid](https://www.emailonacid.com/) - Email testing
- [Mailtrap](https://mailtrap.io/) - Email sandbox
- [Resend Preview](https://resend.com/) - Built-in preview

### Manual Testing Checklist
- [ ] Logo displays correctly
- [ ] Colors render properly
- [ ] Links are clickable
- [ ] Buttons are touch-friendly
- [ ] Text is readable
- [ ] Layout is responsive
- [ ] No broken images
- [ ] Footer displays correctly

---

## 📊 Email Metrics

### Track These Metrics
- **Open Rate**: % of recipients who open
- **Click Rate**: % who click CTA
- **Delivery Rate**: % successfully delivered
- **Bounce Rate**: % that bounce
- **Unsubscribe Rate**: % who unsubscribe

### Optimization Tips
1. **Subject Line**: Keep under 50 characters
2. **Preview Text**: First 100 characters matter
3. **CTA**: One primary action per email
4. **Images**: Always include alt text
5. **Testing**: A/B test subject lines

---

## 🔗 Resources

- [Email Design Best Practices](https://www.campaignmonitor.com/resources/guides/email-design-best-practices/)
- [HTML Email Guide](https://www.htmlemailcheck.com/knowledge-base/)
- [Can I Email](https://www.caniemail.com/) - CSS support in email
- [Really Good Emails](https://reallygoodemails.com/) - Inspiration

---

**Last Updated**: December 2025  
**Version**: 2.0.0 (with M4 logo)
