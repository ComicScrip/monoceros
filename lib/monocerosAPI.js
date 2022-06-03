import axios from "axios";

const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_MONOCEROS_API_URL,
});

let tokens;

export function updateTokens(t) {
  tokens = t;
}

export function getDeliveries() {
  return API.get("/api/deliveries/deliveries", {
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
  })
    .then((res) => res.data)
    .then((data) => data.results);
}

export function getTokensFromCredentials({ email, password }) {
  return API.post("/api/users/token/", {
    email,
    password,
  }).then((res) => res.data);
}

export const getCurrentUserProfile = () => {
  return API.get("/api/users/current-user/", {
    headers: {
      Authorization: `Bearer ${tokens.access}`,
    },
  }).then((res) => res.data);
};
