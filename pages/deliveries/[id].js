import React, { useEffect, useState } from "react";
import { getDeliveryDetails } from "../../lib/monocerosAPI";
import { useRouter } from "next/router";
import Image from "next/image";
import idStyle from "../../styles/id.module.css";
import GroupData from "../../components/groupData";

const DeliveryDetail = () => {
  const [deliveryDetail, setDeliveryDetail] = useState({});
  const [packages, setPackages] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  console.log("id", id);

  async function showDeliveryDetails(id) {
    const detail = await getDeliveryDetails(id);
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

  console.log(deliveryDetail);
  console.log(deliveryDetail.packages);
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
            <div key={colis.id} className={idStyle.list}>
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
          <GroupData />
        </div>
      ) : (
        <div>Loading</div>
      )}
    </>
  );
};

export default DeliveryDetail;
