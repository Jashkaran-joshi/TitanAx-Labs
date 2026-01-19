const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const { ConflictError, AuthenticationError, NotFoundError } = require('../utils/errors');
const logger = require('../utils/logger');
const emailService = require('./emailService');

/**
 * Service layer for user-related business logic
 */
class UserService {
  /**
   * Generate JWT token
   * @param {Object} payload - Token payload
   * @param {string} expiresIn - Token expiration
   * @returns {string} JWT token
   */
  generateToken(payload, expiresIn = '24h') {
    if (!process.env.JWT_SECRET) {
      logger.error('JWT_SECRET is not defined');
      throw new Error('Server configuration error');
    }
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn });
  }

  /**
   * Generate refresh token
   * @returns {string} Refresh token
   */
  generateRefreshToken() {
    return crypto.randomBytes(40).toString('hex');
  }

  /**
   * Create a new user
   * @param {Object} userData - User data (name, email, role, password)
   * @returns {Promise<Object>} Created user and tokens
   */
  async signup(userData) {
    const { name, email, role, password } = userData;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      throw new ConflictError('Email is already in use');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Generate email verification token
    const emailVerificationToken = crypto.randomBytes(32).toString('hex');

    // Create user
    const newUser = new User({
      name,
      email,
      role,
      password: hashedPassword,
      emailVerificationToken
    });

    await newUser.save();

    // Generate tokens
    const token = this.generateToken({
      id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role
    });

    const refreshToken = this.generateRefreshToken();
    newUser.refreshToken = refreshToken;
    await newUser.save();

    // Send verification email
    try {
      await emailService.sendVerificationEmail(email, emailVerificationToken);
      await emailService.sendWelcomeEmail(email, name);
    } catch (error) {
      logger.error('Failed to send verification email:', error);
      // Don't fail signup if email fails
    }

    logger.info(`New user registered: ${email}`);

    return {
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        emailVerified: newUser.emailVerified
      },
      token,
      refreshToken
    };
  }

  /**
   * Authenticate user and generate tokens
   * @param {string} email - User email
   * @param {string} password - User password
   * @returns {Promise<Object>} User data and tokens
   */
  async login(email, password) {
    // Find user with password
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      logger.warn(`Login attempt with non-existent email: ${email}`);
      throw new AuthenticationError('Invalid credentials');
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      logger.warn(`Failed login attempt for: ${email}`);
      throw new AuthenticationError('Invalid credentials');
    }

    // Generate tokens
    const token = this.generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    const refreshToken = this.generateRefreshToken();
    user.refreshToken = refreshToken;
    await user.save();

    logger.info(`User logged in: ${email}`);

    return {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        emailVerified: user.emailVerified
      },
      token,
      refreshToken
    };
  }

  /**
   * Refresh access token using refresh token
   * @param {string} refreshToken - Refresh token
   * @returns {Promise<Object>} New access token
   */
  async refreshAccessToken(refreshToken) {
    const user = await User.findOne({ refreshToken }).select('+refreshToken');
    if (!user) {
      throw new AuthenticationError('Invalid refresh token');
    }

    // Generate new access token
    const token = this.generateToken({
      id: user._id,
      name: user.name,
      email: user.email,
      role: user.role
    });

    logger.info(`Token refreshed for user: ${user.email}`);

    return { token };
  }

  /**
   * Request password reset
   * @param {string} email - User email
   * @returns {Promise<Object>} Success message
   */
  async requestPasswordReset(email) {
    const user = await User.findOne({ email });
    if (!user) {
      // Don't reveal if user exists for security
      logger.warn(`Password reset requested for non-existent email: ${email}`);
      return { message: 'If that email exists, a password reset link has been sent' };
    }

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString('hex');
    const resetExpires = Date.now() + 3600000; // 1 hour

    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = resetExpires;
    await user.save();

    // Send reset email
    try {
      await emailService.sendPasswordResetEmail(email, resetToken);
    } catch (error) {
      logger.error('Failed to send password reset email:', error);
      throw new Error('Failed to send reset email');
    }

    logger.info(`Password reset requested for: ${email}`);

    return { message: 'If that email exists, a password reset link has been sent' };
  }

  /**
   * Reset password with token
   * @param {string} token - Reset token
   * @param {string} newPassword - New password
   * @returns {Promise<Object>} Success message
   */
  async resetPassword(token, newPassword) {
    const user = await User.findOne({
      resetPasswordToken: token,
      resetPasswordExpires: { $gt: Date.now() }
    }).select('+password +resetPasswordToken +resetPasswordExpires');

    if (!user) {
      throw new AuthenticationError('Invalid or expired reset token');
    }

    // Hash new password
    const hashedPassword = await bcrypt.hash(newPassword, 12);

    // Update password and clear reset token
    user.password = hashedPassword;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;
    await user.save();

    logger.info(`Password reset successful for: ${user.email}`);

    return { message: 'Password reset successful' };
  }

  /**
   * Verify email with token
   * @param {string} token - Verification token
   * @returns {Promise<Object>} Success message
   */
  async verifyEmail(token) {
    const user = await User.findOne({ emailVerificationToken: token });
    if (!user) {
      throw new NotFoundError('Invalid verification token');
    }

    if (user.emailVerified) {
      return { message: 'Email already verified' };
    }

    user.emailVerified = true;
    user.emailVerificationToken = undefined;
    await user.save();

    logger.info(`Email verified for: ${user.email}`);

    return { message: 'Email verified successfully' };
  }

  /**
   * Get user by ID
   * @param {string} userId - User ID
   * @returns {Promise<Object>} User data
   */
  async getUserById(userId) {
    const user = await User.findById(userId).select('-password');
    if (!user) {
      throw new NotFoundError('User not found');
    }
    return user;
  }

  /**
   * Logout user (invalidate refresh token)
   * @param {string} userId - User ID
   * @returns {Promise<void>}
   */
  async logout(userId) {
    await User.findByIdAndUpdate(userId, { refreshToken: null });
    logger.info(`User logged out: ${userId}`);
  }
}

module.exports = new UserService();
