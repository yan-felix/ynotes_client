import axios, { AxiosHeaders, AxiosRequestConfig, AxiosInstance, InternalAxiosRequestConfig } from 'axios';

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
    userID?: string | null;
    token?: string;
};

const BASE_URL = 'http://localhost:3030';

const Api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: { 'Content-Type': 'application/json'},
    withCredentials: true,
});

Api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const userID = sessionStorage.getItem("userID");
  const token = sessionStorage.getItem("token");

  if (!config.headers) {
    config.headers = new AxiosHeaders();
  };
  
  if (userID) {
    config.headers.set('User-ID', userID);
  };
  if (token) {
      config.headers.set('token', token);
  };
  return config;
}, (error) => {
  return Promise.reject(error);
});

export default Api