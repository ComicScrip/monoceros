import React, { useEffect, useState } from "react";
import { getDeliveryOverview } from "../lib/deliveriesAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import idStyle from "../styles/id.module.css";
import GroupData from "./groupData";

const IdComponent = () => {
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
  // console.log(packages);
  //console.log(packages[0]);
  return (
    <>
      {packages ? (
        <div>
          <h2>Delivery - Package view</h2>
          <div className={idStyle.headList}>
            <div>ID</div>
            <div>Alert</div>
            <div>Last Update</div>
          </div>
          {packages.map((colis) => (
            <div
              key={colis.id}
              className={idStyle.list}
              onClick={() => setPackageId(colis.id)}
            >
              <div>{colis.id}</div>
              {colis.alert ? (
                <Image
                  src="/images/alerts-active@3x.png"
                  alt="alarm"
                  height={30}
                  width={30}
                />
              ) : (
                <Image
                  src="/images/alerts@3x.png"
                  alt="alarm"
                  height={30}
                  width={30}
                />
              )}
              <div>15 min ago</div>
            </div>
          ))}
          {packageId && <GroupData delivery_id={id} package_id={packageId} />}
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default IdComponent;
