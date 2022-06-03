import Meta from "./meta";
import Navbar from "./navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Meta />
      <Navbar />
      <div>
        <main>{children}</main>
      </div>
    </>
  );
};

export default Layout;
