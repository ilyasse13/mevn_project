// src/services/axios.js

import axios from 'axios';
const Backend= import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000'
// Create an instance of Axios with default configuration
const axiosInstance = axios.create({
  baseURL: Backend,// Replace with your API base URL

  headers: {
    'Content-Type': 'application/json',
    // Add any additional headers if needed
  }
});

// Optionally add request interceptors
axiosInstance.interceptors.request.use(
  (config) => {
    // Add any custom headers or modify request config here
    // For example, add an authorization token:
    // const token = localStorage.getItem('authToken');
    // if (token) {
    //   config.headers['Authorization'] = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Optionally add response interceptors
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle successful response
    return response;
  },
  (error) => {
    // Handle errors globally
    // For example, redirect to login on 401 Unauthorized
    // if (error.response.status === 401) {
    //   window.location.href = '/login';
    // }
    return Promise.reject(error);
  }
);

export default axiosInstance;
