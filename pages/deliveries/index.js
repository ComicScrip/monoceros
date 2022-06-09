import Layout from "../../components/layout";
import Meta from "../../components/meta";
import DeliveryList from "../../components/deliveryList";
import deliveriesStyle from "../../styles/deliveries.module.css";

const Deliveries = () => {
  return (
    <>
      <Meta pagetitle="Monoceros - Deliveries Overview" />
      <Layout>
        <h1 className={deliveriesStyle.head}>DELIVERIES OVERVIEW</h1>
        <DeliveryList />
      </Layout>
    </>
  );
};

export default Deliveries;
