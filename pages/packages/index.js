import Meta from "../../components/meta";
import PackagesList from "../../components/packagesList";
import Layout from "../../components/layout";

const Packages = () => {
  return (
    <>
      <Layout>
        <Meta pagetitle="Monoceros - Products Catalogue" />
        <div className="flex justify-center flex-col items-center">
          <PackagesList />
        </div>
      </Layout>
    </>
  );
};

export default Packages;
