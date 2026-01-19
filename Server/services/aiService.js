const OpenAI = require('openai');
const logger = require('../utils/logger');
const { AppError } = require('../utils/errors');

/**
 * Service layer for AI-related business logic
 */
class AIService {
  constructor() {
    if (!process.env.OPENAI_API_KEY) {
      logger.error('OPENAI_API_KEY is not defined');
      throw new Error('OpenAI API key is not configured');
    }

    this.client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY
    });
  }

  /**
   * Generate frontend code
   * @param {string} prompt - User's description
   * @param {string} framework - Selected framework
   * @returns {Promise<string>} Generated code
   */
  async generateFrontendCode(prompt, framework) {
    try {
      logger.info(`Generating frontend code for framework: ${framework}`);

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert UI developer. Generate clean, responsive, modern code in the selected framework. Return ONLY the code without explanations, wrapped in code blocks if needed.'
          },
          {
            role: 'user',
            content: `
Generate a UI component for: ${prompt}
Framework: ${framework}

Requirements:
- Code must be clean, well-structured, responsive
- Include hover effects, animations, typography
- Return ONLY the code inside a single file (HTML for HTML frameworks, JS/JSX for React/Angular/Vue, etc.)
- Use correct syntax for the chosen framework
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const generatedCode = response.choices[0].message.content;
      
      // Extract code from markdown code blocks if present
      const codeMatch = generatedCode.match(/```(?:\w+)?\n?([\s\S]*?)```/);
      const extractedCode = codeMatch ? codeMatch[1].trim() : generatedCode.trim();

      logger.info('Frontend code generated successfully');
      return extractedCode;
    } catch (error) {
      logger.error('Error generating frontend code:', error);
      throw new AppError('Failed to generate frontend code', 500);
    }
  }

  /**
   * Generate backend code
   * @param {string} frontendCode - Frontend code to analyze
   * @param {string} framework - Selected backend framework
   * @returns {Promise<Array>} Array of generated files with filenames and content
   */
  async generateBackendCode(frontendCode, framework) {
    try {
      logger.info(`Generating backend code for framework: ${framework}`);

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert backend developer. Generate complete backend code following best practices.'
          },
          {
            role: 'user',
            content: `
Given the following frontend UI code, generate a complete backend project using: ${framework}.

Requirements:
- Provide all necessary files with full content (e.g., routes, controllers, models for Node.js; views, models, urls for Django; main application files for Java/Spring Boot). 
- Use best practices for the selected framework.
- Include comments for clarity.
- Return each file's content wrapped in triple backticks with the file name indicated above the code.
- Only provide backend code. Do NOT return a frontend or file structure summary.

Frontend Code:
${frontendCode}
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 4000
      });

      const aiText = response.choices[0].message.content;
      const files = this.extractFiles(aiText);

      if (files.length === 0) {
        throw new AppError('No backend files were generated', 500);
      }

      logger.info(`Generated ${files.length} backend files`);
      return files;
    } catch (error) {
      logger.error('Error generating backend code:', error);
      throw new AppError('Failed to generate backend code', 500);
    }
  }

  /**
   * Generate database schema
   * @param {string} schemaDescription - Description of database schema
   * @param {string} databaseType - Selected database type
   * @returns {Promise<Array>} Array of generated SQL/schema files
   */
  async generateDatabaseSchema(schemaDescription, databaseType) {
    try {
      logger.info(`Generating database schema for: ${databaseType}`);

      const response = await this.client.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: 'You are an expert database developer. Generate clean, normalized database schemas following best practices.'
          },
          {
            role: 'user',
            content: `
Generate a complete database schema in ${databaseType} based on the following description:

${schemaDescription}

Requirements:
- Provide SQL scripts or schema definitions
- Include comments for clarity
- Each file wrapped in triple backticks with filename above
- Follow normalization best practices
            `
          }
        ],
        temperature: 0.7,
        max_tokens: 2000
      });

      const aiText = response.choices[0].message.content;
      const files = this.extractFiles(aiText, '--');

      if (files.length === 0) {
        throw new AppError('No database files were generated', 500);
      }

      logger.info(`Generated ${files.length} database files`);
      return files;
    } catch (error) {
      logger.error('Error generating database schema:', error);
      throw new AppError('Failed to generate database schema', 500);
    }
  }

  /**
   * Extract files from AI response
   * @param {string} response - AI response text
   * @param {string} commentPrefix - Comment prefix for filename (default: '//')
   * @returns {Array} Array of {filename, content} objects
   */
  extractFiles(response, commentPrefix = '//') {
    const files = [];
    const regex = /```(?:\w+)?\n([\s\S]*?)```/g;
    let match;

    while ((match = regex.exec(response)) !== null) {
      const content = match[1].trim();
      const lines = content.split('\n');
      let filename = `file${files.length + 1}`;

      // Try to extract filename from first line if it's a comment
      if (lines[0] && lines[0].startsWith(commentPrefix)) {
        filename = lines[0].replace(commentPrefix, '').trim();
        lines.shift();
      }

      files.push({
        filename: filename.includes('.') ? filename : `${filename}.${this.getFileExtension(content)}`,
        content: lines.join('\n')
      });
    }

    return files;
  }

  /**
   * Get file extension based on content
   * @param {string} content - File content
   * @returns {string} File extension
   */
  getFileExtension(content) {
    if (content.includes('CREATE TABLE') || content.includes('INSERT INTO')) {
      return 'sql';
    }
    if (content.includes('const') || content.includes('function') || content.includes('export')) {
      return 'js';
    }
    if (content.includes('def ') || content.includes('import ')) {
      return 'py';
    }
    if (content.includes('public class') || content.includes('@')) {
      return 'java';
    }
    return 'txt';
  }
}

module.exports = new AIService();

