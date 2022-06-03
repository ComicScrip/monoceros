import axios from "axios";
import { myAxiosInstance } from "./customAxios";

class TokenError extends Error {}
class ApiCallError extends Error {}

export async function getTokens(email, password) {
  try {
    const request = await axios.post(
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/users/token/`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/users/current-user/`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/users/token/refresh/`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/users/current-user/`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/base/products/?limit=100&offset=0`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/deliveries/deliveries/${id}/`,
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
      `${process.env.NEXT_PUBLIC_MONOCEROS_API_URL}/deliveries/deliveries/overview/`,
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    return request.data;
  } catch {
    throw new ApiCallError();
  }
}

/****************************************************************************************************************/

export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access");
  return accessToken;
}
export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh");
  return refreshToken;
}

export async function getToken(email, password) {
  return myAxiosInstance.post("/users/token/", {
    email: email,
    password: password,
  });
}

export async function refreshToken() {
  return myAxiosInstance.post("/users/token/refresh/", {
    refresh: getLocalRefreshToken(),
  });
}

export async function userContent() {
  return myAxiosInstance.get("/users/current-user/");
}

export async function oneDelivery(id) {
  return myAxiosInstance.get(`/deliveries/deliveries/${id}/`);
}

export async function deliveriesOverview() {
  return myAxiosInstance.get("/deliveries/deliveries/overview/");
}

export async function allProducts(limit = 50, offset = 0) {
  return myAxiosInstance.get(`/base/products/?limit=${limit}&offset=${offset}`);
}
