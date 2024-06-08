import React from "react";
import "./CTA.css";
import Banner from "../../pages/Home/Banner";
import appStore from "../../assets/images/appStore.png";
import playStore from "../../assets/images/playStore.png";

function StoreComponent({ type = "banner" }) {
  if (type === "banner") {
    return <Banner />;
  }
  return (
    <div className="store_buttons">
      <a
        href="https://apps.apple.com/pk/app/borrowbe/id6479541765"
        target="_blank"
        rel="noreferrer"
      >
        <img className="appstore" src={appStore} alt="" />
      </a>
      <a
        href="https://play.google.com/store/apps/details?id=com.borrowbeapp&pli=1"
        target="_blank"
        rel="noreferrer"
      >
        <img className="playstore" src={playStore} alt="" />
      </a>
    </div>
  );
}

export default StoreComponent;
