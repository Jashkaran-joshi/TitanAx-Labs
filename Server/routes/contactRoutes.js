const express = require('express');
const router = express.Router();
const contactController = require('../controllers/contactController');
const { contactValidation, handleValidationErrors } = require('../validators/contactValidator');
const { apiLimiter } = require('../middleware/rateLimiter');

// POST /api/contact/submit
router.post(
  '/submit',
  apiLimiter,
  contactValidation,
  handleValidationErrors,
  contactController.submitMessage
);

module.exports = router;
