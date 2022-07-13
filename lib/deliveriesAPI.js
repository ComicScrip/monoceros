import { myAxiosInstance } from "./customAxios";

export async function getDeliveries(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/deliveries/?limit=${limit}&offset=${offset}`
  );
  return res.data;
}

export async function getDeliveryOverview(deliveryId) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/deliveries/${deliveryId}/`
  );
  return res.data;
}

export async function getDeliveriesStatus() {
  return myAxiosInstance.get("/api/deliveries/deliveries/overview/");
}

export async function getSensorData(delivery_id, package_id, sensor_type) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/delivery-package/sensors-data/?package_id=${package_id}&delivery_id=${delivery_id}&sensor_type=${sensor_type}`
  );
  return res.data;
}

export async function getDeliveryPath(origin, destination) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/delivery-paths?warehouse_origin_id=${origin}&warehouse_destination_id=${destination}`
  );
  return res.data;
}

export async function createDelivery(body) {
  return await myAxiosInstance.post("/api/deliveries/deliveries/", { ...body });
}

export async function getDeliveriesByStatus(status, limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/deliveries/?status=${status}&limit=${limit}&offset=${offset}`
  );
  return res.data;
}

export async function getDeliveriesAlert(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/deliveries/?limit=${limit}&offset=${offset}&alerts=True`
  );
  return res.data;
}

export async function getDeliveryData(delivery_id, sensor_type) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/delivery-package/delivery-data/?delivery_id=${delivery_id}&sensor_type=${sensor_type}`
  );
  return res.data;
}
