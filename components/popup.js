import style from "../styles/popup.module.css";

export default function Popup({ content, handleClose, confirm }) {
  return (
    <div className={style.popupBox}>
      <div className={style.box}>
        {content}
        <div className="flex justify-around">
          <button className={style.confirm} onClick={() => confirm()}>
            YES
          </button>
          <button className={style.confirm} onClick={() => handleClose(false)}>
            NO
          </button>
        </div>
      </div>
    </div>
  );
}
