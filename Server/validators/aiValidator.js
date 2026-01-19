const { body, validationResult } = require('express-validator');

/**
 * Validation rules for frontend code generation
 */
const frontendGenerationValidation = [
  body('prompt')
    .trim()
    .notEmpty()
    .withMessage('Prompt is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Prompt must be between 10 and 2000 characters'),
  
  body('framework')
    .trim()
    .notEmpty()
    .withMessage('Framework is required')
    .isIn(['html-css', 'html-tailwind', 'html-bootstrap', 'html-css-js', 'html-tailwind-bootstrap', 'react', 'angular', 'vue', 'svelte', 'nextjs', 'nuxtjs'])
    .withMessage('Invalid framework selected')
];

/**
 * Validation rules for backend code generation
 */
const backendGenerationValidation = [
  body('frontendCode')
    .trim()
    .notEmpty()
    .withMessage('Frontend code is required')
    .isLength({ min: 10, max: 50000 })
    .withMessage('Frontend code must be between 10 and 50000 characters'),
  
  body('framework')
    .trim()
    .notEmpty()
    .withMessage('Framework is required')
    .isIn(['node-express', 'django', 'flask', 'spring-boot', 'fastapi'])
    .withMessage('Invalid framework selected')
];

/**
 * Validation rules for database schema generation
 */
const databaseGenerationValidation = [
  body('schemaDescription')
    .trim()
    .notEmpty()
    .withMessage('Schema description is required')
    .isLength({ min: 10, max: 2000 })
    .withMessage('Schema description must be between 10 and 2000 characters'),
  
  body('databaseType')
    .trim()
    .notEmpty()
    .withMessage('Database type is required')
    .isIn(['mysql', 'postgresql', 'mongodb', 'sqlite'])
    .withMessage('Invalid database type selected')
];

/**
 * Middleware to handle validation errors
 */
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field: err.path || err.param,
        message: err.msg
      }))
    });
  }
  next();
};

module.exports = {
  frontendGenerationValidation,
  backendGenerationValidation,
  databaseGenerationValidation,
  handleValidationErrors
};

