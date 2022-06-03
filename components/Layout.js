import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

export default function Layout({ children }) {
  const { profile } = useContext(CurrentUserContext);
  if (!profile) return "loading";
  return <>{children}</>;
}
