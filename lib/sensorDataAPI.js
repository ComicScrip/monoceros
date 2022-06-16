import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

export async function getDeliveriesLocalisation() {
  const res = await myAxiosInstance.get("/api/deliveries/delivery-location/");
  return res.data;
}

export async function getSensorData(delivery_id, package_id, sensor_type) {
  try {
    const res = await myAxiosInstance.get(
      `/api/deliveries/delivery-package/sensors-data/?package_id=${package_id}&delivery_id=${delivery_id}&sensor_type=${sensor_type}`
    );
    return res.data;
  } catch {
    return [];
  }
}
