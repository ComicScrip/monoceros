import { myAxiosInstance } from "./customAxios";

export async function getProductsInfo() {
  const res = await myAxiosInstance.get("/api/base/products/?limit=100");
  return res.data.results;
}

export async function getOneProduct(id) {
  const res = await myAxiosInstance.get(`/api/base/products/${id}`);
  return res.data;
}

export async function getAllProducts(limit = 10, offset = 0) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}`
  );
}

export async function getWarehouses(country = "", productId = "") {
  return myAxiosInstance.get(
    `/api/base/warehouses-search-filter/?country=${country}&product_id=${productId}`
  );
}

export async function getAllCountries(warehouseId = "") {
  return myAxiosInstance.get(
    `/api/base/country-filter/?warehouse_id=${warehouseId}`
  );
}

export async function getProductsByCountryAndWarehouse(
  country = "",
  warehouseId = "",
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}`
  );
}

export async function getProductsByCountry(
  country = "",
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&country=${country}`
  );
}

export async function getProductsByWarehouse(
  warehouseId = "",
  limit = 50,
  offset = 0
) {
  return myAxiosInstance.get(
    `/api/base/products/?limit=${limit}&offset=${offset}&warehouse_id=${warehouseId}`
  );
}

export async function postOneProduct(product) {
  return myAxiosInstance.post("/api/base/products/", product);
}
