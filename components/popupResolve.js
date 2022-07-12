import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import React from "react";
import alarmsStyle from "../styles/alarms.module.css";

function PopupResolve({
  isOpen,
  setIsOpen,
  deliveryNumber,
  packageId,
  handleSubmit,
  message,
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
            <h1 className="p-2">Ajouter un commentaire</h1>
            <p className="p-2">
              <strong>{t("delivery")} :</strong> {deliveryNumber},{" "}
              <strong>{t("package")} :</strong> {packageId}
            </p>
            <p className="p-2">
              <strong>{t("messages")} :</strong>
            </p>
            <textarea className="p-2">{message}</textarea>
            <button
              type="button"
              onSubmit={handleSubmit}
              className={alarmsStyle.buttonResolve}
            >
              {t("solveAlert")}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default PopupResolve;
