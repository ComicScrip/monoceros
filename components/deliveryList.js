import deliveriesStyle from "../styles/deliveries.module.css";
import DeliveryOverview from "./deliveryOverview";
import { useState, useEffect } from "react";
import { getDeliveryOverview, getDeliveries } from "../lib/deliveriesAPI";
import Pagination from "./pagination";
import DeliveriesStatus from "./deliveriesStatus";
import Loading from "./loading";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

function DeliveryList() {
  const router = useRouter();
  const [deliveryOverview, setDeliveryOverview] = useState({});
  const [showDetails, setShowDetails] = useState(false);
  const [allDeliveries, setAllDeliveries] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page) || 1
  );
  const { t } = useTranslation("deliveries");
  const itemsPerPage = 10;
  const [numberOfItems, setNumberOfItems] = useState(null);
  const [detailView, setDetailView] = useState(false);

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        page: currentPage,
      },
    });
    getDeliveries(itemsPerPage, (currentPage - 1) * itemsPerPage).then(
      (res) => {
        setNumberOfItems(res.count);
        setAllDeliveries(res.results);
      }
    );
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
          <DeliveryOverview
            deliveryDetail={deliveryOverview}
            deliveries={allDeliveries}
          />
        </div>
      )}
      {allDeliveries.length !== 0 ? (
        <table className={deliveriesStyle.table}>
          <thead className={deliveriesStyle.allHead} data-cy="tableHeader">
            <tr>
              <th className={deliveriesStyle.tHeader}>ID</th>
              <th className={deliveriesStyle.tHeader}>Status</th>
              <th className={deliveriesStyle.tHeader}>Ref.</th>
              <th className={deliveriesStyle.tHeader}>Destination</th>
              <th className={deliveriesStyle.tHeader}>Date</th>
            </tr>
          </thead>
          <tbody>
            {allDeliveries.map((delivery, i) => (
              <tr
                className={
                  delivery.alerts_count !== null
                    ? deliveriesStyle.alert
                    : deliveriesStyle.noAlert
                }
                data-cy={delivery.alerts_count !== null ? "alert" : "noAlert"}
                key={delivery.id}
                onClick={() => showDeliveryOverview(delivery.id)}
              >
                <td
                  className={deliveriesStyle.tCell}
                  data-cy={"deliveryId" + i}
                >
                  {delivery.id}
                </td>
                <td className={deliveriesStyle.tCell} data-cy="deliveryStatus">
                  {delivery.status === "Completed"
                    ? t("completed")
                    : delivery.status === "In progress"
                    ? t("inProgress")
                    : t("delayed")}
                </td>
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
