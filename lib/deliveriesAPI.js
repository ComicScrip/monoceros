import { myAxiosInstance } from "./customAxios";

export async function getDeliveries() {
  const res = await myAxiosInstance.get(
    "/api/deliveries/deliveries/?limit=100"
  );
  return res.data.results;
}

export async function getDeliveryOverview(deliveryId) {
  const res = await myAxiosInstance.get(
    `/api/deliveries/deliveries/${deliveryId}/`
  );
  return res.data;
}
