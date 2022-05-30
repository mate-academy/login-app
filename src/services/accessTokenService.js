const key = 'accessToken';

function get() {
  return localStorage.getItem(key)
}

function save(token) {
  return localStorage.setItem('accessToken', token)
}

function remove() {
  return localStorage.removeItem('accessToken')
}

export const accessTokenService = { get, save, remove };
