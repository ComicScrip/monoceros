import { myAxiosInstance } from "./customAxios";

export async function getAllProducts(limit = 10, offset = 0) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}`
  );
}

export async function getWarehouses(country = "") {
  return myAxiosInstance.get(
    `/api/base/warehouses-search-filter/?country=${country}`
  );
}

export async function getAllCountries(warehouseId = "") {
  return myAxiosInstance.get(
    `/api/base/country-filter/?warehouse_id=${warehouseId}`
  );
}

export async function getProductsByCountry(country, limit = 50, offset = 0) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&country=${country}`
  );
}

export async function getProductsByCountryAndWarehouse(
  country,
  warehouseId,
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}`
  );
}

export async function getProductsByWarehouse(
  warehouseId,
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&warehouse_id=${warehouseId}`
  );
}