const logger = require('../utils/logger');

/**
 * Email service for sending emails
 * Note: This is a placeholder. In production, integrate with:
 * - SendGrid
 * - AWS SES
 * - Mailgun
 * - Nodemailer with SMTP
 */
class EmailService {
  /**
   * Send email (placeholder - implement with actual email service)
   * @param {string} to - Recipient email
   * @param {string} subject - Email subject
   * @param {string} html - Email HTML content
   * @param {string} text - Email text content
   */
  async sendEmail(to, subject, html, text) {
    // TODO: Implement actual email sending
    // Example with Nodemailer:
    // const transporter = nodemailer.createTransport({
    //   service: 'gmail',
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });
    // 
    // await transporter.sendMail({
    //   from: process.env.EMAIL_FROM,
    //   to,
    //   subject,
    //   html,
    //   text
    // });

    logger.info(`[Email Service] Would send email to ${to} with subject: ${subject}`);
    logger.info(`[Email Service] Email content: ${text || html.substring(0, 100)}...`);

    // Logging is already handled by logger.info above
    // In production, implement actual email service (SendGrid, AWS SES, Mailgun, etc.)
  }

  /**
   * Send verification email
   * @param {string} email - User email
   * @param {string} token - Verification token
   */
  async sendVerificationEmail(email, token) {
    const verificationUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/verify-email?token=${token}`;

    const html = `
      <h2>Verify Your Email</h2>
      <p>Thank you for signing up for TitanAx Labs!</p>
      <p>Please click the link below to verify your email address:</p>
      <a href="${verificationUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Verify Email</a>
      <p>Or copy and paste this URL into your browser:</p>
      <p>${verificationUrl}</p>
      <p>This link will expire in 24 hours.</p>
    `;

    const text = `Verify your email by visiting: ${verificationUrl}`;

    await this.sendEmail(email, 'Verify Your Email - TitanAx Labs', html, text);
  }

  /**
   * Send password reset email
   * @param {string} email - User email
   * @param {string} token - Reset token
   */
  async sendPasswordResetEmail(email, token) {
    const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password?token=${token}`;

    const html = `
      <h2>Reset Your Password</h2>
      <p>You requested to reset your password for TitanAx Labs.</p>
      <p>Click the link below to reset your password:</p>
      <a href="${resetUrl}" style="display: inline-block; padding: 10px 20px; background-color: #4f46e5; color: white; text-decoration: none; border-radius: 5px;">Reset Password</a>
      <p>Or copy and paste this URL into your browser:</p>
      <p>${resetUrl}</p>
      <p>This link will expire in 1 hour.</p>
      <p>If you didn't request this, please ignore this email.</p>
    `;

    const text = `Reset your password by visiting: ${resetUrl}`;

    await this.sendEmail(email, 'Reset Your Password - TitanAx Labs', html, text);
  }

  /**
   * Send welcome email
   * @param {string} email - User email
   * @param {string} name - User name
   */
  async sendWelcomeEmail(email, name) {
    const html = `
      <h2>Welcome to TitanAx Labs, ${name}!</h2>
      <p>Thank you for joining our platform. We're excited to have you on board!</p>
      <p>Start generating code by visiting our platform and exploring the features.</p>
      <p>If you have any questions, feel free to contact us.</p>
    `;

    const text = `Welcome to TitanAx Labs, ${name}!`;

    await this.sendEmail(email, 'Welcome to TitanAx Labs', html, text);
  }
}

module.exports = new EmailService();

