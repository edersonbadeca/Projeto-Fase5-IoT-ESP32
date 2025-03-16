import axios from 'axios';

// Create an axios instance with default config
const api = axios.create({
  baseURL: '/sensor-data',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API functions for sensor data
export const sensorDataApi = {
  // Get all sensor data with pagination
  getAll: async (page = 0, limit = 100) => {
    try {
      const skip = page * limit;
      const response = await api.get(`/?skip=${skip}&limit=${limit}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching sensor data:', error);
      throw error;
    }
  },

  // Get a specific sensor data entry by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching sensor data with ID ${id}:`, error);
      throw error;
    }
  },

  // Create a new sensor data entry
  create: async (data) => {
    try {
      const response = await api.post('/', data);
      return response.data;
    } catch (error) {
      console.error('Error creating sensor data:', error);
      throw error;
    }
  },

  // Update an existing sensor data entry
  update: async (id, data) => {
    try {
      const response = await api.patch(`/${id}`, data);
      return response.data;
    } catch (error) {
      console.error(`Error updating sensor data with ID ${id}:`, error);
      throw error;
    }
  },

  // Delete a sensor data entry
  delete: async (id) => {
    try {
      await api.delete(`/${id}`);
      return true;
    } catch (error) {
      console.error(`Error deleting sensor data with ID ${id}:`, error);
      throw error;
    }
  },
};

export default api; 