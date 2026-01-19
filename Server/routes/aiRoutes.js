const express = require('express');
const router = express.Router();
const aiController = require('../controllers/aiController');
const authMiddleware = require('../middleware/authMiddleware');
const { aiLimiter } = require('../middleware/rateLimiter');
const {
  frontendGenerationValidation,
  backendGenerationValidation,
  databaseGenerationValidation,
  handleValidationErrors
} = require('../validators/aiValidator');

// All AI routes require authentication
router.use(authMiddleware);

// Apply rate limiting to all AI routes
router.use(aiLimiter);

// Frontend code generation
router.post(
  '/frontend',
  frontendGenerationValidation,
  handleValidationErrors,
  aiController.generateFrontend
);

// Backend code generation
router.post(
  '/backend',
  backendGenerationValidation,
  handleValidationErrors,
  aiController.generateBackend
);

// Database schema generation
router.post(
  '/database',
  databaseGenerationValidation,
  handleValidationErrors,
  aiController.generateDatabase
);

module.exports = router;

