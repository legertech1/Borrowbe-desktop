import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import "./index.css";

function Modal({ children, close, title }) {
  const closeOnOutsideClick = (e) => {
    if (e.target.className === "modal_overlay") {
      close();
    }
  };
  useEffect(() => {
    document.addEventListener("click", closeOnOutsideClick, false);
    return () => {
      document.removeEventListener("click", closeOnOutsideClick, false);
    };
  }, []);
  return (
    <>
      {createPortal(
        <div className="mobile_modal_overlay">
          <div className="mobile_modal">
            <p className="left_title">{title}</p>
            <button onClick={close} className="close">
              <CloseOutlinedIcon />
            </button>

            {children}
          </div>
        </div>,
        document.getElementById("portal")
      )}
    </>
  );
}

export default Modal;
