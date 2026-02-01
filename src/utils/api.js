import axios from "axios";

const API_BASE_URL =
  process.env.REACT_APP_API_URL ||
  "https://village-backend-q6jx.onrender.com";

const apiClient = axios.create({
  baseURL: API_BASE_URL,
});

// TOKEN
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// AUTH
export const authAPI = {
  signup: (data) => apiClient.post("/auth/signup", data),
  login: (data) => apiClient.post("/auth/login", data),
};

// USER
export const userAPI = {
  getProfile: () => apiClient.get("/user/profile"),
  updateProfile: (data) => apiClient.put("/user/profile", data),
  changePassword: (data) => apiClient.put("/user/change-password", data),
};

// ADMIN
export const adminAPI = {
  addImage: (formData) => apiClient.post("/admin/images/add", formData),
  getImages: () => apiClient.get("/admin/images"),
  editImage: (id, data) => apiClient.put(`/admin/images/${id}`, data),
  deleteImage: (id) => apiClient.delete(`/admin/images/${id}`),

  addContent: (data) => apiClient.post("/admin/content/add", data),
  getAllContent: () => apiClient.get("/admin/content"),
  editContent: (id, data) => apiClient.put(`/admin/content/${id}`, data),
  deleteContent: (id) => apiClient.delete(`/admin/content/${id}`),
};

// PUBLIC
export const contentAPI = {
  getImages: (category) =>
    apiClient.get("/content/images", { params: { category } }),
  getContentByType: (type) => apiClient.get(`/content/${type}`),
  getVillageInfo: () => apiClient.get("/content/village-info"),
  getDashboardStats: () => apiClient.get("/content/stats"),
};

export default apiClient;