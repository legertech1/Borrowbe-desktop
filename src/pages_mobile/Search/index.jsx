import React, { useEffect, useState, useRef } from "react";
import Dropdown from "../../components_mobile/shared/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import BookmarkOutlinedIcon from "@mui/icons-material/BookmarkOutlined";
import Listings from "../../components_mobile/Listings";
import ClearIcon from "@mui/icons-material/Clear";
import { useSelector, useDispatch } from "react-redux";
import {
  newSearch,
  changeSearch,
  removeSearch,
  modifySearch,
  loadResults,
  emptyResults,
} from "../../store/searchSlice";
import RowListings from "../../components_mobile/RowListings";
import { saveSearch, deleteSearch, me } from "../../store/authSlice";
import Modal from "../../components/Modal";
import TuneOutlinedIcon from "@mui/icons-material/TuneOutlined";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import DisplayType from "../../components_mobile/DisplayType";
import Loader from "../../components_mobile/Loader";

import "../Home/Filters.css";
import SearchFilter from "./SearchFilter";
import Button from "../../components_mobile/shared/Button";

function SearchPage() {
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState("grid");

  const inpRef = useRef();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const { current, searches } = useSelector((state) => state.search);

  const user = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories);
  const [sort, setSort] = useState({ text: "Most relevent", value: null });
  const { selectedLocation } = useSelector((state) => state.location);
  const [category, setCategory] = useState(null);
  const [endReached, setEndReached] = useState(false);
  const [filters, setFilters] = useState({
    price: {
      $lt: 1000000,
      $gt: 0,
    },
  });

  const [searchFilters, setSearchFilters] = useState({});
  const pending = searches[current].status == "pending" ? true : false;

  async function createNewSearch() {
    inpRef.current.value = "";
    dispatch(newSearch({ query: "" }));
    if (current === 7) dispatch(deleteSearch({ current: 0 }));
  }

  async function changeCategory(category) {
    dispatch(modifySearch({ category, merge: true }));
  }
  async function changeQuery(query) {
    dispatch(
      modifySearch({
        query,
        merge: false,
        page: 1,
      })
    );
  }

  useEffect(() => {
    dispatch(emptyResults());
  }, [selectedLocation, sort, searchFilters]);

  useEffect(() => {
    if (selectedLocation) {
      dispatch(
        modifySearch({
          page: 1,
        })
      );
    }
  }, [selectedLocation]);

  useEffect(() => {
    inpRef.current.value = { ...searches[current] }.query;
    setCategory(
      categories.filter((c) => c.name == searches[current].category)[0] || null
    );

    if (pending) {
      dispatch(
        loadResults({
          search: searches[current],
          current: current,
          location: selectedLocation,
          sort: sort.value,
          filters: searchFilters,
          merge: true,
        })
      );
    }
  }, [current, searches, searchFilters]);

  useEffect(() => {
    user?.data?.searches.reduce((bool, item) => {
      if (
        item?.query == searches[current]?.query &&
        item?.category == searches[current].category
      )
        return true;
      return bool;
    }, false)
      ? setSaved(true)
      : setSaved(false);
  }, [user, current, searches]);

  function loadMore() {
    if (searches[current].status == "fulfilled" && !endReached) {
      const p = searches[current].page + 1;
      dispatch(modifySearch({ page: p, merge: true }));
    }
  }

  useEffect(() => {
    let renderedAdsCount =
      searches[current].featured.length + searches[current].results.length;
    let totalAdsCount = searches[current].total;
    if (renderedAdsCount >= totalAdsCount) {
      setEndReached(true);
    } else {
      setEndReached(false);
    }
  }, [searches[current].results, searches[current].total]);

  return (
    <div className="mobile_filters">
      <div className="search_box">
        <div className="icon_cont">
          <SearchOutlinedIcon className="search_icon" />
        </div>
        <input
          ref={inpRef}
          placeholder="Finding Something?"
          className="search_input_field"
          type="text"
          onChange={(e) => {}}
          onKeyDown={(e) =>
            e.key == "Enter" && changeQuery(e.target.value.trim())
          }
        />

        <>
          <div className="hr_line"></div>
          <div className="icon_cont" onClick={() => setShowFilters(true)}>
            <TuneOutlinedIcon className="icon" />
          </div>
          <div
            className="icon_cont"
            onClick={(e) => {
              saved
                ? dispatch(deleteSearch({ ...searches[current], results: [] }))
                : dispatch(saveSearch({ ...searches[current], results: [] }));
            }}
          >
            {saved ? (
              <BookmarkOutlinedIcon className="bookmark_icon" />
            ) : (
              <BookmarkBorderOutlinedIcon className="icon" />
            )}
          </div>
        </>
      </div>

      <div className="filters_cont">
        <div className="box">
          <Dropdown
            placeholder={"All Categories"}
            value={searches[current].category}
            array={["All Categories", ...categories.map((item) => item.name)]}
            setValue={(value) => {
              changeCategory(value);
            }}
          ></Dropdown>
        </div>

        <div>
          <DisplayType viewMode={viewMode} setViewMode={setViewMode} />
        </div>
      </div>
      <div className="tabs_wrapper">
        <div className="search_tabs">
          {searches.map((search, index) => {
            return (
              <div
                className={"search_tab" + (current == index ? " active" : "")}
                key={index}
                onClick={() => {
                  dispatch(changeSearch({ current: index }));
                }}
              >
                <SearchIcon></SearchIcon>
                <p>
                  {" "}
                  <pre>{search.query || "New Search"}</pre>
                </p>
                {index !== current && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      dispatch(removeSearch({ current: index }));
                    }}
                  >
                    <ClearIcon />
                  </button>
                )}
              </div>
            );
          })}
          <div className="search_tab add" onClick={createNewSearch}>
            <AddIcon />
          </div>
        </div>
      </div>

      <div className="ads_container">
        {viewMode === "grid" ? (
          <Listings
            listings={[
              ...searches[current]?.featured,
              ...searches[current]?.results,
            ]}
          />
        ) : (
          <RowListings
            listings={[
              ...searches[current]?.featured,
              ...searches[current]?.results,
            ]}
          />
        )}
        {pending && <Loader />}
        {endReached && !pending && (
          <p className="end-reached">End of results</p>
        )}
        <div className="load_more_cont">
          <Button
            onClick={loadMore}
            className=""
            disabled={pending || endReached}
            style={{
              display: pending || endReached ? "none" : "block",
            }}
          >
            Load More
          </Button>
        </div>
      </div>

      {showFilters && (
        <Modal close={() => setShowFilters(false)}>
          <SearchFilter
            filters={filters}
            setFilters={setFilters}
            setShowFilters={setShowFilters}
            category={category}
            setSearchFilters={setSearchFilters}
          />
        </Modal>
      )}
    </div>
  );
}

export default SearchPage;
