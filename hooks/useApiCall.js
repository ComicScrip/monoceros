import { useEffect, useState } from "react";
import { getCurrentUserInfos, getRefreshTokens } from "../lib";

export default function useApiCall(token, request, ...args) {
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loaded, setLoaded] = useState(false);
  const [tokens, setToken] = useState(token);

  useEffect(() => {
    const loadAsync = async () => {
      try {
        const response = await request(tokens.access, ...args);
        setData(response);
      } catch {
        const newToken = await getRefreshTokens(tokens.refresh);
        setToken(newToken);
        try {
          console.log(tokens);
          const response = await request(tokens.access, ...args);
          setData(response);
        } catch (err) {
          setError(err);
        }
      }
      setLoaded(true);
    };
    loadAsync();
  }, []);

  return { data, error, loaded, tokens };
}
