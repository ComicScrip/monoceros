import Navbar from "./navbar";
import Meta from "./meta";

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
