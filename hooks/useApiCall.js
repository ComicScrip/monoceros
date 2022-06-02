import { useEffect, useState } from "react";
import { getCurrentUserInfos, getRefreshTokens, getAllProducts } from "../lib";

export default function useApiCall(token, request) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [isRefreshToken, setIsRefreshToken] = useState(false);
  const [token, setToken] = useState(token);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const tokenCheck = await getCurrentUserInfos(token.access);
      } catch {
        const newToken = await getRefreshTokens(token.refresh);
        setToken(newToken);
        setIsRefreshToken(true);
      }
      if (isRefreshToken) {
        try {
          const response = await request(token);
          setData(response);
        } catch (err) {
          setError(err);
        }
      }
      if (!isRefreshToken) {
        try {
          const response = await request(token);
          setData(response);
        } catch (err) {
          setError(err);
        }
      }
      setLoaded(true);
    };
    loadAsync();
  }, []);

  return { data, error, loaded, token };
}

const { data, error, loaded, token } = useApiCall(token, getAllProducts);
