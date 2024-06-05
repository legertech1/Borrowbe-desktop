import React, { useState } from "react";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import HomeFilledIcon from "@mui/icons-material/Home";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteFilledIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineOutlinedIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import ChatBubbleFilledIcon from "@mui/icons-material/ChatBubble";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PersonIcon from "@mui/icons-material/Person";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import AddFilledIcon from "@mui/icons-material/Add";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import BottomHollow from "../../assets/images/bottom-nav-hollow.png";
import { imageFallback } from "../../utils/listingCardFunctions";

const routes = [
  {
    name: "Home",
    icon: <HomeOutlinedIcon />,
    activeIcon: <HomeFilledIcon />,
    path: "/",
  },
  {
    name: "Chat",
    icon: <ChatBubbleOutlineOutlinedIcon />,
    activeIcon: <ChatBubbleFilledIcon />,
    path: "/messages",
  },
  {
    name: "Post Ad",
    icon: <AddOutlinedIcon />,
    activeIcon: <AddFilledIcon />,
    path: "/post-ad",
  },
  {
    name: "My Ads",
    icon: <FavoriteBorderOutlinedIcon />,
    activeIcon: <FavoriteFilledIcon />,
    path: "/wishlist/ads",
  },
  {
    name: "Account",
    icon: <PersonOutlineOutlinedIcon />,
    activeIcon: <PersonIcon />,
    path: "/profile",
  },
];

const Footer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleItemClick = (route) => {
    navigate(route.path);
  };

  return (
    <nav className="mobile_footer">
      {routes.slice(0, 2).map((route) => (
        <li
          key={route.name}
          className={`item_cont ${
            location.pathname === route.path ? "active" : ""
          }`}
          onClick={() => handleItemClick(route)}
        >
          {location.pathname === route.path ? route.activeIcon : route.icon}
          <span className="item_text">{route.name}</span>
        </li>
      ))}

      {routes.slice(2, 3).map((route) => (
        <li
          key={route.name}
          className={"item_cont mid"}
          onClick={() => handleItemClick(route)}
        >
          <img onError={imageFallback} src={BottomHollow} alt="" />
          <div className="mid_icon">
            {location.pathname === route.path ? route.activeIcon : route.icon}
          </div>
          <span className="item_text">{route.name}</span>
        </li>
      ))}

      {routes.slice(3, 5).map((route) => (
        <li
          key={route.name}
          className={`item_cont ${
            location.pathname === route.path ? "active" : ""
          }`}
          onClick={() => handleItemClick(route)}
        >
          {location.pathname === route.path ? route.activeIcon : route.icon}
          <span className="item_text">{route.name}</span>
        </li>
      ))}
    </nav>
  );
};

export default Footer;
