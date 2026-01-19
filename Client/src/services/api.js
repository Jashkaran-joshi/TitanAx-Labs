import axios from 'axios';
import { toast } from 'react-toastify';
import API_ENDPOINTS from '../config/api';

/**
 * Create axios instance with default configuration
 */
const apiClient = axios.create({
  baseURL: API_ENDPOINTS.HEALTH.replace('/api/health', ''),
  timeout: 60000, // 60 seconds timeout for AI requests
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request interceptor - Add auth token to requests
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * Response interceptor - Handle errors globally
 */
apiClient.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    // Handle network errors
    if (!error.response) {
      toast.error('Network error. Please check your connection.');
      return Promise.reject(error);
    }

    const { status, data } = error.response;

    // Handle specific error cases
    switch (status) {
      case 401:
        // Unauthorized - token expired or invalid
        if (data.message?.includes('token') || data.message?.includes('Token')) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          // Redirect to login after a short delay
          setTimeout(() => {
            window.location.href = '/login';
          }, 2000);
        } else {
          toast.error(data.message || 'Authentication failed');
        }
        break;

      case 403:
        toast.error(data.message || 'Access denied');
        break;

      case 404:
        toast.error(data.message || 'Resource not found');
        break;

      case 429:
        toast.error(data.message || 'Too many requests. Please try again later.');
        break;

      case 500:
        toast.error(data.message || 'Server error. Please try again later.');
        break;

      default:
        // Handle validation errors
        if (data.errors && Array.isArray(data.errors)) {
          const errorMessages = data.errors.map(err => err.message || err).join(', ');
          toast.error(errorMessages);
        } else {
          toast.error(data.message || 'An error occurred');
        }
    }

    return Promise.reject(error);
  }
);

/**
 * API methods
 */
export const authAPI = {
  login: (email, password) => 
    apiClient.post(API_ENDPOINTS.LOGIN, { email, password }),
  
  signup: (name, email, role, password) => 
    apiClient.post(API_ENDPOINTS.SIGNUP, { name, email, role, password }),
  
  getProfile: () => 
    apiClient.get(API_ENDPOINTS.PROFILE)
};

export const contactAPI = {
  submit: (formData) => 
    apiClient.post(API_ENDPOINTS.CONTACT, formData)
};

export const aiAPI = {
  generateFrontend: (prompt, framework) => 
    apiClient.post(API_ENDPOINTS.AI_FRONTEND, { prompt, framework }),
  
  generateBackend: (frontendCode, framework) => 
    apiClient.post(API_ENDPOINTS.AI_BACKEND, { frontendCode, framework }),
  
  generateDatabase: (schemaDescription, databaseType) => 
    apiClient.post(API_ENDPOINTS.AI_DATABASE, { schemaDescription, databaseType })
};

export default apiClient;

