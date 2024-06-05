import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import DisplayType from "../../components_mobile/DisplayType";
import ButtonTabs from "../../components_mobile/ButtonTabs";
import MyWishlist from "./MyWishlist";
import MyAds from "./MyAds";
import "./index.css";

export default function Wishlist() {
  const [viewMode, setViewMode] = useState("rows");
  const navigate = useNavigate();
  const params = useParams();
  const { tab } = params;

  return (
    <div className="mobile_wishlist">
      <ButtonTabs
        key={params?.tab || "ads"}
        activeKey={params?.tab || "ads"}
        items={[
          {
            label: "Wishlist",
            key: "wishlist",
            content:
              tab == "wishlist" ? <MyWishlist viewMode={viewMode} /> : null,
          },
          {
            label: "My Ads",
            key: "ads",
            content: tab == "ads" ? <MyAds viewMode={viewMode} /> : null,
          },
        ]}
        onChange={(key) => {
          navigate("/wishlist/" + key);
        }}
        extras={<DisplayType viewMode={viewMode} setViewMode={setViewMode} />}
      />
    </div>
  );
}
