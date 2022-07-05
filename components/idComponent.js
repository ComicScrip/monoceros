import React, { useEffect, useState } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import idStyle from "../styles/id.module.css";
import GroupData from "./groupData";
import moment from "moment";
import { useTranslation } from "next-i18next";
import DeliveryPath from "./deliveryPath";
import Loading from "./loading";

const IdComponent = () => {
  const { t } = useTranslation("packages");
  const [deliveryDetail, setDeliveryDetail] = useState({});
  const [packages, setPackages] = useState([]);
  const [packageId, setPackageId] = useState("");
  const router = useRouter();
  const { id } = router.query;

  async function showDeliveryDetails(id) {
    const detail = await getDeliveryOverview(id);
    setDeliveryDetail(detail);
  }

  useEffect(() => {
    if (id) {
      showDeliveryDetails(id);
    }
  }, [id]);

  useEffect(() => {
    if (deliveryDetail) {
      setPackages(deliveryDetail.packages);
    }
  }, [deliveryDetail]);

  useEffect(() => {
    if (packages) {
      setPackageId(packages[0]?.id);
    }
  }, [packages]);
  return (
    <>
      {packages ? (
        <div>
          <h2 className={idStyle.head} data-cy="packageDetailTitle">
            {t("pageTitle")}
          </h2>
          <div className={idStyle.headList}>
            <div>ID</div>
            <div>Alert</div>
            <div>{t("update")}</div>
          </div>
          {packages.map((colis, i) => (
            <div
              key={colis.id}
              className={
                packageId === colis.id
                  ? idStyle.list + " " + idStyle.showGraph
                  : idStyle.list
              }
              onClick={() => setPackageId(colis.id)}
            >
              <div
                data-cy={"packageDetailId" + i}
                onClick={() => router.replace(`/packages`)}
                className={idStyle.idPackage}
              >
                {colis.id}
              </div>
              {colis.alert ? (
                <div className={idStyle.alertPackage}>
                  <Image
                    src="/images/alerts-active@3x.png"
                    alt="alarm"
                    height={30}
                    width={30}
                  />
                </div>
              ) : (
                <div className={idStyle.alertPackage}>
                  <Image
                    src="/images/alerts@3x.png"
                    alt="alarm"
                    height={30}
                    width={30}
                  />
                </div>
              )}
              <div
                data-cy="packageDetailUpdate"
                className={idStyle.datePackage}
              >
                {moment(`${colis.last_updated}`, "YYYYMMDD").fromNow()}
              </div>
            </div>
          ))}
          <div className="mx-auto w-[90%]">
            <DeliveryPath id={id} />
          </div>
          {packageId && <GroupData delivery_id={id} package_id={packageId} />}
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default IdComponent;
