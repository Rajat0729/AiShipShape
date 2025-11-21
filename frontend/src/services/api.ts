import type { Habit } from '../types.js';

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export interface ApiService {
  login: (email: string, password: string) => Promise<{ message: string; token?: string }>;
  register: (email: string, password: string) => Promise<{ message: string; userId?: string }>;

  createHabit: (name: string, description: string) => Promise<{ habit: string }>;
  getHabits: () => Promise<{ habits: Habit[] }>;
  getHabitById: (id: string) => Promise<{ habit: Habit }>;
  updateHabit: (id: string, data: {name?: string; description?: string}) => Promise<{ message: string }>;
  recordHabitCompletion: (id: string) => Promise<{ message: string }>;
  deleteHabit: (id: string) => Promise<{ message: string }>;
}

export const apiService: ApiService = {
  login: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  register: async (email, password) => {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  createHabit: async (name, description) => {
    const response = await fetch(`${API_BASE_URL}/habits`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, description }),
    });
    return response.json();
  },

  getHabits: async () => {
    const response = await fetch(`${API_BASE_URL}/habits`);
    return response.json();
  },

  getHabitById: async (id) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`);
    return response.json();
  },

  updateHabit: async (id, data) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return response.json();
  },

  recordHabitCompletion: async (id) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}/complete`, {
      method: 'POST',
    });
    return response.json();
  },

  deleteHabit: async (id) => {
    const response = await fetch(`${API_BASE_URL}/habits/${id}`, {
      method: 'DELETE',
    });
    return response.json();
  },
};

export default apiService;
