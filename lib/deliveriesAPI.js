import axios from "axios";

export function getDeliveriesList() {
  const access_token =
    "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNjUzNDk2NTM1LCJqdGkiOiI2ODIyMGI3ZmE1YTg0OGE0YmY1MjEwNzFmMGVmZGU5MiIsInVzZXJfaWQiOjEwMH0.47H4S01HIv7ozZRWma6_-a6LZ-cZRcyM4GEHMYgs3lU";
  return axios
    .get("https://devbackend.monoceros-sas.com/api/deliveries/deliveries", {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    })
    .then((res) => res.data)
    .then((data) => data.results);
}
