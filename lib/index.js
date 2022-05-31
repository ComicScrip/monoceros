import { API_BASE_URL } from "./tokenContext";
import axios from "axios";

class TokenError extends Error {}
class ApiCallError extends Error {}

export async function getTokens(email, password) {
  try {
    const request = await axios.post(`${API_BASE_URL}/users/token/`, {
      email: email,
      password: password,
    });
    return request.data;
  } catch {
    return false;
  }
}

export async function checkForTokenRefresh(token) {
  try {
    const request = await axios.get(`${API_BASE_URL}/users/current-user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    return false;
  }
}

export async function getRefreshToken(tokens) {
  try {
    const request = await axios.post(`${API_BASE_URL}/users/token/refresh/`, {
      refresh: tokens.refresh,
    });
    const newTokens = { access: request.data.access, refresh: tokens.refresh };
    return newTokens;
  } catch {
    return false;
  }
}

export async function getCurrentUserInfos(token) {
  try {
    const request = await axios.get(`${API_BASE_URL}/users/current-user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return request.data;
  } catch {
    return false;
  }
}

export async function getAllProducts(token) {
  try {
    const request = await axios.get(
      `${API_BASE_URL}/base/products/?limit=100&offset=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    return false;
  }
}

export async function getOneDelivery(token, id) {
  try {
    const request = await axios.get(
      `${API_BASE_URL}/deliveries/deliveries/${id}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return request.data;
  } catch {
    return false;
  }
}

export async function getDeliveriesOverview(token) {
  try {
    const request = await axios.get(
      `${API_BASE_URL}/deliveries/deliveries/overview/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    return false;
  }
}
