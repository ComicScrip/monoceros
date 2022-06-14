import { myAxiosInstance } from "./customAxios";

export function getLocalAccessToken() {
  const accessToken = localStorage.getItem("access");
  return accessToken;
}
export function getLocalRefreshToken() {
  const refreshToken = localStorage.getItem("refresh");
  return refreshToken;
}

export default async function getToken(email, password) {
  return myAxiosInstance.post("/api/users/token/", {
    email: email,
    password: password,
  });
}

export async function refreshToken() {
  return myAxiosInstance.post("/api/users/token/refresh/", {
    refresh: getLocalRefreshToken(),
  });
}

export async function getUserContent() {
  return myAxiosInstance.get("/api/users/current-user/");
}

export async function getOneDelivery(id) {
  return myAxiosInstance.get(`/api/deliveries/deliveries/${id}/`);
}

export async function getDeliveriesOverview() {
  return myAxiosInstance.get("/api/deliveries/deliveries/overview/");
}
