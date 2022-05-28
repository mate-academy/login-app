import { http } from './index.js';

function getAll() {
  return http.get('/users')
}

const userAPI = { getAll };

export default userAPI;
