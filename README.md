# 🚀 TitanAx Labs - AI Code Generator Platform

![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
![React](https://img.shields.io/badge/React-19.1-61DAFB?style=flat&logo=react&logoColor=black)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat&logo=mongodb&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-blue.svg)

**TitanAx Labs** is an AI-powered full-stack platform that revolutionizes web development by generating production-ready **frontend components**, **backend APIs**, and **database schemas** across multiple frameworks and languages. Built with modern technologies and a sleek UI, it empowers developers to rapidly prototype, reduce repetitive coding, and maintain consistent, high-quality code.

---

## ✨ Features

### 🎨 AI Code Generation
- **Frontend Generator**: Create React, Angular, Vue, Svelte, Next.js, or Nuxt.js components with customizable frameworks (HTML+CSS, Tailwind, Bootstrap)
- **Backend Generator**: Generate REST APIs for Node.js/Express, Django, Flask, Spring Boot, or FastAPI based on frontend structure
- **Database Generator**: Auto-generate schemas for MySQL, PostgreSQL, MongoDB, and SQLite with proper relationships

### 🔐 Authentication & Security
- JWT-based authentication with refresh token support
- Secure password hashing with bcrypt (12 rounds)
- Email verification and password reset functionality
- Rate limiting on all endpoints (authentication and API)
- Helmet.js for security headers
- MongoDB injection protection
- CORS with whitelist configuration

### 🎯 User Experience
- **Modern UI**: Built with React, Tailwind CSS, and Framer Motion for smooth animations
- **Dark Mode**: Full dark mode support across all pages
- **Code Management**: Preview, copy, and download generated code instantly
- **Monaco Editor**: Syntax-highlighted code preview with multiple language support
- **Responsive Design**: Mobile-first design that works on all devices

### 📊 Additional Features
- Interactive contact form with backend integration
- User profile management
- Swagger API documentation at `/api-docs`
- Error boundary for graceful error handling
- Protected routes with authentication middleware
- Winston logging for debugging and monitoring

---

## 🛠️ Tech Stack

### Frontend (Client)
- **Framework**: React 19.1 with Vite 7.1
- **Styling**: Tailwind CSS 3.4 with PostCSS
- **Animation**: Framer Motion 12.23
- **Code Editor**: Monaco Editor (React wrapper)
- **Form Handling**: React Hook Form 7.49 + Yup validation
- **Routing**: React Router DOM 7.8
- **HTTP Client**: Axios 1.11
- **Icons**: React Icons 5.5
- **Notifications**: React Toastify 11.0

### Backend (Server)
- **Runtime**: Node.js with Express 4.17
- **Database**: MongoDB with Mongoose 8.18
- **Authentication**: JWT (jsonwebtoken 9.0)
- **Security**: Helmet 7.1, express-mongo-sanitize, CORS
- **Rate Limiting**: express-rate-limit 7.1
- **Validation**: express-validator 7.0
- **AI Integration**: OpenAI API 5.19
- **Logging**: Winston 3.11
- **API Docs**: Swagger (swagger-jsdoc + swagger-ui-express)
- **Testing**: Jest 29.7 with Supertest

### DevOps & Tools
- **Testing**: Jest + Supertest for backend unit/integration tests
- **Linting**: ESLint 9.33
- **Package Manager**: npm
- **Version Control**: Git
>>>>>>> 1448943 (Check)

---

## 📂 Project Structure

```

TitanAx-Labs/
│
├── Client/                      # Frontend (React + Vite)
│   ├── public/                  # Static assets (logo, images)
│   ├── src/
│   │   ├── assets/              # Images, fonts, media files
│   │   ├── components/          # Reusable React components
│   │   │   ├── ContactForm.jsx
│   │   │   ├── ErrorBoundary.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── PrivateRoute.jsx
│   │   │   ├── Profile.jsx
│   │   │   └── logo.jsx
│   │   ├── config/              # Configuration files
│   │   │   └── api.js           # API endpoints configuration
│   │   ├── hooks/               # Custom React hooks
│   │   ├── pages/               # Page components
│   │   │   ├── Client.jsx       # AI Frontend Generator
│   │   │   ├── ContactUs.jsx    # Contact page
│   │   │   ├── Database.jsx     # AI Database Generator
│   │   │   ├── Home.jsx         # Landing page
│   │   │   ├── Login.jsx        # User login
│   │   │   ├── NoPage.jsx       # 404 page
│   │   │   ├── Server.jsx       # AI Backend Generator
│   │   │   └── Signup.jsx       # User registration
│   │   ├── services/            # API service layer
│   │   │   └── api.js           # HTTP request handlers
│   │   ├── App.jsx              # Root component with routing
│   │   ├── main.jsx             # Entry point
│   │   └── index.css            # Global styles
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── eslint.config.js         # ESLint configuration
│   ├── index.html               # HTML entry point
│   ├── package.json
│   ├── postcss.config.js        # PostCSS configuration
│   ├── tailwind.config.js       # Tailwind CSS configuration
│   ├── vite.config.js           # Vite build configuration
│   └── README.md
│
├── Server/                      # Backend (Node + Express + MongoDB)
│   ├── __tests__/               # Test files
│   │   └── user.test.js
│   ├── config/                  # Configuration files
│   │   └── swagger.js           # Swagger API documentation config
│   ├── controllers/             # Request handlers
│   │   ├── aiController.js      # AI generation logic
│   │   ├── contactController.js # Contact form handler
│   │   └── userController.js    # User authentication logic
│   ├── middleware/              # Express middleware
│   │   ├── authMiddleware.js    # JWT authentication
│   │   ├── errorHandler.js      # Centralized error handling
│   │   └── rateLimiter.js       # Rate limiting configuration
│   ├── models/                  # Mongoose schemas
│   │   ├── Contact.js
│   │   └── User.js
│   ├── routes/                  # API routes
│   │   ├── aiRoutes.js          # /api/ai/*
│   │   ├── contactRoutes.js     # /api/contact/*
│   │   └── userRoutes.js        # /api/users/*
│   ├── services/                # Business logic layer
│   │   ├── aiService.js         # OpenAI integration
│   │   ├── contactService.js    # Contact form service
│   │   ├── emailService.js      # Email notifications (placeholder)
│   │   └── userService.js       # User management
│   ├── utils/                   # Utility functions
│   │   ├── errors.js            # Custom error classes
│   │   └── logger.js            # Winston logger configuration
│   ├── validators/              # Input validation
│   │   ├── aiValidator.js
│   │   ├── contactValidator.js
│   │   └── userValidator.js
│   ├── .env.example             # Environment variables template
│   ├── .gitignore
│   ├── index.js                 # Server entry point
│   ├── jest.config.js           # Jest test configuration
│   ├── package.json
│   └── README.md
│
├── .gitignore
└── README.md                    # This file
>>>>>>> 1448943 (Check)
```

---


## 🚀 Installation & Setup

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: Local instance or MongoDB Atlas account

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/titanax-labs.git
cd titanax-labs
```

### 2️⃣ Install Dependencies

#### Install Server Dependencies
```bash
cd Server
npm install
```

#### Install Client Dependencies
```bash
cd ../Client
npm install
```

### 3️⃣ Environment Variables Setup

#### Server Environment Variables
Create `Server/.env` file:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your_very_long_random_jwt_secret_here

# Server Port
PORT=5000

# Node Environment
NODE_ENV=development

# OpenAI API Key
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:5173
```

> **See `Server/.env.example` for complete template**

#### Client Environment Variables (Optional)
Create `Client/.env` file (optional):

```bash
# API Base URL (auto-detected if empty)
VITE_API_BASE_URL=
```

> **Note**: Client typically doesn't need environment variables as API URL is auto-configured

### 4️⃣ Run the Application

#### Development Mode

**Terminal 1 - Start Backend:**
```bash
cd Server
npm run dev
```
Server runs at: `http://localhost:5000`

**Terminal 2 - Start Frontend:**
```bash
cd Client
npm run dev
```
Client runs at: `http://localhost:5173`

#### Production Mode

**Build Frontend:**
```bash
cd Client
npm run build
npm run serve
```

**Run Backend:**
```bash
cd Server
npm start
```

---

## 📖 API Overview

### Base URLs
- **Development**: `http://localhost:5000`
- **Production**: `https://titanax-labs-render.onrender.com`

### Authentication
Most endpoints require JWT authentication. Include the token in headers:
```
Authorization: Bearer <your_jwt_token>
```

### API Endpoints

| Method | Endpoint | Auth Required | Description |
|--------|----------|---------------|-------------|
| `POST` | `/api/users/signup` | ❌ | Register new user |
| `POST` | `/api/users/login` | ❌ | Login user |
| `POST` | `/api/users/refresh-token` | ❌ | Refresh access token |
| `GET` | `/api/users/profile` | ✅ | Get user profile |
| `POST` | `/api/users/logout` | ✅ | Logout user |
| `POST` | `/api/users/forgot-password` | ❌ | Request password reset |
| `POST` | `/api/users/reset-password` | ❌ | Reset password with token |
| `GET` | `/api/users/verify-email` | ❌ | Verify email address |
| `POST` | `/api/contact/submit` | ❌ | Submit contact form |
| `POST` | `/api/ai/frontend` | ✅ | Generate frontend code |
| `POST` | `/api/ai/backend` | ✅ | Generate backend code |
| `POST` | `/api/ai/database` | ✅ | Generate database schema |
| `GET` | `/api/health` | ❌ | Server health check |
| `GET` | `/api-docs` | ❌ | Swagger documentation |

**📚 Full API Documentation**: Visit `/api-docs` when server is running

---

## 🧪 Testing

### Run Backend Tests
```bash
cd Server
npm test                # Run all tests
npm run test:watch      # Run tests in watch mode
npm run test:coverage   # Run tests with coverage report
```

---

## 🌍 Deployment

### Frontend (Vercel/Netlify)

1. **Build the client:**
   ```bash
   cd Client
   npm run build
   ```

2. **Deploy `Client/dist/` folder** to:
   - **Vercel**: Connect GitHub repo or use Vercel CLI
   - **Netlify**: Drag & drop `dist/` folder or use Netlify CLI

3. **Set environment variable** (if needed):
   - `VITE_API_BASE_URL`: Your backend URL

### Backend (Render/Railway/Heroku)

1. **Set environment variables** on hosting platform:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `FRONTEND_URL`
   - `NODE_ENV=production`

2. **Deploy** via:
   - **Render**: Connect GitHub repo → Auto-deploy
   - **Railway**: Use Railway CLI or GitHub integration
   - **Heroku**: Use Heroku CLI or GitHub auto-deploy

3. **Start command**: `npm start` (already in package.json)

---

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. **Fork the repository**
2. **Create a feature branch**:
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes** and commit:
   ```bash
   git commit -m "Add: your feature description"
   ```
4. **Push to your fork**:
   ```bash
   git push origin feature/your-feature-name
   ```
5. **Open a Pull Request**

### Development Guidelines
- Follow existing code style and conventions
- Write unit tests for new features
- Update documentation as needed
- Ensure all tests pass before submitting PR
>>>>>>> 1448943 (Check)

---

## 📜 License

This project is licensed under the **MIT License** – you are free to use, modify, and distribute this software.

---

## 👥 Authors

- **Jaskaran Joshi** - *Founder & Lead Architect* - [LinkedIn](https://www.linkedin.com/in/jaskaran-joshi)
- **Mukul Malik** - *Co-Founder* - [LinkedIn](https://www.linkedin.com/in/mukulmalik23/)

---

## 📧 Contact

- **Email**: support@titanaxlabs.com
- **Phone**: +91 80002 60019
- **Address**: 42 Innovator Street, Pratap Nagar Tech Zone, Jaipur, Rajasthan 302033, India

---

## 🙏 Acknowledgments

- [OpenAI](https://openai.com/) for the GPT API
- [MongoDB](https://www.mongodb.com/) for database services
- The open-source community for amazing tools and libraries

---

⭐ **If you find this project useful, please give it a star!**

---

## 📝 Changelog

### Version 1.0.0 (2026-01-19)
- Initial release with AI code generation
- User authentication system
- Frontend, Backend, and Database generators
- Swagger API documentation
- Production-ready security features
