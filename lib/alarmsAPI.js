import { myAxiosInstance } from "./customAxios";

export async function getAlarms(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/base/warnings/?limit=${limit}&offset=${offset}`
  );
  return res.data;
}
