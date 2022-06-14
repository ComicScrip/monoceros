import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

export async function getTokensFromCredentials({ email, password }) {
  const res = await API.post("/api/users/token/", {
    email,
    password,
  });
  return res.data;
}

export async function getRefreshedToken(tokens) {
  const res = await myAxiosInstance.post("/api/users/token/refresh/", {
    refresh: tokens.refresh,
  });
  return res.data;
}

export async function getCurrentUserProfile() {
  const res = await myAxiosInstance.get("/api/users/current-user/");
  return res.data;
}

export async function getDeliveriesOverview() {
  const res = await myAxiosInstance.get("/api/deliveries/deliveries/overview/");
  return res.data;
}
