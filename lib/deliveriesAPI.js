import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

export async function getDeliveries() {
  const res = await myAxiosInstance.get(
    "/api/deliveries/deliveries/?limit=100"
  );
  return res.data.results;
}

export async function getDeliveryOverview(deliveryId) {
  const res = await myAxiosInstance.get(
    `https://devbackend.monoceros-sas.com/api/deliveries/deliveries/${deliveryId}/`
  );
  return res.data;
}
