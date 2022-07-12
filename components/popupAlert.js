import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import alarmsStyle from "../styles/alarms.module.css";

function PopupAlert({
  isOpen,
  setIsOpen,
  deliveryNumber,
  alertTemp,
  alertHumidity,
  alertShock,
  alertLight,
  alertOrientation,
  alertEta,
  alertExpdate,
  alertTheft,
  date,
  time,
  action,
  contactName,
  messages,
}) {
  const router = useRouter();
  const { t } = useTranslation("alarms");

  return (
    <>
      {isOpen && (
        <div className={alarmsStyle.popupContainer}>
          <div className={alarmsStyle.popupInner}>
            <span
              onClick={() => setIsOpen(false)}
              className={alarmsStyle.popupClose}
            >
              &times;
            </span>
            <h1 className="p-2">
              <strong>{t("delivery")} :</strong> {deliveryNumber}
            </h1>
            <p className="p-2">
              <strong>{t("alarms")} :</strong> {alertTemp} {alertHumidity}{" "}
              {alertShock} {alertLight} {alertOrientation} {alertEta}{" "}
              {alertExpdate} {alertTheft}
            </p>

            <p className="p-2">
              <strong>Date :</strong> {date} / {time}
            </p>
            <p className="p-2">
              <strong>{t("action")} :</strong> {action}
            </p>
            <p className="p-2">
              <strong>{t("contactName")} :</strong> {contactName}
            </p>
            <p className="p-2">
              <strong>{t("messages")} :</strong> {messages}
            </p>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: "/deliveries/[delivery_id]",
                  query: { delivery_id: deliveryNumber },
                });
              }}
              className={alarmsStyle.buttonShow}
            >
              {t("detail")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupAlert;
