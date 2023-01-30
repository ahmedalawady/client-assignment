import { API_ROUTES, BASEURL } from '../utils/constants';
import axios from 'axios';

//TODO This is not secure.
export function getTokenFromLocalStorage() {
  return localStorage.getItem('token');
}

export function getRoleFromLocalStorage() {
  return localStorage.getItem('role');
}

function storeTokenInLocalStorage({ access_token, role }) {
  localStorage.setItem('token', access_token);
  localStorage.setItem('role', role);
}

export async function getAuthenticatedUser() {
  const defaultReturnObject = { authenticated: false, user: null };
  try {
    const token = getTokenFromLocalStorage();
    if (!token) {
      return defaultReturnObject;
    }

    const response = await axios({
      method: 'get',
      url: BASEURL + API_ROUTES.GET_USER,
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response?.data?.user) {
      return defaultReturnObject;
    }

    return response.data;
  } catch (err) {
    console.log('Something went wrong during signing in: ', err);
    return defaultReturnObject;
  }
}

export async function logIn(username, password) {
  try {
    if (!username || !password) {
      return { success: false, message: 'Invalid username or password' };
    }
    const { data } = await axios({
      method: 'post',
      url: BASEURL + API_ROUTES.LOG_IN,
      data: {
        username,
        password,
      },
    });

    if (!data?.access_token) {
      return { success: false, message: 'Something Wrong' };
    }
    storeTokenInLocalStorage(data);
    return { success: true, ...data };
  } catch (err) {
    console.log('Something went wrong during signing in: ', err.response.data);
    if (err.status === 400 || err?.response?.data?.statusCode === 400) {
      return {
        success: false,
        message: err?.response?.data?.message || 'Invalid username or password',
      };
    }
    return { success: false, message: 'Something Wrong' };
  }
}

export function logout() {
  localStorage.removeItem('token');
}
