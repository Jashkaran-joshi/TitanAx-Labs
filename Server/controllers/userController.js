const userService = require('../services/userService');
const logger = require('../utils/logger');

/**
 * Signup controller
 */
exports.signup = async (req, res, next) => {
  try {
    const { name, email, role, password } = req.body;

    const result = await userService.signup({ name, email, role, password });
    
    res.status(201).json({
      success: true,
      message: 'Account created successfully. Please check your email for verification.',
      token: result.token,
      refreshToken: result.refreshToken,
      user: result.user
    });
    } catch (err) {
    next(err);
    }
};

/**
 * Login controller
 */
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const result = await userService.login(email, password);
    
    res.status(200).json({
      success: true,
      message: 'Login successful',
      token: result.token,
      refreshToken: result.refreshToken,
      user: result.user
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Refresh token controller
 */
exports.refreshToken = async (req, res, next) => {
  try {
    const { refreshToken } = req.body;
    
    if (!refreshToken) {
      return res.status(400).json({
        success: false,
        message: 'Refresh token is required'
      });
        }

    const result = await userService.refreshAccessToken(refreshToken);
    
    res.status(200).json({
      success: true,
      token: result.token
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Request password reset controller
 */
exports.requestPasswordReset = async (req, res, next) => {
  try {
    const { email } = req.body;
    
    const result = await userService.requestPasswordReset(email);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    next(err);
        }
};

/**
 * Reset password controller
 */
exports.resetPassword = async (req, res, next) => {
  try {
    const { token, newPassword } = req.body;
    
    const result = await userService.resetPassword(token, newPassword);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Verify email controller
 */
exports.verifyEmail = async (req, res, next) => {
  try {
    const { token } = req.query;
    
    const result = await userService.verifyEmail(token);
    
    res.status(200).json({
      success: true,
      message: result.message
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Get user profile
 */
exports.getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserById(req.user.id);
    
    res.status(200).json({
      success: true,
      user: {
                id: user._id,
                name: user.name,
                email: user.email,
        role: user.role,
        emailVerified: user.emailVerified,
        createdAt: user.createdAt
      }
    });
  } catch (err) {
    next(err);
  }
};

/**
 * Logout controller
 */
exports.logout = async (req, res, next) => {
  try {
    await userService.logout(req.user.id);

    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
    } catch (err) {
    next(err);
    }
};
