import React from "react";
import Listing from "./RowListing";
import "./RowListings.css";
const parser = new DOMParser();

function RowListings({ listings, actions, setListings, loading = true, cb }) {
  return (
    <div className={"row_listings" + (actions ? " actions" : "")}>
      {listings?.map((listing, index) => (
        <Listing
          setListings={setListings}
          listing={listing}
          key={listing._id}
          actions={actions}
          parser={parser}
          cb={cb}
        />
      ))}
      {loading &&
        !listings.length &&
        Array(12)
          .fill(null)
          .map((listing, index) => <Listing empty={true} />)}
    </div>
  );
}

export default RowListings;
