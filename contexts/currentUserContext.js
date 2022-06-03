import axios from "axios";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useState } from "react";
import { getCurrentUserProfile, updateTokens } from "../lib/monocerosAPI";

export const CurrentUserContext = createContext();

export default function CurrentUserContextProvider({ children }) {
  const { status } = useSession();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (status === "authenticated") {
      axios
        .get("/api/tokens")
        .then((res) => {
          updateTokens(res.data);
          return getCurrentUserProfile().then(setProfile);
        })
        .catch(console.error);
    } else if (status === "unauthenticated") {
      setProfile(null);
    }
  }, [status]);

  console.log(profile);

  return (
    <CurrentUserContext.Provider value={{ profile, status }}>
      {children}
    </CurrentUserContext.Provider>
  );
}
