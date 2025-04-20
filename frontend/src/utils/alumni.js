// utils/alumni.js
import axios from 'axios';

const API_BASE_URL = 'https://jamiarabt.onrender.com/api/v1/alumni';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem('accessToken'); // Assuming you store JWT token here
  return {
    headers: {
      Authorization: `Bearer ${token}`
    }
  };
};

export const fetchAlumni = async (filters = {}, sortConfig = {}) => {
  try {
    const params = {
      batchYear: filters.graduationYear,
      course: filters.course,
      profession: filters.profession,
      location: filters.location,
      searchQuery: filters.searchTerm,
      sortBy: `${sortConfig.key}:${sortConfig.direction === 'ascending' ? 'asc' : 'desc'}`
    };
    
    // Remove empty filters
    Object.keys(params).forEach(key => {
      if (!params[key]) delete params[key];
    });

    const response = await axios.get(`${API_BASE_URL}/search`, {
      params,
      ...getAuthHeaders() // Include auth headers
    });
    
    return response.data.data;
  } catch (error) {
    console.error('Error fetching alumni:', error);
    throw error;
  }
};

export const fetchAlumniProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/${userId}`, getAuthHeaders());
    return response.data.data;
  } catch (error) {
    console.error('Error fetching alumni profile:', error);
    throw error;
  }
};