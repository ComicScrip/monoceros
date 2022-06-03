import axios from "axios";

class TokenError extends Error {}
class ApiCallError extends Error {}

export async function getTokens(email, password) {
  try {
    const request = await axios.post(
      `${process.env.API_BASE_URL}/users/token/`,
      {
        email: email,
        password: password,
      }
    );
    return request.data;
  } catch {
    throw new TokenError();
  }
}

export async function checkForTokenRefresh(token) {
  try {
    const request = await axios.get(
      `${process.env.API_BASE_URL}/users/current-user/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return true;
  } catch {
    throw new TokenError();
  }
}

export async function getRefreshTokens(token) {
  try {
    const request = await axios.post(
      `${process.env.API_BASE_URL}/users/token/refresh/`,
      {
        refresh: token,
      }
    );
    const newTokens = {
      access: request.data.access,
      refresh: token,
    };
    return newTokens;
  } catch {
    throw new TokenError();
  }
}

export async function getCurrentUserInfos(token) {
  try {
    const request = await axios.get(
      `${process.env.API_BASE_URL}/users/current-user/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}

export async function getAllProducts(token) {
  try {
    const request = await axios.get(
      `${process.env.API_BASE_URL}/base/products/?limit=100&offset=0`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}

export async function getOneDelivery(token, id) {
  try {
    const request = await axios.get(
      `${process.env.API_BASE_URL}/deliveries/deliveries/${id}/`,
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}

export async function getDeliveriesOverview(token) {
  try {
    const request = await axios.get(
      `${process.env.API_BASE_URL}/deliveries/deliveries/overview/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}