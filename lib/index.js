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
    throw new TokenError();
  }
}

export async function checkForTokenRefresh(token) {
  try {
    const request = await axios.get(`${API_BASE_URL}/users/current-user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return true;
  } catch {
    throw new TokenError();
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
    throw new TokenError();
  }
}

export async function getCurrentUserInfos(token) {
  try {
    const request = await axios.get(`${API_BASE_URL}/users/current-user/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}

export async function getAllProducts(token) {
  try {
    const request = await axios.get(`${API_BASE_URL}/base/products/`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return request.data;
  } catch {
    throw new ApiCallError();
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
    throw new ApiCallError();
  }
}
