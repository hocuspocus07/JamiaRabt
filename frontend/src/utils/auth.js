import axios from 'axios';

const API_URL = 'https://jamiarabt.onrender.com/api/v1/users';

const api = axios.create({
    baseURL: API_URL,
    withCredentials: true 
  });

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshResponse = await axios.post(
          `${API_URL}/refresh-token`,
          {},
          { withCredentials: true }
        );
        
        localStorage.setItem('accessToken', refreshResponse.data.accessToken);
        originalRequest.headers.Authorization = `Bearer ${refreshResponse.data.accessToken}`;
        return api(originalRequest);
      } catch (refreshError) {
        console.log(refreshError)
        localStorage.removeItem('accessToken');
        window.location.href = '/signup';
      }
    }
    
    return Promise.reject(error);
  }
);

export const login = async (email, password) => {
  const response = await axios.post(
    `${API_URL}/login`,
    { email, password },
    { withCredentials: true }
  );
  localStorage.setItem('accessToken', response.data.data.accessToken);
  console.log(response.data);
  return response.data;
};

export const getCurrentUser = async () => {
  return api.get('/current-user');
};

export const refreshToken = async () => {
  return axios.post(
    `${API_URL}/refresh-token`,
    {},
    { withCredentials: true }
  );
};