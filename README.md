# mfourlabs - First Principles Engineering

<div align="center">

**A modern web application for early access registration and waitlist management**

[![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat&logo=firebase&logoColor=black)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/React-61DAFB?style=flat&logo=react&logoColor=black)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-646CFF?style=flat&logo=vite&logoColor=white)](https://vitejs.dev/)

</div>

---

## 🚀 Features

- **Early Access Registration** - Collect user information with validation
- **Waitlist Management** - Track and manage user positions
- **Email Notifications** - Automated welcome emails via Resend
- **Social Proof** - Real-time visitor tracking and display
- **Privacy Policy** - Built-in privacy policy modal
- **Firebase Integration** - Firestore database and Cloud Functions
- **SEO Optimized** - Meta tags, sitemap, robots.txt
- **Responsive Design** - Mobile-first, modern UI

---

## 📋 Prerequisites

- **Node.js** (v18 or higher)
- **npm** or **yarn**
- **Firebase Account** (for deployment)
- **Resend API Key** (for email notifications)
- **Google Gemini API Key** (for AI features)

---

## 🛠️ Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment Variables

Create a `.env.local` file in the root directory:

```env
VITE_GEMINI_API_KEY=your_gemini_api_key_here
VITE_FIREBASE_API_KEY=your_firebase_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

### 3. Run Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`

---

## 🏗️ Production Build

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

### Type Check

```bash
npm run lint
```

---

## 🚢 Deployment

### Deploy to Firebase

1. **Install Firebase CLI** (if not already installed):
   ```bash
   npm install -g firebase-tools
   ```

2. **Login to Firebase**:
   ```bash
   firebase login
   ```

3. **Initialize Firebase** (if not already done):
   ```bash
   firebase init
   ```

4. **Deploy**:
   ```bash
   npm run deploy
   ```

   Or manually:
   ```bash
   firebase deploy
   ```

### Deploy Functions Only

```bash
firebase deploy --only functions
```

### Deploy Hosting Only

```bash
firebase deploy --only hosting
```

---

## 📁 Project Structure

```
mfourlabs-official-web/
├── components/          # React components
│   ├── LabRegistration.tsx
│   ├── PrivacyPolicy.tsx
│   ├── SocialProofBanner.tsx
│   └── ...
├── services/           # Service layer
│   ├── firebase.ts
│   ├── emailService.ts
│   └── ...
├── types/              # TypeScript types
├── functions/          # Firebase Cloud Functions
│   ├── index.js
│   └── package.json
├── public/             # Static assets
│   ├── favicon.ico
│   ├── robots.txt
│   ├── sitemap.xml
│   └── ...
├── docs/               # Documentation
├── App.tsx             # Main app component
├── index.html          # HTML entry point
├── vite.config.ts      # Vite configuration
├── firebase.json       # Firebase configuration
├── firestore.rules     # Firestore security rules
└── package.json        # Dependencies
```

---

## 🔧 Configuration Files

### Firebase Configuration

- **`firebase.json`** - Firebase hosting and functions config
- **`firestore.rules`** - Database security rules
- **`functions/index.js`** - Cloud Functions

### Build Configuration

- **`vite.config.ts`** - Vite build configuration
- **`tsconfig.json`** - TypeScript configuration

---

## 📚 Documentation

Additional documentation is available in the `/docs` folder:

- **Email Setup** - Email notification configuration
- **Firebase Deployment** - Detailed deployment guide
- **Security Guide** - Security best practices
- **SEO Optimization** - SEO implementation details
- **Privacy & Analytics** - Privacy-first analytics

---

## 🔐 Environment Variables

Required environment variables:

| Variable | Description |
|----------|-------------|
| `VITE_GEMINI_API_KEY` | Google Gemini API key |
| `VITE_FIREBASE_API_KEY` | Firebase API key |
| `VITE_FIREBASE_AUTH_DOMAIN` | Firebase auth domain |
| `VITE_FIREBASE_PROJECT_ID` | Firebase project ID |
| `VITE_FIREBASE_STORAGE_BUCKET` | Firebase storage bucket |
| `VITE_FIREBASE_MESSAGING_SENDER_ID` | Firebase messaging sender ID |
| `VITE_FIREBASE_APP_ID` | Firebase app ID |

---

## 🤝 Contributing

This is a private project. For questions or issues, contact the development team.

---

## 📄 License

© 2025 MFOURLABS - First Principles Engineering. All rights reserved.

---

## 🆘 Support

For support and questions:
- Email: support@mfourlabs.dev
- Documentation: `/docs` folder

---

**Built with ❤️ using React, TypeScript, Firebase, and Vite**
