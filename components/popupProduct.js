import React from "react";
import newProductStyle from "../styles/newProduct.module.css";

function PopupProduct({ text }) {
  return (
    <div className={newProductStyle.popupContainer}>
      <div className={newProductStyle.popupInner}>
        <p>{text}</p>
      </div>
    </div>
  );
}

export default PopupProduct;
