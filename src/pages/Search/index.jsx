import React, { useEffect, useState, useRef } from "react";
import Navbar from "../../components/Navbar";
import Dropdown from "../../components/Shared/Dropdown";
import SearchIcon from "@mui/icons-material/Search";
import PinDropOutlinedIcon from "@mui/icons-material/PinDropOutlined";
import Arrow from "@mui/icons-material/KeyboardArrowDown";
import AddIcon from "@mui/icons-material/Add";
import TuneIcon from "@mui/icons-material/Tune";

import { BookmarkFill } from "@styled-icons/octicons/BookmarkFill";
import { Bookmark } from "@styled-icons/octicons/Bookmark";
import TableRowsSharpIcon from "@mui/icons-material/TableRowsSharp";
import WindowSharpIcon from "@mui/icons-material/WindowSharp";
import Listings from "../../components/Listings";
import ClearIcon from "@mui/icons-material/Clear";
import "./index.css";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { useSelector, useDispatch } from "react-redux";

import {
  newSearch,
  changeSearch,
  removeSearch,
  modifySearch,
  loadResults,
  loadSearches,
  emptyResults,
} from "../../store/searchSlice";
import RowListings from "../../components/RowListings";
import { saveSearch, deleteSearch, me } from "../../store/authSlice";
import Modal from "../../components/Modal";

import WebLocation from "../../components/WebLocation";
import Footer from "../../components/Footer";
import PageControl from "../../components/PageControl";
import NotFoundAnimation from "../../components/Shared/NotFoundAnimation";
import CategoriesIcon from "../../assets/images/CategoriesIcon";
import { AdTypes, PriceOptions } from "../../utils/constants";
import Input from "../../components/Shared/Input";

function SearchPage() {
  const [viewMode, setViewMode] = useState("rows");
  const inpRef = useRef();
  const dispatch = useDispatch();
  const [saved, setSaved] = useState(false);
  const { current, searches } = useSelector((state) => state.search);
  const user = useSelector((state) => state.auth);
  const categories = useSelector((state) => state.categories);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [sort, setSort] = useState({
    text: "Most relevent",
    value: { "meta.listingRank": -1 },
  });
  const sortOptions = [
    { text: "Most relevent", value: { "meta.listingRank": -1 } },
    { text: "Newest first", value: { createdAt: -1 } },
    { text: "Oldest first", value: { createdAt: 1 } },
    { text: "Highest price", value: { price: -1 } },
    { text: "Lowest price", value: { price: 1 } },
  ];
  const [page, setPage] = useState(1);
  const { selectedLocation, currentLocation } = useSelector(
    (state) => state.location
  );
  const [category, setCategory] = useState(null);

  const [filters, setFilters] = useState({
    price: {
      $lte: 9999999,
      $gte: 0,
    },
  });
  const [searchFilters, setSearchFilters] = useState({
    price: {
      $lte: 9999999,
      $gte: 0,
    },
  });

  useEffect(() => {
    dispatch(emptyResults());
  }, [selectedLocation, sort, searchFilters]);
  async function createNewSearch() {
    inpRef.current.value = "";
    dispatch(newSearch({ query: "" }));
    if (current === 7) dispatch(deleteSearch({ current: 0 }));
  }

  async function changeCategory(category) {
    dispatch(modifySearch({ category }));
  }
  async function changeQuery(query) {
    dispatch(modifySearch({ query }));
  }
  const showModal = () => {
    setShowLocationModal(true);
  };

  const hideModal = () => {
    setShowLocationModal(false);
  };

  useEffect(() => {
    inpRef.current.value = { ...searches[current] }.query;
    setCategory(
      categories.filter((c) => c.name == searches[current].category)[0] || null
    );

    if (searches[current]?.status == "pending") {
      const timeout = setTimeout(
        () =>
          dispatch(
            loadResults({
              search: searches[current],
              current: current,
              location: selectedLocation,
              sort: sort.value,
              filters: searchFilters,
            })
          ),
        100
      );
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [current, searches]);

  useEffect(() => {
    user?.data?.searches?.reduce((bool, item) => {
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

  useEffect(() => {
    let tm = setTimeout(
      () => setSearchFilters({ ...searchFilters, ...filters }),
      300
    );

    return () => {
      clearTimeout(tm);
    };
  }, [filters]);
  return (
    <div className="search_page">
      <Navbar white={true} topOnly={true} noLoc={true}></Navbar>

      <div className="search_main">
        <div className="search_inp">
          <Dropdown
            array={["All Categories", ...categories.map((item) => item.name)]}
            icons={[
              <CategoriesIcon />,
              ...categories.map((item) => <img src={item.icon}></img>),
            ]}
            value={searches[current].category}
            setValue={changeCategory}
          />
          <hr />
          <SearchIcon></SearchIcon>
          <input
            ref={inpRef}
            placeholder="Trying to find something?"
            // value={searches[current]?.query}
            onChange={(e) => {}}
            type="text"
            onKeyDown={(e) =>
              e.key == "Enter" && changeQuery(e.target.value.trim())
            }
          />
          <button onClick={(e) => changeQuery(inpRef.current.value)}>
            Search
          </button>
        </div>

        <div className="location" onClick={showModal}>
          {" "}
          <PinDropOutlinedIcon />{" "}
          <span className="location_name">
            {selectedLocation?.name || "select a Location"}
          </span>
          {selectedLocation?.radius && (
            <p className="radius">
              <hr />
              {selectedLocation.radius} km
            </p>
          )}
          <span className="arrow">
            <Arrow></Arrow>
          </span>
        </div>
      </div>

      <div className="tabs_wrapper">
        <div className="search_tabs">
          {searches.map((search, index) => {
            return (
              <div
                className={"search_tab" + (current == index ? " active" : "")}
                key={index}
                onClick={() => dispatch(changeSearch({ current: index }))}
              >
                <SearchIcon></SearchIcon>
                <p> {search.query || "New Search"}</p>
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

          {searches.length < 9 && (
            <div className="search_tab add" onClick={createNewSearch}>
              <AddIcon /> Add Search
            </div>
          )}
        </div>
      </div>

      <div className="search_content">
        <div className="filters">
          <Dropdown
            subtext={"Sort By"}
            array={sortOptions}
            value={sort}
            setValue={(v) => setSort(v)}
          />
          <hr />
          <div className="filter">
            <div className="field">
              <h2>Min. Price</h2>
              <Input
                pretext="$"
                type="number"
                value={filters?.price?.$gte}
                min={0}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: {
                      ...filters.price,
                      $gte: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <div className="slider">
              <input
                type="range"
                min="0"
                max="1000"
                value={filters?.price?.$gte}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: {
                      ...filters.price,
                      $gte: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
            <span></span>
            <div className="field">
              <h2>Max. Price</h2>

              <Input
                pretext="$"
                type="number"
                value={filters?.price?.$lte}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: {
                      ...filters.price,
                      $lte: Number(e.target.value),
                    },
                  })
                }
              ></Input>
            </div>
            <div className="slider">
              <input
                type="range"
                min="0"
                max="99999"
                value={filters?.price?.$lte}
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    price: {
                      ...filters.price,
                      $lte: Number(e.target.value),
                    },
                  })
                }
              />
            </div>
          </div>

          <div className="filter t">
            <div className="field">
              <h2>Listing Type</h2>
              <p></p>
            </div>
            <div className="terms">
              {AdTypes.map((option) => (
                <div
                  className={
                    "term" +
                    (searchFilters?.type &&
                    searchFilters?.type?.$in?.includes(option)
                      ? " active"
                      : "")
                  }
                  onClick={async (e) =>
                    setSearchFilters((f) => {
                      let type = f?.type?.$in?.includes(option)
                        ? {
                            $in: [...f.type?.$in?.filter((o) => o != option)],
                          }
                        : { $in: [...(f?.type?.$in || []), option] };
                      if (type.$in.length === 0) {
                        delete f.type;
                        console.log(f);
                        return { ...f };
                      } else return { ...f, type };
                    })
                  }
                >
                  &nbsp; {option} &nbsp;
                </div>
              ))}
            </div>
            <hr />
          </div>
          <div className="filter t">
            <div className="field">
              <h2>Payment Interval</h2>
              <p></p>
            </div>

            <div className="terms">
              {PriceOptions.map((option) => (
                <div
                  className={
                    "term" +
                    (searchFilters?.term &&
                    searchFilters?.term?.$in?.includes(option)
                      ? " active"
                      : "")
                  }
                  onClick={async (e) =>
                    setSearchFilters((f) => {
                      let term = f?.term?.$in?.includes(option)
                        ? {
                            $in: [...f.term?.$in?.filter((o) => o != option)],
                          }
                        : { $in: [...(f?.term?.$in || []), option] };
                      if (term.$in.length === 0) {
                        delete f.term;
                        console.log(f);
                        return { ...f };
                      } else return { ...f, term };
                    })
                  }
                >
                  {option == "Day" ? "Daily" : option + "ly"}
                </div>
              ))}
            </div>
          </div>
          {category && (
            <div className="filter t">
              <div className="field">
                <h2>Sub Category</h2>
                <p></p>
              </div>
              <div className="terms">
                {category?.subCategories.map((sc) => (
                  <div
                    className={
                      "term" +
                      (searchFilters["meta.subCategory"]?.$in?.includes(sc.name)
                        ? " active"
                        : "")
                    }
                    onClick={async (e) =>
                      setSearchFilters((f) => {
                        let subCategory = f["meta.subCategory"]?.$in?.includes(
                          sc.name
                        )
                          ? {
                              $in: [
                                ...f["meta.subCategory"]?.$in?.filter(
                                  (o) => o != sc.name
                                ),
                              ],
                            }
                          : {
                              $in: [
                                ...(f["meta.subCategory"]?.$in || []),
                                sc.name,
                              ],
                            };
                        if (subCategory.$in.length === 0) {
                          delete f["meta.subCategory"];

                          return { ...f };
                        } else return { ...f, "meta.subCategory": subCategory };
                      })
                    }
                  >
                    {sc.name}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
        <div className="search_results">
          <div className="search_results_header">
            <p>
              Showing results for <span>{searches[current]?.query || "-"}</span>{" "}
            </p>

            <div>
              {" "}
              {user && (
                <div
                  className={"save_search" + (saved ? " active" : "")}
                  onClick={(e) => {
                    saved
                      ? dispatch(
                          deleteSearch({ ...searches[current], results: [] })
                        )
                      : dispatch(
                          saveSearch({ ...searches[current], results: [] })
                        );
                  }}
                >
                  <BookmarkFill></BookmarkFill>{" "}
                  {saved ? "Saved" : "Save Search"}
                </div>
              )}
              <div className="display_type">
                <div
                  onClick={(e) => setViewMode("rows")}
                  className={"rows_btn" + (viewMode == "rows" ? " active" : "")}
                >
                  <TableRowsSharpIcon /> List View
                </div>
                <div
                  onClick={(e) => setViewMode("grid")}
                  className={"grid_btn" + (viewMode == "grid" ? " active" : "")}
                >
                  <WindowSharpIcon /> Grid View
                </div>
              </div>
            </div>
          </div>
          {viewMode == "grid" && (
            <Listings
              listings={searches[current]?.featured.concat(
                searches[current]?.results
              )}
              loading={searches[current].status == "pending" ? true : false}
            />
          )}
          {viewMode == "rows" && (
            <RowListings
              listings={searches[current]?.featured.concat(
                searches[current]?.results
              )}
              loading={searches[current].status == "pending" ? true : false}
            ></RowListings>
          )}

          {!searches[current]?.featured?.length &&
            !searches[current]?.results?.length &&
            searches[current]?.status != "pending" && (
              <div className="no_results">
                <NotFoundAnimation />
                <h3>Whoops! No results found.</h3>
              </div>
            )}

          {Boolean(searches[current].total) && (
            <PageControl
              page={searches[current].page}
              setPage={(page) => dispatch(modifySearch({ page }))}
              count={searches[current].total}
              size={50}
            />
          )}
        </div>
      </div>
      {showLocationModal && (
        <Modal
          className={"location_modal"}
          title={"Your Location"}
          close={hideModal}
        >
          <WebLocation close={hideModal} />
        </Modal>
      )}
      <Footer></Footer>
    </div>
  );
}

export default SearchPage;
