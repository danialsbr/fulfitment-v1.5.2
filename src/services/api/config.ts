import axios from 'axios';
import type { ApiResponse } from './types';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add response interceptor for consistent error handling
api.interceptors.response.use(
  (response) => {
    const data = response.data as ApiResponse;
    if (!data.success) {
      throw new Error(data.message || 'عملیات با خطا مواجه شد');
    }
    return data;
  },
  (error) => {
    const message = error.response?.data?.message || 'خطا در ارتباط با سرور';
    throw new Error(message);
  }
);