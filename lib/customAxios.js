/* eslint-disable */
import axios from "axios";
import { getRefreshedToken } from "./monocerosAPI";

let tokens;

export function updateTokens(t) {
  tokens = t;
}

export const myAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

myAxiosInstance.interceptors.request.use(
  (config) => {
    if (tokens) {
      config.headers["Authorization"] = `Bearer ${tokens.access}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

let retryingRequest = false;

myAxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !retryingRequest) {
        retryingRequest = true;
        try {
          tokens = await getRefreshedToken(tokens);
          myAxiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokens.access}`;
          retryingRequest = false;
          return myAxiosInstance(originalConfig);
        } catch (_error) {
          if (_error.response && _error.response.data) {
            return Promise.reject(_error.response.data);
          }
          return Promise.reject(_error);
        }
      }
      if (err.response.status === 403 && err.response.data) {
        return Promise.reject(err.response.data);
      }
    }
    return Promise.reject(err);
  }
);
