import axios from "axios";
import { myAxiosInstance } from "./customAxios";

// const API = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
// });
const email = process.env.NEXT_PUBLIC_MONOCEROS_ID;
const password = process.env.NEXT_PUBLIC_MONOCEROS_PW;
const access_token =
  "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjU0NjE4MjQyLCJqdGkiOiJmZTM1NTQzMDQwYTc0YzU1OTg4ODM1MGU4YjAwMDdhNSIsInVzZXJfaWQiOjEwMH0.0PHGtkJmi1EzZayKHHjDbJ9iHnlT1biTgmMDNlMw4bQ";

export async function getTokensFromCredentials() {
  const res = await axios.post(
    "https://devbackend.monoceros-sas.com/api/users/token/",
    {
      email,
      password,
    }
  );
  return res.data;
}

export async function getRefreshedToken(tokens) {
  const res = await myAxiosInstance.post("/api/users/token/refresh/", {
    refresh: tokens.refresh,
  });
  return res.data;
}

export async function getDeliveries() {
  const res = await myAxiosInstance.get(
    `https://devbackend.monoceros-sas.com/api/deliveries/deliveries/`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data.results;
}

export async function getDeliveryDetails(id) {
  const res = await axios.get(
    `https://devbackend.monoceros-sas.com/api/deliveries/deliveries/${id}/`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
}

export async function getCurrentUserProfile() {
  const res = await myAxiosInstance.get("/api/users/current-user/");
  return res.data;
}

export async function getDeliveriesOverview() {
  const res = await myAxiosInstance.get("/api/deliveries/deliveries/overview/");
  return res.data;
}

// export async function getSensorData(delivery_id, package_id, sensor_type) {
//   const res = await axios.get(
//     `https://devbackend.monoceros-sas.com/api/deliveries/delivery-package/sensors-data/?package_id=${package_id}&delivery_id=${delivery_id}&sensor_type=${sensor_type}`,
//     {
//       headers: {
//         Authorization: `Bearer ${access_token}`,
//       },
//     }
//   );
//   return res;
// }

export async function getSensorData() {
  const res = await axios.get(
    `https://devbackend.monoceros-sas.com/api/deliveries/delivery-package/sensors-data/?package_id=225&delivery_id=177&sensor_type=temperature`,
    {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    }
  );
  return res.data;
}
