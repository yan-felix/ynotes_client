import axios, { AxiosHeaders, AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    userID?: string | null;
    token?: string;
};

const BASE_URL = 'https://ynotes-server.onrender.com';

const Api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
});

Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userID = sessionStorage.getItem("userID");
  const token = sessionStorage.getItem("token");

  if (!config.headers) {
    config.headers = new AxiosHeaders();
  };
  
  if (userID) {
    config.headers.set('user-id', userID);
  };
  if (token) {
      config.headers.set('token', token);
  };
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Api