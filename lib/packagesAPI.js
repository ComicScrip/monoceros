import { myAxiosInstance } from "./customAxios";

export async function getPackagesByCountryWarehouseAndId(
  limit = 50,
  offset = 0,
  country = "",
  warehouseId = "",
  productId = ""
) {
  const res = await myAxiosInstance.get(
    `/api/base/packages/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}&product_id=${productId}`
  );
  return res.data;
}

export async function getPackagesInfo(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/base/packages/?limit=${limit}&offset=${offset}`
  );
  return res.data.results;
}

export async function deletePackage(id) {
  return myAxiosInstance.delete(`/api/base/packages/${id}/`);
}

export async function getPackageLimit(delivery_id, package_id, sensor_type) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/delivery-package/package-limits/?package_id=${package_id}&delivery_id=${delivery_id}&sensor_type=${sensor_type}`
  );
  return res.data;
}

export async function createPackage(body) {
  return await myAxiosInstance.post(`/api/base/packages/`, { ...body });
}
