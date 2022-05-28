import axios from 'axios';
import { http } from './index.js';

function register({ email, password }) {
  return http.post('/registration', { email, password })
}

function login({ email, password }) {
  return http.post('/login', { email, password })
}

function logout() {
  return http.post('/logout')
}

function activate(activationToken) {
  return http.get(`/activate/${activationToken}`);
}

async function refresh() {
  return axios.get('/refresh', {
    baseURL: process.env.REACT_APP_API_URL,
    withCredentials: true,
  })
    .then(res => res.data);
}

const authAPI = { register, login, logout, activate, refresh };

export default authAPI;