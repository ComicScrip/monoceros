import axios from "axios";

export function getDeliveriesList(access_token) {
  return axios
    .get(
      "https://devbackend.monoceros-sas.com/api/deliveries/deliveries/?limit=100",
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((res) => res.data)
    .then((data) => data.results);
}

export function getTemperatureData(access_token, packageId, deliveryId) {
  return axios
    .get(
      `https://devbackend.monoceros-sas.com/api/deliveries/delivery-package/sensors-data/?package_id=${packageId}&delivery_id=${deliveryId}&sensor_type=temperature`,
      {
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      }
    )
    .then((res) => res.data);
}
