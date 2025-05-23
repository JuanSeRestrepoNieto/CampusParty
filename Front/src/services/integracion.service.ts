import axiosInstance from '../config/axios.config';

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:3001";

export const integracionService = {
  getJSONPlaceHolder: async () => {
    const response = await axiosInstance.get('https://jsonplaceholder.typicode.com/posts');
    return response.data;
  }
};