import axios from 'axios';
import axiosInstance from '../config/axios.config';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

// Interfaces para las diferentes tablas
export interface AuthUser {
  id: number;
  username: string;
  password_hash: string;
  email: string;
  role: string;
  created_at: string;
  last_login: string | null;
  id_token: string | null;
  token: string | null;
  expires_at_token: string | null;
  created_at_token: string | null;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  password: string;
  confirmPassword: string;
}

export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  location: string;
}

export interface Participant {
  id: string;
  eventId: string;
  userId: string;
  status: string;
}

export interface Pabellon {
  id: string;
  name: string;
  capacity: number;
  location: string;
  tematica: string;
  area: string;
}

export interface DashboardService {
  // Usuarios
  getUsers: () => Promise<User[]>;
  getUser: (id: string) => Promise<User>;
  createUser: (data: Partial<User>) => Promise<User>;
  updateUser: (id: string, data: Partial<User>) => Promise<User>;
  deleteUser: (id: string) => Promise<void>;

  // Pabellones
  getPabellones: () => Promise<Pabellon[]>;
  getPabellon: (id: string) => Promise<Pabellon>;
  createPabellon: (data: Partial<Pabellon>) => Promise<Pabellon>;
  updatePabellon: (id: string, data: Partial<Pabellon>) => Promise<Pabellon>;
  deletePabellon: (id: string) => Promise<void>;

  // Eventos
  getEvents: () => Promise<Event[]>;
  getEvent: (id: string) => Promise<Event>;
  createEvent: (data: Partial<Event>) => Promise<Event>;
  updateEvent: (id: string, data: Partial<Event>) => Promise<Event>;
  deleteEvent: (id: string) => Promise<void>;

  // Participantes
  getParticipants: () => Promise<Participant[]>;
  getParticipant: (id: string) => Promise<Participant>;
  createParticipant: (data: Partial<Participant>) => Promise<Participant>;
  updateParticipant: (id: string, data: Partial<Participant>) => Promise<Participant>;
  deleteParticipant: (id: string) => Promise<void>;
}

export const dashboardService: DashboardService = {
  // Usuarios
  async getUsers(): Promise<User[]> {
    const response = await axiosInstance.get(`${API_URL}/auth/all`);
    return response.data.map((user: AuthUser) => ({
      id: user.id.toString(),
      name: user.username,
      email: user.email,
      role: user.role
    }));
  },
  getUser: async (id) => {
    const response = await axiosInstance.get(`${API_URL}/auth/${id}`);
    return response.data;
  },
  createUser: async (data: Partial<User>) => {
    const response = await axiosInstance.post(`${API_URL}/auth/create`, {
      username: data.name,
      email: data.email,
      password: data.password,
      role: data.role,
      confirmPassword: data.password
    });
    return response.data;
  },
  updateUser: async (id, data) => {
    const response = await axiosInstance.patch(`${API_URL}/auth/${id}`, data);
    return response.data;
  },
  deleteUser: async (id) => {
    await axiosInstance.delete(`${API_URL}/auth/${id}`);
  },

  // Pabellones
  async getPabellones(): Promise<Pabellon[]> {
    const response = await axiosInstance.get(`${API_URL}/pabellon`);
    return response.data;
  },
  getPabellon: async (id) => {
    const response = await axiosInstance.get(`${API_URL}/pabellon`);
    return response.data;
  },
  createPabellon: async (data: Partial<Pabellon>) => {
    const response = await axiosInstance.post(`${API_URL}/pabellon`, 
      {
        nombre:data.name, 
        capacidad:data.capacity, 
        ubicacion:data.location,
        tematica:data.tematica,
        area:data.area
      });
    return response.data;
  },
  updatePabellon: async (id, data) => {
    const response = await axiosInstance.patch(`${API_URL}/pabellon/${id}`, data);
    return response.data;
  },
  deletePabellon: async (id) => {
    await axiosInstance.delete(`${API_URL}/pabellon/${id}`);
  },

  // Eventos
  getEvents: async () => {
    const response = await axiosInstance.get(`${API_URL}/events`);
    return response.data;
  },
  getEvent: async (id) => {
    const response = await axiosInstance.get(`${API_URL}/events/${id}`);
    return response.data;
  },
  createEvent: async (data) => {
    const response = await axiosInstance.post(`${API_URL}/events`, data);
    return response.data;
  },
  updateEvent: async (id, data) => {
    const response = await axiosInstance.put(`${API_URL}/events/${id}`, data);
    return response.data;
  },
  deleteEvent: async (id) => {
    await axiosInstance.delete(`${API_URL}/events/${id}`);
  },

  // Participantes
  getParticipants: async () => {
    const response = await axiosInstance.get(`${API_URL}/participants`);
    return response.data;
  },
  getParticipant: async (id) => {
    const response = await axiosInstance.get(`${API_URL}/participants/${id}`);
    return response.data;
  },
  createParticipant: async (data) => {
    const response = await axiosInstance.post(`${API_URL}/participants`, data);
    return response.data;
  },
  updateParticipant: async (id, data) => {
    const response = await axiosInstance.put(`${API_URL}/participants/${id}`, data);
    return response.data;
  },
  deleteParticipant: async (id) => {
    await axiosInstance.delete(`${API_URL}/participants/${id}`);
  }
};
