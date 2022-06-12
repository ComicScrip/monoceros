import axios from "axios";
import { myAxiosInstance } from "./customAxios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

export async function getDeliveriesLocalisation() {
  const res = await myAxiosInstance.get(
    "https://devbackend.monoceros-sas.com/api/deliveries/delivery-location/"
  );
  return res.data;
}
