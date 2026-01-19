/**
 * API Configuration
 * Centralized API endpoint management
 */

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 
  (import.meta.env.MODE === 'production' 
    ? 'https://titanax-labs-render.onrender.com'
    : 'http://localhost:5000');

export const API_ENDPOINTS = {
  // Authentication
  LOGIN: `${API_BASE_URL}/api/users/login`,
  SIGNUP: `${API_BASE_URL}/api/users/signup`,
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  
  // Contact
  CONTACT: `${API_BASE_URL}/api/contact/submit`,
  
  // AI Generation
  AI_FRONTEND: `${API_BASE_URL}/api/ai/frontend`,
  AI_BACKEND: `${API_BASE_URL}/api/ai/backend`,
  AI_DATABASE: `${API_BASE_URL}/api/ai/database`,
  
  // Health
  HEALTH: `${API_BASE_URL}/api/health`
};

export default API_ENDPOINTS;

