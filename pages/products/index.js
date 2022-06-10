import Image from "next/image";
import Meta from "../../components/meta";
import ProductsList from "../../components/productsList";
import Layout from "../../components/layout";
const Products = () => {
  return (
    <>
      <div className="bg-[#efefef] flex justify-center">
        <Layout>
          <Meta pagetitle="Monoceros - Products Catalogue" />
          <ProductsList />
        </Layout>
      </div>
    </>
  );
};

export default Products;
