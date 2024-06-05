import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Listings from "../../components_mobile/Listings";
import RowListings from "../../components_mobile/RowListings";
import axios from "axios";
import apis from "../../services/api";
import { useSelector } from "react-redux";
import Button from "../../components_mobile/shared/Button";
import "./index.css";

export default function MyAds({ viewMode }) {
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
        additional: {
          user: user._id,
        },
        sort: { createdAt: -1 },
        page: page,
        limit: 20,
        count: true,
        category: "All Categories",
        ignoreStatus: true,
        restrictCountry: true,
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

  const cb = async (type, adId) => {
    switch (type) {
      case "pause":
        try {
          const ad = (await axios.get(apis.pauseAd + adId)).data;

          setListings((listings) => [
            ...listings.map((l) => (l._id == ad._id ? ad : l)),
          ]);
        } catch (error) {}

        break;
      case "delete":
        try {
          await axios.delete(apis.deleteAd + adId);
          setListings((listings) => listings.filter((l) => l._id != adId));
        } catch (error) {}
        break;
      case "resume":
        try {
          const ad = (await axios.get(apis.resumeAd + adId)).data;
          setListings((listings) => [
            ...listings.map((l) => (l._id == adId ? ad : l)),
          ]);
        } catch (error) {}
      default:
        break;
    }
  };

  function loadMore() {
    setPage(page + 1);
  }

  return (
    <div>
      {viewMode == "grid" && (
        <Listings
          cb={cb}
          actions={true}
          listings={listings}
          loading={loading}
          infoText={"You haven't posted any ads yet"}
        />
      )}
      {viewMode == "rows" && (
        <RowListings
          cb={cb}
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
