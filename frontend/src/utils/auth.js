import axios from 'axios';

const API_BASE_URL = 'https://jamiarabt.onrender.com/api/v1';

// Track active requests
const activeRequests = new Set();

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true 
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    // Add request to tracking
    const requestId = `${config.method}-${config.url}`;
    activeRequests.add(requestId);
    config.requestId = requestId;
    
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => {
    // Remove request from tracking
    if (response.config.requestId) {
      activeRequests.delete(response.config.requestId);
    }
    return response;
  },
  async (error) => {
    // Remove request from tracking
    if (error.config?.requestId) {
      activeRequests.delete(error.config.requestId);
    }
    
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await axios.post(
          `${API_BASE_URL}/users/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        window.location.href = '/signup';
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);

export const cancelAllRequests = () => {
    activeRequests.clear();
  };
export const login = async (email, password) => {
  const response = await api.post('/users/login', { email, password });
  localStorage.setItem('accessToken', response.data.data.accessToken);
  return response.data;
};

export const getCurrentUser = async () => {
  return api.get('/users/current-user');
};

export const refreshToken = async () => {
  return api.post('/users/refresh-token', {});
};
export const getPosts = async () => {
    return api.get('/posts');
  };
  
  export const createPost = async (postData) => {
    return api.post('/posts', postData);
  };
  
  export const likePost = async (postId) => {
    return api.post(`/posts/${postId}/like`);
  };
  
  export const addComment = async (postId, text) => {
    return api.post(`/posts/${postId}/comment`, { text });
  };