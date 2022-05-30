import { createClient } from './index.js';
import { authService } from '../services/authService.js';
import { accessTokenService } from '../services/accessTokenService.js';

export const httpClient = createClient();

httpClient.interceptors.request.use(request => {
  const accessToken = localStorage.getItem('accessToken');

  request.headers['Authorization'] = `Bearer ${accessToken}`;

  return request;
});

httpClient.interceptors.response.use(
  res => res.data,

  async (error) => {
    const originalRequest = error.config;

    if (error.response.status !== 401 || originalRequest._isRetry) {
      throw error;
    }

    originalRequest._isRetry = true;

    try {
      const { accessToken } = await authService.refresh();

      accessTokenService.save(accessToken);

      return httpClient.request(originalRequest);
    } catch (error) {
      throw error;
    }
  }
);
