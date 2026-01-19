# 🎨 TitanAx Labs - Frontend Client 

![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-7.1-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat&logo=tailwind-css&logoColor=white)

The **TitanAx Labs Client** is a modern, responsive React application built with Vite, Tailwind CSS, and Framer Motion. It provides an intuitive interface for AI-powered code generation with support for multiple frameworks (React, Angular, Vue, Next.js, etc.) and a seamless user experience.

---

## ✨ Features

- 🎨 **Modern UI** with Tailwind CSS and custom animations
- 🌙 **Dark Mode** support across all pages
- 🔐 **JWT Authentication** with protected routes
- 🤖 **AI Code Generators** for Frontend, Backend, and Database
- 📝 **Monaco Editor** for syntax-highlighted code preview
- 📱 **Fully Responsive** mobile-first design
- ⚡ **Fast Development** with Vite HMR (Hot Module Replacement)
- 🎬 **Smooth Animations** powered by Framer Motion
- 🛡️ **Error Boundary** for graceful error handling
- 📧 **Contact Form** with backend integration

---

## 🛠️ Tech Stack

### Core
- **React 19.1** - UI library
- **Vite 7.1** - Build tool and dev server
- **React Router DOM 7.8** - Client-side routing

### Styling & Animation
- **Tailwind CSS 3.4** - Utility-first CSS framework
- **PostCSS 8.5** - CSS transformations
- **Autoprefixer 10.4** - Auto-add vendor prefixes
- **Framer Motion 12.23** - Animation library

### Code Editor
- **@monaco-editor/react 4.7** - Monaco editor for React
- **React Select 5.10** - Dropdown select components

### Form Handling
- **React Hook Form 7.49** - Performant form library
- **Yup 1.3** - Schema validation

### HTTP & State
- **Axios 1.11** - HTTP client
- **React Toastify 11.0** - Toast notifications
- **React Spinners 0.17** - Loading spinners

### Icons
- **React Icons 5.5** - Icon library

### Development Tools
- **ESLint 9.33** - Linting
- **@vitejs/plugin-react 5.0** - Vite React plugin

---

## 📂 Folder Structure

```
Client/
├── public/
│   └── logo.svg                # Static assets
├── src/
│   ├── assets/                 # Images, fonts, media
│   │   ├── owner.jpg
│   │   ├── co-owner.jpg
│   │   └── ...
│   ├── components/             # Reusable components
│   │   ├── ContactForm.jsx     # Contact form component
│   │   ├── ErrorBoundary.jsx   # Error boundary wrapper
│   │   ├── Navbar.jsx          # Navigation bar
│   │   ├── PrivateRoute.jsx    # Protected route wrapper
│   │   ├── Profile.jsx         # User profile component
│   │   └── logo.jsx            # Logo component
│   ├── config/                 # Configuration
│   │   └── api.js              # API endpoints configuration
│   ├── hooks/                  # Custom React hooks
│   │   └── (custom hooks)
│   ├── pages/                  # Page components
│   │   ├── Client.jsx          # Frontend code generator
│   │   ├── ContactUs.jsx       # Contact page
│   │   ├── Database.jsx        # Database schema generator
│   │   ├── Home.jsx            # Landing page
│   │   ├── Login.jsx           # Login page
│   │   ├── NoPage.jsx          # 404 Not Found page
│   │   ├── Server.jsx          # Backend code generator
│   │   └── Signup.jsx          # Registration page
│   ├── services/               # API service layer
│   │   └── api.js              # HTTP request handlers
│   ├── App.css                 # App-level styles
│   ├── App.jsx                 # Root component with routing
│   ├── index.css               # Global styles & Tailwind imports
│   └── main.jsx                # Entry point
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── eslint.config.js            # ESLint configuration
├── index.html                  # HTML entry point
├── package.json                # Dependencies and scripts
├── postcss.config.js           # PostCSS configuration
├── tailwind.config.js          # Tailwind CSS configuration
├── vite.config.js              # Vite configuration
└── README.md                   # This file
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **Backend server** running (see `../Server/README.md`)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Environment Variables (Optional)

Create a `.env` file in the `Client/` directory:

```bash
# API Base URL (optional - auto-detected if empty)
VITE_API_BASE_URL=
```

> **Note**: If not set, the app will auto-detect:
> - Development: `http://localhost:5000`
> - Production: `https://titanax-labs-render.onrender.com`

See `.env.example` for the template.

### 3️⃣ Run Development Server

```bash
npm run dev
```

The app will be available at: **http://localhost:5173**

### 4️⃣ Build for Production

```bash
npm run build
```

This creates an optimized build in the `dist/` folder.

### 5️⃣ Preview Production Build

```bash
npm run serve
```

Serves the production build locally for testing.

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **dev** | `vite` | Start development server with HMR |
| **build** | `vite build` | Build optimized production bundle |
| **serve** | `vite preview` | Preview production build locally |

---

## 🌐 Pages & Routes

| Route | Component | Description | Auth Required |
|-------|-----------|-------------|---------------|
| `/` | `Home.jsx` | Landing page with features | ❌ |
| `/signup` | `Signup.jsx` | User registration | ❌ |
| `/login` | `Login.jsx` | User login | ❌ |
| `/client` | `Client.jsx` | AI Frontend code generator | ✅ |
| `/server` | `Server.jsx` | AI Backend code generator | ✅ |
| `/database` | `Database.jsx` | AI Database schema generator | ✅ |
| `/contact` | `ContactUs.jsx` | Contact page with form | ❌ |
| `*` | `NoPage.jsx` | 404 Not Found | ❌ |

> **Protected Routes** (✅): Require JWT authentication. Users are redirected to `/login` if not authenticated.

---

## 🔧 Configuration Files

### `vite.config.js`
Vite build configuration with React plugin.

### `tailwind.config.js`
Tailwind CSS configuration:
- Custom color schemes
- Dark mode support
- Extended animations
- Custom utilities

### `postcss.config.js`
PostCSS configuration for Tailwind CSS and Autoprefixer.

### `eslint.config.js`
ESLint rules for code quality and consistency.

---

## 🛡️ Environment Variables

### Available Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `VITE_API_BASE_URL` | ❌ | Auto-detected | Backend API base URL |

### Example `.env`

```bash
# Leave empty for auto-detection
VITE_API_BASE_URL=

# Or set explicitly
VITE_API_BASE_URL=http://localhost:5000

# Production
VITE_API_BASE_URL=https://your-backend-url.com
```

> **Security Note**: Never put API keys or secrets in client-side environment variables. All sensitive operations should be handled by the backend.

---

## 🐛 Common Issues & Fixes

### 1️⃣ CORS Errors
**Problem**: API requests blocked by CORS policy

**Solution**:
- Ensure backend is running and has correct CORS configuration
- Check `FRONTEND_URL` in backend `.env` matches your client URL
- Backend CORS whitelist: `http://localhost:5173`, `http://localhost:3000`

### 2️⃣ Environment Variables Not Loading
**Problem**: `import.meta.env.VITE_*` returns `undefined`

**Solution**:
- Ensure variable name starts with `VITE_`
- Restart dev server after changing `.env`
- Check `.env` file is in `Client/` directory (not root)

### 3️⃣ Port Already in Use
**Problem**: `Port 5173 is already in use`

**Solution**:
- Kill the process using port 5173:
  ```bash
  # Windows
  netstat -ano | findstr :5173
  taskkill /PID <PID> /F
  
  # macOS/Linux
  lsof -ti:5173 | xargs kill -9
  ```
- Or use a different port:
  ```bash
  npm run dev -- --port 3000
  ```

### 4️⃣ Build Fails
**Problem**: Build errors with Vite

**Solution**:
- Clear cache and reinstall:
  ```bash
  rm -rf node_modules package-lock.json
  npm install
  ```
- Check for missing dependencies
- Ensure Node.js version is 18+

### 5️⃣ Authentication Issues
**Problem**: User logged out unexpectedly

**Solution**:
- Check if JWT token is expired (24h validity)
- Ensure backend JWT_SECRET didn't change
- Clear browser localStorage and re-login

---

## 🚀 Deployment

### Deploy to Vercel

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Build and deploy:**
   ```bash
   npm run build
   vercel --prod
   ```

3. **Set environment variables** (if needed) in Vercel dashboard:
   - `VITE_API_BASE_URL=https://your-backend-url.com`

### Deploy to Netlify

1. **Build the app:**
   ```bash
   npm run build
   ```

2. **Deploy via Netlify CLI** or drag & drop `dist/` folder

3. **Add `_redirects` file** in `public/` for SPA routing:
   ```
   /*    /index.html   200
   ```

### Deploy to Static Hosting (AWS S3, GitHub Pages, etc.)

1. **Build:**
   ```bash
   npm run build
   ```

2. **Upload `dist/` folder** to your hosting service

3. **Configure** for SPA routing (redirect all routes to `index.html`)

---

## 🔒 Security Notes

- ✅ All API keys and secrets are handled server-side
- ✅ JWT tokens are stored in `localStorage` (consider `httpOnly` cookies for production)
- ✅ CORS is configured to whitelist specific origins
- ✅ Input validation on both client and server
- ✅ XSS protection via React's built-in escaping
- ❌ **Do NOT** expose API keys in client-side code

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-color',
        secondary: '#your-color',
      }
    }
  }
}
```

### Modify API Base URL

Edit `src/config/api.js`:

```javascript
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://your-production-api.com'
    : 'http://localhost:5000');
```

---

## 🧪 Testing

Currently, the client does not have automated tests. To add tests:

1. **Install testing libraries:**
   ```bash
   npm install -D vitest @testing-library/react @testing-library/jest-dom
   ```

2. **Create test files** (e.g., `App.test.jsx`)

3. **Run tests:**
   ```bash
   npm run test
   ```

---

## 📚 Learn More

- [React Documentation](https://react.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Framer Motion Documentation](https://www.framer.com/motion/)
- [React Router Documentation](https://reactrouter.com/)

---

## 🤝 Contributing

See the main project [README](../README.md) for contribution guidelines.

---

## 📧 Support

For issues or questions, please open an issue on GitHub or contact: **support@titanaxlabs.com**

---

⭐ **Happy Coding!**