const aiService = require('../services/aiService');
const logger = require('../utils/logger');

/**
 * Generate frontend code controller
 */
exports.generateFrontend = async (req, res, next) => {
  try {
    const { prompt, framework } = req.body;
    
    const code = await aiService.generateFrontendCode(prompt, framework);
    
    res.status(200).json({
      success: true,
      code: code,
      framework: framework
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Generate backend code controller
 */
exports.generateBackend = async (req, res, next) => {
  try {
    const { frontendCode, framework } = req.body;
    
    const files = await aiService.generateBackendCode(frontendCode, framework);
    
    res.status(200).json({
      success: true,
      files: files,
      framework: framework
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Generate database schema controller
 */
exports.generateDatabase = async (req, res, next) => {
  try {
    const { schemaDescription, databaseType } = req.body;
    
    const files = await aiService.generateDatabaseSchema(schemaDescription, databaseType);
    
    res.status(200).json({
      success: true,
      files: files,
      databaseType: databaseType
    });
  } catch (err) {
    next(err);
  }
};

