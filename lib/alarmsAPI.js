import { myAxiosInstance } from "./customAxios";

export async function getAlarms(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/base/warnings/?limit=${limit}&offset=${offset}`
  );
  return res.data;
}

export async function getAlarmsByCountryWarehouseAndProduct(
  limit = 10,
  offset = 0,
  country = "",
  warehouseId = "",
  productId = "",
  deliveryId = "",
  packageId = ""
) {
  const res = await myAxiosInstance.get(
    `/api/base/warnings/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}&product_id=${productId}&delivery_id=${deliveryId}&package_id=${packageId}`
  );
  return res.data;
}

export async function postAlarmsSolveWarning(warningId) {
  return myAxiosInstance.post("api/base/warnings/solve-warning/", warningId);
}
