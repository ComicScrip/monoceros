import { myAxiosInstance } from "./customAxios";

export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access");
  return accessToken;
}
export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh");
  return refreshToken;
}

export default async function getToken(email, password) {
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

export async function getUserContent() {
  return myAxiosInstance.get("/users/current-user/");
}

export async function getOneDelivery(id) {
  return myAxiosInstance.get(`/deliveries/deliveries/${id}/`);
}

export async function getDeliveriesOverview() {
  return myAxiosInstance.get("/deliveries/deliveries/overview/");
}

export async function getAllProducts(limit = 50, offset = 0) {
  return myAxiosInstance.get(`/base/products/?limit=${limit}&offset=${offset}`);
}

export async function getWarehouses(country = "") {
  return myAxiosInstance.get(
    `/base/warehouses-search-filter/?country=${country}`
  );
}

export async function getAllCountries(warehouseId = "") {
  return myAxiosInstance.get(
    `/base/country-filter/?warehouse_id=${warehouseId}`
  );
}

export async function getProductsByCountry(country, limit = 50, offset = 0) {
  return myAxiosInstance.get(
    `/base/products/?limit=${limit}&offset=${offset}&country=${country}`
  );
}

export async function getProductsByCountryAndWarehouse(
  country,
  warehouseId,
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/base/products/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}`
  );
}

export async function getProductsByWarehouse(
  warehouseId,
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/base/products/?limit=${limit}&offset=${offset}&warehouse_id=${warehouseId}`
  );
}
