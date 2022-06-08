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
    Authorization:
      "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NzA5MzA5LCJqdGkiOiI5N2IyYjQwMGJjYzg0ODIwYTU2Y2Y1ZWUyOGQzMGU2YSIsInVzZXJfaWQiOjEwMH0.1fXBZq__WmlUIyEcQULRI7aIeZjTZiRvgIOmZ9nCaOU",
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

myAxiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  async (err) => {
    const originalConfig = err.config;
    if (err.response) {
      if (err.response.status === 401 && !originalConfig._retry) {
        originalConfig._retry = true;
        try {
          tokens = await getRefreshedToken(tokens);
          myAxiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${tokens.access}`;
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
