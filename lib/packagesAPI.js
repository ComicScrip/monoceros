import { myAxiosInstance } from "./customAxios";

export async function getAllPackages(limit = 50, offset = 0) {
  const res = await myAxiosInstance.get(
    `/api/base/packages/?limit=${limit}&offset=${offset}`
  );
  return res.data;
}
