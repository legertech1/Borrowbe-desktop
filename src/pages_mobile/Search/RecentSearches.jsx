import React, { useRef } from "react";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import { changeSearch, newSearch, removeSearch } from "../../store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import { deleteSearch } from "../../store/authSlice";
import "./RecentSearches.css";

export default function RecentSearches() {
  const { current, searches } = useSelector((state) => state.search);
  const dispatch = useDispatch();
  const inpRef = useRef();

  async function createNewSearch() {
    inpRef.current.value = "";
    dispatch(newSearch({ query: "" }));
    if (current === 7) dispatch(deleteSearch({ current: 0 }));
  }

  return (
    <div className="mobile_recent_searches">
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
    </div>
  );
}
