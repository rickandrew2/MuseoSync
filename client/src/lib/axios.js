import axios from 'axios';

const baseURL = import.meta.env.PROD 
  ? 'https://museo-sync.vercel.app/api'  // Production URL
  : 'http://localhost:5000/api';         // Development URL

const axiosInstance = axios.create({
  baseURL,
  withCredentials: true,
});

export default axiosInstance; 