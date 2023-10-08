import api from '../api';

export function setAuthorizationHeader(token: string | null) {
  api.defaults.headers.Authorization = `Bearer ${token}`;
}

export function removeAuthorizationHeader() {
  api.defaults.headers.Authorization = null;
}
