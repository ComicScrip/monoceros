import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

export async function getTokensFromCredentials({ email, password }) {
  const res = await API.post("/users/token/", {
    email,
    password,
  });
  return res.data;
}

export async function getRefreshedToken(tokens) {
  const res = await myAxiosInstance.post("/users/token/refresh/", {
    refresh: tokens.refresh,
  });
  return res.data;
}

export async function getDeliveries() {
  const res = await myAxiosInstance.get("/deliveries/deliveries/");
  return res.data.results;
}

export async function getCurrentUserProfile() {
  const res = await myAxiosInstance.get("/users/current-user/");
  return res.data;
}

export async function getDeliveriesOverview() {
  const res = await myAxiosInstance.get("/deliveries/deliveries/overview/");
  return res.data;
}
