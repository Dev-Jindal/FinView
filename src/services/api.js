import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5000',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Add a request interceptor to include the token in headers
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    console.log("hi");
    console.log(token)
    if (token) {
      console.log("token is ")
      console.log(token)
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default API;
