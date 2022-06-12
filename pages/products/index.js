import Image from "next/image";
import Meta from "../../components/meta";
import ProductsList from "../../components/productsList";
import Layout from "../../components/layout";
const Products = () => {
  return (
    <>
      <Layout>
        <Meta pagetitle="Monoceros - Products Catalogue" />
        <div className="flex justify-center flex-col items-center">
          <ProductsList />
        </div>
      </Layout>
    </>
  );
};

export default Products;
