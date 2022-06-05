import axios from "axios";
import { myAxiosInstance } from "./customAxios";

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

export async function getWarehousesByCountry(country) {
  return myAxiosInstance.get(
    `/base/warehouses-search-filter/?country=${country}`
  );
}

export async function getAllWarehouses(limit = 50, offset = 0) {
  return myAxiosInstance.get(
    `/base/warehouses/?limit=${limit}&offset=${offset}`
  );
}

export async function getAllCountries() {
  return myAxiosInstance.get("/base/country-filter/");
}
