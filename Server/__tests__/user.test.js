/**
 * User Service Tests
 * Run with: npm test
 */

const userService = require('../services/userService');
const User = require('../models/User');
const bcrypt = require('bcrypt');

// Mock dependencies
jest.mock('../models/User');
jest.mock('bcrypt');
jest.mock('../utils/logger');
jest.mock('../services/emailService');

describe('UserService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('signup', () => {
    it('should create a new user successfully', async () => {
      const userData = {
        name: 'Test User',
        email: 'test@example.com',
        role: 'Developer',
        password: 'Password123'
      };

      User.findOne.mockResolvedValue(null);
      User.mockImplementation(() => ({
        save: jest.fn().mockResolvedValue({
          _id: '123',
          ...userData,
          emailVerified: false
        })
      }));
      bcrypt.hash.mockResolvedValue('hashedPassword');

      process.env.JWT_SECRET = 'test-secret';

      const result = await userService.signup(userData);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refreshToken');
      expect(result.user.email).toBe(userData.email);
    });

    it('should throw error if email already exists', async () => {
      const userData = {
        name: 'Test User',
        email: 'existing@example.com',
        role: 'Developer',
        password: 'Password123'
      };

      User.findOne.mockResolvedValue({ email: userData.email });

      await expect(userService.signup(userData)).rejects.toThrow('Email is already in use');
    });
  });

  describe('login', () => {
    it('should login user with valid credentials', async () => {
      const email = 'test@example.com';
      const password = 'Password123';
      const hashedPassword = 'hashedPassword';

      User.findOne.mockResolvedValue({
        _id: '123',
        email,
        password: hashedPassword,
        name: 'Test User',
        role: 'Developer',
        emailVerified: true,
        save: jest.fn()
      });

      bcrypt.compare.mockResolvedValue(true);
      process.env.JWT_SECRET = 'test-secret';

      const result = await userService.login(email, password);

      expect(result).toHaveProperty('user');
      expect(result).toHaveProperty('token');
      expect(result).toHaveProperty('refreshToken');
    });

    it('should throw error with invalid credentials', async () => {
      User.findOne.mockResolvedValue(null);

      await expect(userService.login('test@example.com', 'wrong')).rejects.toThrow('Invalid credentials');
    });
  });
});

