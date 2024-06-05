import React from "react";
import Listing from "../Listing";
import Loader from "../Loader";
import "./index.css";
import ScrollToEndDetector from "../../pages_mobile/Home/Detector";

function Listings({ listings, loading, endReached, actions, cb }) {
  const handleEndReached = () => {
    // Load more items or perform any action when the end is reached
    // For example, fetch more data from an API
    console.log("End reached! Load more items...");
  };
  return (
    <>
      <div className="mobile_grid_listings">
        {listings?.map((listing) => {
          return (
            <Listing
              actions={actions}
              key={listing._id}
              listing={listing}
              cb={cb}
            />
          );
        })}
      </div>
      {loading && <Loader />}
      {endReached && (
        <div className="end-reached">
          <p className="info_text">You've reached the end of the listings.</p>
        </div>
      )}
    </>
  );
}

export default Listings;
