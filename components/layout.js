import Meta from "./meta";

const Layout = ({ children }) => {
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
