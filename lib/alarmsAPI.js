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
  productId = ""
) {
  const res = await myAxiosInstance.get(
    `/api/base/warnings/?limit=${limit}&offset=${offset}&country=${country}&warehouse_id=${warehouseId}&product_id=${productId}`
  );
  return res.data;
}
