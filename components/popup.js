import style from "../styles/popup.module.css";
import { useTranslation } from "next-i18next";

export default function Popup({ content, handleClose, confirm }) {
  const { t } = useTranslation("common");
  return (
    <div className={style.popupBox}>
      <div className={style.box}>
        {content}
        <div className="flex justify-around">
          <button className={style.confirm} onClick={() => confirm()}>
            {t("yes")}
          </button>
          <button className={style.confirm} onClick={() => handleClose(false)}>
            {t("no")}
          </button>
        </div>
      </div>
    </div>
  );
}
