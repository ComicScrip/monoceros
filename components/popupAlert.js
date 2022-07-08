import { useRouter } from "next/router";
import React from "react";
import alarmsStyle from "../styles/alarms.module.css";

function PopupAlert({
  isOpen,
  setIsOpen,
  deliveryNumber,
  alerts,
  date,
  time,
  action,
  contactName,
  messages,
}) {
  const router = useRouter();
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
              <strong>N° de livraison :</strong> {deliveryNumber}
            </h1>
            <p className="p-2">
              <strong>Alertes :</strong>
            </p>
            <span>{alerts}</span>
            <p className="p-2">
              <strong>Date :</strong> {date} / {time}
            </p>
            <p className="p-2">
              <strong>Action :</strong> {action}
            </p>
            <p className="p-2">
              <strong>Nom du contact :</strong> {contactName}
            </p>
            <p className="p-2">
              <strong>Commentaires :</strong> {messages}
            </p>
            <button
              type="button"
              onClick={() => {
                router.push({
                  pathname: "/deliveries/[delivery_id]",
                  query: { delivery_id: deliveryNumber },
                });
              }}
              className={alarmsStyle.buttonResolve}
            >
              Détail de la livraison
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupAlert;
