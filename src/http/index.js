import axios from 'axios';

export const http = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: true,
});

http.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');

  request.headers['Authorization'] = `Bearer ${accessToken}`;

  return request;
});

http.interceptors.response.use(
  res => res.data,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status !== 401 || originalRequest._isRetry) {
      throw error;
    }

    originalRequest._isRetry = true;

    try {
      const response = await axios.get('/refresh', {
        baseURL: process.env.REACT_APP_API_URL,
        withCredentials: true,
      })
  
      localStorage.setItem('accessToken', response.data.accessToken);
  
      return http.request(originalRequest);
    } catch (error) {
      throw error;
    }
  }
);
