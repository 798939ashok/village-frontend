// ============================================================
// API SERVICE - AXIOS CONFIGURATION
// ============================================================

import axios from 'axios';

const API_BASE_URL =
 process.env.REACT_APP_API_URL || "https://village-backend-q6jx.onrender.com";

// Create Axios Instance
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add Token to Every Request
apiClient.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

// Handle Response Errors
apiClient.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// ============================================================
// AUTHENTICATION API CALLS
// ============================================================

export const authAPI = {
  signup: (data) => apiClient.post('/auth/signup', data),
  login: (data) => apiClient.post('/auth/login', data),
  verifyToken: () => apiClient.get('/auth/verify-token'),
};

// ============================================================
// USER API CALLS
// ============================================================

export const userAPI = {
  getProfile: () => apiClient.get('/user/profile'),
  updateProfile: (data) => apiClient.put('/user/profile', data),
  changePassword: (data) => apiClient.put('/user/change-password', data),
};

// ============================================================
// ADMIN API CALLS
// ============================================================

export const adminAPI = {
  addImage: (formData) => 
    apiClient.post('/admin/images/add', formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    }),
  getImages: () => apiClient.get('/admin/images'),
  editImage: (imageId, data) => apiClient.put(`/admin/images/${imageId}`, data),
  deleteImage: (imageId) => apiClient.delete(`/admin/images/${imageId}`),
  addContent: (data) => apiClient.post('/admin/content/add', data),
  getAllContent: () => apiClient.get('/admin/content'),
  editContent: (contentId, data) => apiClient.put(`/admin/content/${contentId}`, data),
  deleteContent: (contentId) => apiClient.delete(`/admin/content/${contentId}`),
};

// ============================================================
// PUBLIC CONTENT API CALLS
// ============================================================

export const contentAPI = {
  getImages: (category) => 
    apiClient.get('/content/images', { params: { category } }),
  getContentByType: (type) => apiClient.get(`/content/content/${type}`),
  getVillageInfo: () => apiClient.get('/content/village-info'),
  getDashboardStats: () => apiClient.get('/content/stats'),
};

export default apiClient;
