import React from "react";
import "./Banner.css";
import phoneImg from "../../assets/images/phone.png";
import appStore from "../../assets/images/appstore.png";
import playStore from "../../assets/images/playstore.png";
// https://apps.apple.com/pk/app/borrowbe/id6479541765
// https://play.google.com/store/apps/details?id=com.borrowbeapp&pli=1

function Banner() {
  return (
    <div className="banner">
      <div className="main">
        <h1>BorrowBe's better when you're a member</h1>
        <p>
          See more relevant listings, find what you're looking for quicker, and
          more!{" "}
        </p>
        <div className="buttons">
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
      </div>
      <img src={phoneImg} alt="" />
    </div>
  );
}

export default Banner;
