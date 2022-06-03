import Meta from "./meta";
import { useContext } from "react";
import { CurrentUserContext } from "../contexts/currentUserContext";

const Layout = ({ children }) => {
  const { profile } = useContext(CurrentUserContext);
  if (!profile) return "loading";
  return (
    <>
      <Meta />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
