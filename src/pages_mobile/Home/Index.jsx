import React, { useEffect, useState } from "react";
import axios from "axios";
import Filters from "./Filters";
import Listings from "../../components_mobile/Listings";
import apis from "../../services/api";
import { useDispatch, useSelector } from "react-redux";
import Loader from "../../components_mobile/Loader";
import { ADS_LIMIT } from "../../utils/constants";
import { removeDuplicates } from "../../utils/helpers";
import { setAds } from "../../store/adsSlice";
import Button from "../../components_mobile/shared/Button";
import "./index.css";

export default function Home() {
  const dispatch = useDispatch();
  const ads = useSelector((state) => state.ads.ads);
  const [endReached, setEndReached] = useState(false);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);

  const selectedLocation = useSelector(
    (state) => state.location.selectedLocation
  );

  async function getAds(page) {
    try {
      setLoading(true);

      let payload = {
        location: selectedLocation ? selectedLocation : null,
        category: "All Categories",
        additional: {
          "meta.homepageGallery": true,
        },
        sort: "-meta.featured -meta.listingRank",
        limit: ADS_LIMIT,
        page: page,
        count: true,
        impressions: true,
      };

      let homeResult = (
        await axios.post(apis.search, {
          ...payload,
          additional: {
            "meta.homepageGallery": true,
          },
        })
      ).data.results;
      let recommendedResult = (
        await axios.post(apis.search, {
          ...payload,
          additional: {
            "meta.homepageGallery": false,
          },
        })
      ).data.results;

      if (homeResult.length === 0 && recommendedResult.length === 0) {
        setLoading(false);
        setEndReached(true);
        return;
      }

      dispatch(
        setAds({
          ads: removeDuplicates(
            [...ads, ...homeResult, ...recommendedResult],
            "_id"
          ),
        })
      );

      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (selectedLocation) {
      dispatch(setAds({ ads: [] }));
    }

    getAds(1);
  }, [selectedLocation]);

  useEffect(() => {
    getAds(page);
  }, [page]);

  function loadMore() {
    setPage(page + 1);
  }

  return (
    <div className="mobile_home">
      <Filters />
      <div className="ads_container">
        {ads.length > 0 && <Listings listings={ads} />}
        {loading && <Loader />}
        {endReached && <p className="end-reached">End of results</p>}
        <div className="load_more_cont">
          <Button
            onClick={loadMore}
            className=""
            disabled={loading || endReached}
            style={{
              display: loading || endReached ? "none" : "block",
            }}
          >
            Load More
          </Button>
        </div>
      </div>
    </div>
  );
}
