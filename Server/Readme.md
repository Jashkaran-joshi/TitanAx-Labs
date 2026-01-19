# ⚙️ TitanAx Labs - Backend Server 

![Node.js](https://img.shields.io/badge/Node.js-18+-43853D?style=flat&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-4.17-000000?style=flat&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-6.0+-47A248?style=flat&logo=mongodb&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-9.0-000000?style=flat&logo=jsonwebtokens&logoColor=white)

The **TitanAx Labs Backend** is a robust, production-ready Node.js + Express API server with MongoDB integration, JWT authentication, OpenAI API integration, comprehensive security features, and Swagger documentation. It powers the AI code generation platform with secure user management and rate-limited endpoints.

---

## ✨ Features

- 🔐 **JWT Authentication** with refresh tokens
- 🤖 **OpenAI Integration** for AI code generation
- 🛡️ **Security** - Helmet, CORS, rate limiting, MongoDB sanitization
- 📊 **MongoDB** with Mongoose ODM
- ✉️ **Email Service** (placeholder for SendGrid/AWS SES)
- 📝 **Input Validation** with express-validator
- 📚 **Swagger Documentation** at `/api-docs`
- 🧪 **Unit Testing** with Jest and Supertest
- 📋 **Logging** with Winston
- 🔄 **Error Handling** - Centralized error handler
- ⏱️ **Rate Limiting** - Prevent abuse and DoS attacks

---

## 🛠️ Tech Stack

### Core
- **Node.js** - Runtime environment
- **Express 4.17** - Web framework
- **MongoDB** - Database
- **Mongoose 8.18** - MongoDB ODM

### Authentication & Security
- **jsonwebtoken 9.0** - JWT authentication
- **bcrypt 5.0** - Password hashing
- **helmet 7.1** - Security headers
- **cors 2.8** - Cross-Origin Resource Sharing
- **express-rate-limit 7.1** - Rate limiting
- **express-mongo-sanitize 2.2** - NoSQL injection protection
- **express-validator 7.0** - Input validation

### AI & Services
- **openai 5.19** - OpenAI API integration
- **winston 3.11** - Logging

### API Documentation
- **swagger-jsdoc 6.2** - Swagger JSDoc
- **swagger-ui-express 5.0** - Swagger UI

### Testing
- **jest 29.7** - Testing framework
- **supertest 6.3** - HTTP testing

### Development Tools
- **nodemon 3.1** - Auto-restart on file changes
- **dotenv 8.6** - Environment variable management

---

## 📂 Folder Structure

```
Server/
├── __tests__/                  # Test files
│   └── user.test.js            # User service tests
├── config/                     # Configuration
│   └── swagger.js              # Swagger API documentation config
├── controllers/                # Request handlers (Route logic)
│   ├── aiController.js         # AI generation endpoints
│   ├── contactController.js    # Contact form handler
│   └── userController.js       # Authentication endpoints
├── middleware/                 # Express middleware
│   ├── authMiddleware.js       # JWT verification
│   ├── errorHandler.js         # Centralized error handling
│   └── rateLimiter.js          # Rate limiting configurations
├── models/                     # Mongoose schemas/models
│   ├── Contact.js              # Contact form schema
│   └── User.js                 # User schema with auth fields
├── routes/                     # API route definitions
│   ├── aiRoutes.js             # /api/ai/* routes
│   ├── contactRoutes.js        # /api/contact/* routes
│   └── userRoutes.js           # /api/users/* routes
├── services/                   # Business logic layer
│   ├── aiService.js            # OpenAI integration logic
│   ├── contactService.js       # Contact form service
│   ├── emailService.js         # Email notifications (placeholder)
│   └── userService.js          # User management logic
├── utils/                      # Utility functions
│   ├── errors.js               # Custom error classes
│   └── logger.js               # Winston logger configuration
├── validators/                 # Input validation schemas
│   ├── aiValidator.js          # AI generation validation
│   ├── contactValidator.js     # Contact form validation
│   └── userValidator.js        # User auth validation
├── logs/                       # Log files (auto-generated)
├── .env                        # Environment variables (DO NOT COMMIT)
├── .env.example                # Environment variables template
├── .gitignore                  # Git ignore rules
├── index.js                    # Server entry point
├── jest.config.js              # Jest configuration
├── package.json                # Dependencies and scripts
└── README.md                   # This file
```

---

## 🚀 Setup & Installation

### Prerequisites

- **Node.js**: v18.0.0 or higher
- **npm**: v8.0.0 or higher
- **MongoDB**: Local instance or MongoDB Atlas account
- **OpenAI API Key**: Get from [OpenAI Platform](https://platform.openai.com/api-keys)

### 1️⃣ Install Dependencies

```bash
npm install
```

### 2️⃣ Environment Variables Setup

Create a `.env` file in the `Server/` directory:

```bash
# MongoDB Configuration
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/database?retryWrites=true&w=majority

# JWT Secret (generate with: node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")
JWT_SECRET=your_very_long_random_jwt_secret_here_at_least_64_characters

# Server Port
PORT=5000

# Node Environment (development, production)
NODE_ENV=development

# OpenAI API Key (get from https://platform.openai.com/api-keys)
OPENAI_API_KEY=sk-proj-your_openai_api_key_here

# Frontend URL (for CORS and email links)
FRONTEND_URL=http://localhost:5173

# Email Configuration (optional, for future email service implementation)
# EMAIL_SERVICE=gmail
# EMAIL_USER=your_email@gmail.com
# EMAIL_PASS=your_app_specific_password
# EMAIL_FROM=noreply@titanaxlabs.com
```

> **Security**: See `.env.example` for a complete template. **Never commit `.env` to Git!**

### 3️⃣ Generate Secure JWT Secret

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

Copy the output and use it as your `JWT_SECRET`.

### 4️⃣ Run the Server

#### Development Mode (with auto-restart)
```bash
npm run dev
```

#### Production Mode
```bash
npm start
```

Server will run at: **http://localhost:5000**

---

## 📜 Available Scripts

| Script | Command | Description |
|--------|---------|-------------|
| **start** | `node index.js` | Start production server |
| **dev** | `nodemon index.js` | Start dev server with auto-restart |
| **test** | `jest` | Run all tests |
| **test:watch** | `jest --watch` | Run tests in watch mode |
| **test:coverage** | `jest --coverage` | Run tests with coverage report |

---

## 🌐 API Documentation

### Base URL
- **Development**: `http://localhost:5000`
- **Production**: `https://titanax-labs-render.onrender.com`

### Swagger Documentation
Interactive API docs available at: **http://localhost:5000/api-docs**

### Authentication
Most endpoints require a JWT token in the `Authorization` header:
```
Authorization: Bearer <your_jwt_token>
```

### Response Format

#### Success Response
```json
{
  "success": true,
  "message": "Operation successful",
  "data": { ... }
}
```

#### Error Response
```json
{
  "success": false,
  "message": "Error description",
  "errors": [
    {
      "field": "email",
      "message": "Email is required"
    }
  ]
}
```

---

## 📍 API Endpoints

### Authentication (`/api/users`)

| Method | Endpoint | Auth | Description | Request Body |
|--------|----------|------|-------------|--------------|
| `POST` | `/signup` | ❌ | Register new user | `{ name, email, role, password }` |
| `POST` | `/login` | ❌ | Login user | `{ email, password }` |
| `POST` | `/refresh-token` | ❌ | Refresh access token | `{ refreshToken }` |
| `GET` | `/profile` | ✅ | Get user profile | - |
| `POST` | `/logout` | ✅ | Logout user | - |
| `POST` | `/forgot-password` | ❌ | Request password reset | `{ email }` |
| `POST` | `/reset-password` | ❌ | Reset password | `{ token, newPassword }` |
| `GET` | `/verify-email?token=...` | ❌ | Verify email address | Query: `token` |

### AI Code Generation (`/api/ai`)

**All AI endpoints require authentication**

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| `POST` | `/frontend` | Generate frontend code | `{ prompt, framework }` |
| `POST` | `/backend` | Generate backend code | `{ frontendCode, framework }` |
| `POST` | `/database` | Generate database schema | `{ schemaDescription, databaseType }` |

#### Frontend Generation Frameworks
- `html-css`
- `html-tailwind`
- `html-bootstrap`
- `html-css-js`
- `html-tailwind-bootstrap`
- `react`
- `angular`
- `vue`
- `svelte`
- `nextjs`
- `nuxtjs`

#### Backend Generation Frameworks
- `node-express`
- `django`
- `flask`
- `spring-boot`
- `fastapi`

#### Database Types
- `mysql`
- `postgresql`
- `mongodb`
- `sqlite`

### Contact (`/api/contact`)

| Method | Endpoint | Auth | Description | Request Body |
|--------|----------|------|-------------|--------------|
| `POST` | `/submit` | ❌ | Submit contact form | `{ name, email, message }` |

### Health Check

| Method | Endpoint | Auth | Description |
|--------|----------|------|-------------|
| `GET` | `/api/health` | ❌ | Server health status |

### Swagger Docs

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api-docs` | Interactive API documentation |

---

## 🔒 Security Features

### 1. Helmet.js
- Sets security HTTP headers
- Prevents common vulnerabilities (XSS, clickjacking, etc.)
- Content Security Policy (CSP) configured

### 2. CORS
- Whitelist-based origin validation
- Credentials support enabled
- Allowed origins:
  - `http://localhost:5173` (dev)
  - `http://localhost:3000` (alt dev)
  - `https://titanax-labs.vercel.app` (production)

### 3. Rate Limiting

| Limiter | Applied To | Max Requests | Window |
|---------|-----------|--------------|--------|
| **Auth Limiter** | Login, Signup, Password Reset | 5 requests | 15 minutes |
| **AI Limiter** | All AI endpoints | 10 requests | 1 minute |
| **API Limiter** | Contact form | 10 requests | 15 minutes |

### 4. Input Validation
- All inputs validated with `express-validator`
- Schema-based validation for each endpoint
- Sanitization against XSS and injection

### 5. MongoDB Injection Protection
- `express-mongo-sanitize` removes `$` and `.` from user input
- Prevents NoSQL injection attacks

### 6. Password Security
- Bcrypt hashing with 12 salt rounds
- Passwords never stored in plain text
- Password reset with time-limited tokens

### 7. JWT Security
- Tokens expire in 24 hours
- Refresh tokens for session renewal
- Tokens include user ID and email

---

## 🛡️ Environment Variables

### Required Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `MONGODB_URI` | ✅ | - | MongoDB connection string |
| `JWT_SECRET` | ✅ | - | Secret for signing JWT tokens (64+ chars) |
| `OPENAI_API_KEY` | ✅ | - | OpenAI API key for code generation |
| `PORT` | ❌ | `5000` | Server port |
| `NODE_ENV` | ❌ | `development` | Environment (development/production) |
| `FRONTEND_URL` | ❌ | `http://localhost:5173` | Frontend URL for CORS |

### Optional Variables (Email)

| Variable | Description |
|----------|-------------|
| `EMAIL_SERVICE` | Email service provider (gmail, etc.) |
| `EMAIL_USER` | Email account username |
| `EMAIL_PASS` | Email account password/app password |
| `EMAIL_FROM` | Sender email address |

---

## 🐛 Common Issues & Fixes

### 1️⃣ MongoDB Connection Failed
**Problem**: `MongoNetworkError: failed to connect to server`

**Solution**:
- Check `MONGODB_URI` is correct
- Verify database user credentials
- Check MongoDB Atlas IP whitelist (add `0.0.0.0/0` for testing)
- Ensure network connectivity

### 2️⃣ JWT Secret Missing
**Problem**: `Missing required environment variables: JWT_SECRET`

**Solution**:
- Create `.env` file in `Server/` directory
- Add `JWT_SECRET` with a long, random string
- Generate with: `node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"`

### 3️⃣ OpenAI API Error
**Problem**: `OpenAI API key is not configured` or `Insufficient credits`

**Solution**:
- Verify `OPENAI_API_KEY` in `.env`
- Check API key is valid at [OpenAI Platform](https://platform.openai.com/api-keys)
- Ensure you have sufficient credits

### 4️⃣ Rate Limit Exceeded
**Problem**: `429 Too Many Requests`

**Solution**:
- Wait for the rate limit window to reset
- Adjust rate limits in `middleware/rateLimiter.js` for development
- Use different IP/account for testing

### 5️⃣ CORS Error from Frontend
**Problem**: `Access-Control-Allow-Origin` error

**Solution**:
- Add frontend URL to `allowedOrigins` in `index.js`
- Set `FRONTEND_URL` in `.env`
- Restart server after changes

---

## 🧪 Testing

### Run Tests

```bash
# Run all tests
npm test

# Run in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Files

- `__tests__/user.test.js` - User authentication tests

### Writing Tests

Example test structure:

```javascript
const request = require('supertest');
const app = require('../index');

describe('POST /api/users/signup', () => {
  it('should create a new user', async () => {
    const res = await request(app)
      .post('/api/users/signup')
      .send({
        name: 'Test User',
        email: 'test@example.com',
        role: 'Developer',
        password: 'Password123'
      });
    
    expect(res.statusCode).toBe(201);
    expect(res.body.success).toBe(true);
  });
});
```

---

## 🚀 Deployment

### Deploy to Render

1. **Create new Web Service** on Render

2. **Connect GitHub repository**

3. **Set environment variables:**
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `OPENAI_API_KEY`
   - `FRONTEND_URL` (your frontend URL)
   - `NODE_ENV=production`

4. **Build Command**: `npm install`

5. **Start Command**: `npm start`

6. **Deploy** - Render will auto-deploy on push

### Deploy to Railway

1. **Create new project** on Railway

2. **Add MongoDB plugin** (or use external MongoDB)

3. **Set environment variables** (same as Render)

4. **Deploy** via GitHub integration

### Deploy to Heroku

1. **Create Heroku app:**
   ```bash
   heroku create your-app-name
   ```

2. **Set environment variables:**
   ```bash
   heroku config:set MONGODB_URI=your_uri
   heroku config:set JWT_SECRET=your_secret
   heroku config:set OPENAI_API_KEY=your_key
   heroku config:set NODE_ENV=production
   ```

3. **Deploy:**
   ```bash
   git push heroku main
   ```

---

## 📊 Logging

The server uses **Winston** for logging:

- **Console**: Development logs (info level)
- **File**: `logs/error.log` for errors
- **File**: `logs/combined.log` for all logs

### Log Levels
- `error` - Critical errors
- `warn` - Warnings
- `info` - General information
- `debug` - Debugging information

---

## 🔄 Error Handling

Centralized error handler in `middleware/errorHandler.js`:

- Custom `AppError` class for operational errors
- Validation errors formatted consistently
- MongoDB errors handled gracefully
- Stack traces in development mode only

---

## 📚 Learn More

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://www.mongodb.com/docs/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [JWT Documentation](https://jwt.io/)
- [OpenAI API Documentation](https://platform.openai.com/docs/)

---

## 🤝 Contributing

See the main project [README](../README.md) for contribution guidelines.

---

## 📧 Support

For issues or questions, please open an issue on GitHub or contact: **support@titanaxlabs.com**

---

⚙️ **Happy Coding!**
