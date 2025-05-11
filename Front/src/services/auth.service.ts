import axiosInstance from '../config/axios.config';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export interface RegisterPayload {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface LoginPayload {
  email: string;
  password: string;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export const authService = {
  register: async (data: RegisterPayload): Promise<AuthUser> => {
    const response = await axiosInstance.post(`${API_URL}/auth/register`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  login: async (data: LoginPayload): Promise<AuthUser> => {
    const response = await axiosInstance.post(`${API_URL}/auth/login`, data, {
      withCredentials: true,
    });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await axiosInstance.post(`${API_URL}/auth/logout`, {}, {
      withCredentials: true,
    });
  },

  getCurrentUser: async (): Promise<AuthUser> => {
    const response = await axiosInstance.get(`${API_URL}/auth/me`, {
      withCredentials: true,
    });
    return response.data;
  }
};
