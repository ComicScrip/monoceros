import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryOverview from "./deliveryOverview";
import { useState, useEffect } from "react";
import { getDeliveryOverview, getDeliveries } from "../lib/deliveriesAPI";
import Pagination from "./pagination";
import DeliveriesStatus from "./deliveriesStatus";
import Loading from "./loading";

function DeliveryList() {
  const [deliveryOverview, setDeliveryOverview] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [allDeliveries, setAllDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const [numberOfItems, setNumberOfItems] = useState(null);
  const [detailView, setDetailView] = useState(false);

  async function getDeliveriesByStatus() {
    getDeliveries(10, 0).then((res) => {
      console.log(res);
    });
    /*
    const deliveries = await getDeliveries();
    switch (status) {
      case "inProgres":
        return deliveries;
    }
    */
  }

  useEffect(() => {
    getDeliveries(itemsPerPage, (currentPage - 1) * (itemsPerPage + 1)).then(
      (res) => {
        setNumberOfItems(res.count);
        setAllDeliveries(res.results);
      }
    );
    getDeliveriesByStatus();
  }, [currentPage]);

  const goToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  async function showDeliveryOverview(id) {
    goToTop();
    setDetailView(true);
    const idStrg = id.toString();
    await getDeliveryOverview(idStrg)
      .then(setDeliveryOverview)
      .then(() => setShowDetails(true));
  }
  return (
    <>
      {!detailView ? <DeliveriesStatus /> : null}
      {showDetails && (
        <div>
          <span
            onClick={() => {
              setShowDetails(false);
              setDetailView(false);
            }}
            className={deliveriesStyle.closeBtn}
          >
            &times;
          </span>
          <DeliveryOverview deliveryDetail={deliveryOverview} />
        </div>
      )}
      {allDeliveries.length !== 0 ? (
        <table className={deliveriesStyle.table}>
          <thead className={deliveriesStyle.allHead} data-cy="tableHeader">
            <tr>
              <th className={deliveriesStyle.tHeader}>ID</th>
              <th className={deliveriesStyle.tHeader}>Status</th>
              <th className={deliveriesStyle.tHeader}>Alert</th>
              <th className={deliveriesStyle.tHeader}>Ref.</th>
              <th className={deliveriesStyle.tHeader}>Destination</th>
              <th className={deliveriesStyle.tHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {allDeliveries.map((delivery, i) => (
              <tr
                className={deliveriesStyle.tRow + " " + deliveriesStyle.id}
                data-cy={"deliveryRow" + i}
                key={delivery.id}
                onClick={() => showDeliveryOverview(delivery.id)}
              >
                <td className={deliveriesStyle.tCell} data-cy="deliveryId">
                  {delivery.id}
                </td>
                <td className={deliveriesStyle.tCell} data-cy="deliveryStatus">
                  {delivery.status}
                </td>
                <td className={deliveriesStyle.tCell}>Vert</td>
                <td className={deliveriesStyle.tCell} data-cy="deliveryContact">
                  {delivery.delivery_path.shipment_paths[0].origin.contact_name}
                </td>
                <td
                  className={deliveriesStyle.tCell}
                  data-cy="deliveryDestination"
                >
                  {delivery.delivery_path.shipment_paths[0].destination.city}
                </td>
                <td className={deliveriesStyle.tCell} data-cy="deliveryEndDate">
                  {delivery.end_date}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
      <div
        className="flex justify-center w-full mt-3"
        style={{ backgroundColor: "var(--main-bg-color)" }}
      >
        <Pagination
          index={Math.ceil(numberOfItems / itemsPerPage)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default DeliveryList;
