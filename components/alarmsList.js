import { useState, useEffect } from "react";
import Pagination from "./pagination";
import Loading from "./loading";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import { getAlarms } from "../lib/alarmsAPI";
import { MdLightMode, MdWaterDrop } from "react-icons/md";
import { RiTempColdLine } from "react-icons/ri";
import { AiOutlineDashboard } from "react-icons/ai";
import { GiHandcuffed } from "react-icons/gi";
import { BsFillCalendarXFill, BsBoxSeam } from "react-icons/bs";
import alarmsStyle from "../styles/alarms.module.css";
import moment from "moment";

function AlarmsList() {
  const router = useRouter();
  const [allAlarms, setAllAlarms] = useState([]);
  const [currentPage, setCurrentPage] = useState(
    parseInt(router.query.page) || 1
  );
  const { t } = useTranslation("alarms");
  const itemsPerPage = 10;
  const [numberOfItems, setNumberOfItems] = useState(null);

  useEffect(() => {
    router.replace({
      query: {
        ...router.query,
        page: currentPage,
      },
    });
    async function request() {
      await getAlarms(itemsPerPage, (currentPage - 1) * itemsPerPage).then(
        (res) => {
          setNumberOfItems(res.count);
          setAllAlarms(res.results);
          console.log(res.results);
        }
      );
    }
    request();
  }, [currentPage]);

  return (
    <>
      {allAlarms.length !== 0 ? (
        <table className={alarmsStyle.table}>
          <thead>
            <tr>
              <th className={alarmsStyle.tHeader}></th>
              <th className={alarmsStyle.tHeader}>N° de livraison</th>
              <th className={alarmsStyle.tHeader}>Alertes</th>
              <th className={alarmsStyle.tHeader}>Date</th>
              <th className={alarmsStyle.tHeader}>Heure</th>
              <th className={alarmsStyle.tHeader}>Action</th>
              <th className={alarmsStyle.tHeader}>Nom du contact</th>
              <th className={alarmsStyle.tHeader}>Commentaires</th>
            </tr>
          </thead>
          <tbody>
            {allAlarms.map((alarm) => (
              <tr key={alarm.id} className="bg-white rounded">
                <td className={alarmsStyle.tCell}>
                  <input type="checkbox" />
                </td>
                <td className={alarmsStyle.tCell}>{alarm.delivery_id}</td>
                <td className={alarmsStyle.tCell}>
                  <span className="inline-block">
                    {alarm.issue_temp ? (
                      <RiTempColdLine size={20} style={{ color: "#ff455a" }} />
                    ) : (
                      ""
                    )}
                    {alarm.issue_humidity ? (
                      <MdWaterDrop size={20} style={{ color: "#ff455a" }} />
                    ) : (
                      ""
                    )}
                    {alarm.issue_shock ? (
                      <AiOutlineDashboard
                        size={20}
                        style={{ color: "#ff455a" }}
                      />
                    ) : (
                      ""
                    )}
                    {alarm.issue_light ? (
                      <MdLightMode size={20} style={{ color: "#ff455a" }} />
                    ) : (
                      ""
                    )}
                    {alarm.issue_orientation ? (
                      <BsBoxSeam size={20} style={{ color: "#ff455a" }} />
                    ) : (
                      ""
                    )}
                    {alarm.issue_eta ? (
                      <BsFillCalendarXFill
                        size={20}
                        style={{ color: "#ff455a" }}
                      />
                    ) : (
                      ""
                    )}
                    {alarm.theft ? (
                      <GiHandcuffed size={20} style={{ color: "#ff455a" }} />
                    ) : (
                      ""
                    )}
                  </span>
                </td>
                <td className={alarmsStyle.tCell}>
                  {moment(alarm.date).format("DD-MM-yyyy")}
                </td>
                <td className={alarmsStyle.tCell}>
                  {moment(alarm.date).subtract(2, "hours").format("HH:mm")}
                </td>
                <td className={alarmsStyle.tCell}>{alarm.action_taken}</td>
                <td className={alarmsStyle.tCell}>{alarm.contact_name}</td>
                <td className={alarmsStyle.tCell}>{alarm.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Loading />
      )}
      <div className="flex justify-center w-full mt-3 bg-main_bg_color">
        <Pagination
          index={Math.ceil(numberOfItems / itemsPerPage)}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      </div>
    </>
  );
}

export default AlarmsList;
