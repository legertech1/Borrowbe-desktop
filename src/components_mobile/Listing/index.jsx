import React, { useEffect, useState } from "react";
import FavoriteIcon from "@mui/icons-material/Favorite";
import { useDispatch, useSelector } from "react-redux";
import { addToWishlist, removeFromWishlist } from "../../store/authSlice";
import { useNavigate } from "react-router-dom";
import AdMenu from "../AdMenu";
import "./index.css";
import { adPlaceholderImg, handleImgError } from "../../utils/helpers";
import RadiusBadge from "../RadiusBadge";

export default function Listing({ listing, actions, cb }) {
  const user = useSelector((state) => state.auth);
  let { thumbnails, title, description, price, term, _id, location } = listing;

  const [wishlisted, setWishlisted] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    user?.data?.wishlist?.includes(_id)
      ? setWishlisted(true)
      : setWishlisted(false);
  }, [user]);

  function add() {
    if (!user) return navigate("/login");
    dispatch(addToWishlist(_id));
    setWishlisted(true);
  }

  function remove() {
    if (!user) return navigate("/login");
    dispatch(removeFromWishlist(_id));
    setWishlisted(false);
  }

  const navigateTo = () => {
    navigate(`/listing/${_id}`);
  };

  return (
    <div
      key={_id}
      onClick={(e) => {
        e.stopPropagation();
        navigateTo(e);
      }}
      className={
        "mobile_grid_card" + (listing?.meta?.highlighted ? " highlighted" : "")
      }
    >
      <div className="image_cont">
        <img
          onError={handleImgError}
          referrerPolicy="no-referrer"
          src={thumbnails[0] || adPlaceholderImg}
          alt={title}
          className="image"
        />
        <button
          className={"wishlist" + (wishlisted ? " active" : "")}
          onClick={(e) => {
            e.stopPropagation();

            wishlisted ? remove() : add();
          }}
        >
          <FavoriteIcon />
        </button>
        <div className="status_cont">
          {actions && (
            <div className={"status " + listing?.meta?.status}>
              {listing?.meta?.status}
            </div>
          )}
        </div>

        <div className="badges">
          {listing?.meta?.featured && listing?.meta?.highlighted && (
            <div className="featured">Highlighted & Featured</div>
          )}
          {listing?.meta?.featured && !listing?.meta?.highlighted && (
            <div className="featured"> Featured</div>
          )}
          {!listing?.meta?.featured && listing?.meta?.highlighted && (
            <div className="featured">Highlighted </div>
          )}
        </div>
      </div>
      <div className="info_container">
        <div className="title_cont">
          <div className="price_container">
            <span className="price">${price}</span>
            <span className="term">/{term}</span>
          </div>
          <div className="actions_cont">
            {actions && <AdMenu cb={cb} adId={_id} listing={listing} />}
          </div>
        </div>
        <p className="title">{title}</p>
        <p className="description2">{description}</p>

        <RadiusBadge location={location} />
      </div>
    </div>
  );
}

{
  /* <div className="flex flex-col rounded-md shadow-md">
      <img
        onError={handleImgError}
        referrerPolicy="no-referrer"
        src={thumbnails[0] || adPlaceholderImg}
        alt={title}
        className="w-full h-24 object-cover rounded-tl-md rounded-tr-md bg-white"
      />
      <div className="px-2 py-2 max-h-20 h-full bg-emerald-200 rounded-md">
        <div>
          <span className="text-[#2196f3] text-sm font-bold">${price}</span>
          <span className="text-xs text-[#444] font-medium">/{term}</span>
        </div>
        <p className="p-0 m-0 line-clamp-2">{title}</p>
      </div>
    </div> */
}
