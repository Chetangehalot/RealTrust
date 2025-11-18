// API Configuration
// Update this file to change the API base URL for all components

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Get the base URL without /api for image URLs
const getBaseUrl = () => {
  return API_BASE_URL.replace('/api', '');
};

// Helper function to get full image URL
export const getImageUrl = (imagePath) => {
  if (!imagePath) return null;
  if (imagePath.startsWith('http')) return imagePath;
  return `${getBaseUrl()}${imagePath.startsWith('/') ? imagePath : '/' + imagePath}`;
};

export default API_BASE_URL;

