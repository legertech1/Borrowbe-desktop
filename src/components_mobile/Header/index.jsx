import React, { useState } from "react";
import LOGO from "../../assets/images/MainLogoBlack.svg";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Link } from "react-router-dom";
import NotificationsIcon from "@mui/icons-material/NotificationsNoneOutlined";
import Modal from "../../components_mobile/Modal";
import MobileLocation from "../MobileLocation";
import { useSelector } from "react-redux";
import Notifications from "../Notifications/Index";
import "./index.css";
import { imageFallback } from "../../utils/listingCardFunctions";

const Header = () => {
  const location = useSelector((state) => state.location.selectedLocation);

  const [showLocationModal, setShowLocationModal] = useState(false);
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);

  const showModal = () => {
    setShowLocationModal(true);
  };

  const hideModal = () => {
    setShowLocationModal(false);
  };

  const showNotifications = () => {
    setShowNotificationsModal(true);
  };

  const hideNotifications = () => {
    setShowNotificationsModal(false);
  };

  return (
    <header className="mobile_header">
      <div className="header_center">
        <Link to="/">
          <img onError={imageFallback} src={LOGO} alt="borrow_be_logo" />
        </Link>
      </div>

      <div className="icon_container" onClick={showNotifications}>
        <NotificationsIcon />
      </div>

      <div className="icon_container" onClick={showModal}>
        <LocationOnOutlinedIcon />
      </div>
      {location?.name && (
        <div className="loc_cont" onClick={showModal}>
          <p className="loc_text">{location?.name}</p>
        </div>
      )}

      {showLocationModal && (
        <Modal
          title={
            <div className="modal_header">
              <LocationOnOutlinedIcon /> Location{" "}
            </div>
          }
          close={hideModal}
        >
          <MobileLocation close={hideModal} />
        </Modal>
      )}
      {showNotificationsModal && (
        <Modal
          title={
            <div className="modal_header">
              <NotificationsIcon /> Notifications{" "}
            </div>
          }
          close={hideNotifications}
        >
          <Notifications close={hideNotifications} />
        </Modal>
      )}
    </header>
  );
};

export default Header;
