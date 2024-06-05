import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../../components_mobile/Listings";
import RowListings from "../../components_mobile/RowListings";
import axios from "axios";
import apis from "../../services/api";
import { useSelector } from "react-redux";
import Button from "../../components_mobile/shared/Button";
import "./index.css";

export default function MyWishlist({ viewMode }) {
  const [listings, setListings] = useState([]);
  const [endReached, setEndReached] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const params = useParams();

  const user = useSelector((state) => state.auth);

  async function getUserAds() {
    if (loading || endReached) return;

    setLoading(true);

    const { results } = (
      await axios.post(apis.search, {
        additional: { _id: { $in: user?.data.wishlist } },
        sort: {},
        page: page,
        limit: 20,
        count: true,
        category: "All Categories",
      })
    ).data;

    if (results.length === 0) {
      setEndReached(true);
    }

    setListings([...listings, ...results]);
    setLoading(false);
  }

  useEffect(() => {
    if (!user) return;
    getUserAds();
  }, [user, page]);

  function loadMore() {
    setPage(page + 1);
  }

  return (
    <div>
      {viewMode == "grid" && (
        <Listings
          actions={true}
          listings={listings}
          loading={loading}
          infoText={"You haven't posted any ads yet"}
        />
      )}
      {viewMode == "rows" && (
        <RowListings
          actions={params.tab == "ads" ? true : false}
          listings={listings}
          loading={loading}
          infoText={"You haven't posted any ads yet"}
        />
      )}
      {endReached && <p className="end-reached">End of results</p>}

      {!loading && (
        <div className="load_more_cont">
          <Button
            style={{
              display: loading || endReached ? "none" : "block",
            }}
            onClick={loadMore}
          >
            Load More
          </Button>
        </div>
      )}
    </div>
  );
}
