import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

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
