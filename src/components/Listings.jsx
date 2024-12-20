import React from "react";
import Listing from "./Listing";
import "./Listings.css";
const parser = new DOMParser();
function Listings({ listings, actions, setListings, loading = true }) {
  return (
    <div className="listings">
      {listings?.map((listing, index) => (
        <Listing
          setListings={setListings}
          listing={listing}
          key={listing._id}
          actions={actions}
          parser={parser}
        />
      ))}

      {loading &&
        Array(24)
          .fill(null)
          .map((listing, index) => <Listing empty={true} />)}
    </div>
  );
}

export default Listings;
