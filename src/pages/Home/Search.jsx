import React, { useEffect, useRef, useState } from "react";
import "./Search.css";

import SearchIcon from "@mui/icons-material/Search";
import CategoriesIcon from "../../assets/images/CategoriesIcon";

import { useDispatch, useSelector } from "react-redux";
import { newSearch } from "../../store/searchSlice";
import { useNavigate } from "react-router-dom";
import Dropdown from "../../components/Shared/Dropdown";
import Footer from "../../components/Footer";

function Search({ category, setCategory }) {
  const options = useRef();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const inpRef = useRef();
  const categories = useSelector((state) => state.categories);

  function search(query) {
    dispatch(newSearch({ query: query.trim(), category }));

    navigate("/search");
  }

  return (
    <div className="search">
      <div className="main">
        <Dropdown
          array={["All Categories", ...categories.map((item) => item.name)]}
          value={category}
          icons={[
            <CategoriesIcon />,
            ...categories.map((item) => <img src={item.icon}></img>),
          ]}
          setValue={setCategory}
        />
        <div className="search_inp">
          <SearchIcon></SearchIcon>
          <input
            placeholder="Trying to find something?"
            ref={inpRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key == "Enter" && search(query)}
          />
          <button onClick={(E) => search(query)}> Search</button>
        </div>
      </div>
      <div className="recents">
        <div className="recent" onClick={(e) => search("Home Decor")}>
          <SearchIcon />
          House for rent
        </div>
        <div className="recent" onClick={(e) => search("Boat")}>
          <SearchIcon />
          Car for lease
        </div>
        <div className="recent" onClick={(e) => search("House")}>
          <SearchIcon />
          Vacation rental
        </div>
        <div className="recent" onClick={(e) => search("Heavy Machines")}>
          <SearchIcon />
          Heavy Machinery
        </div>
      </div>
    </div>
  );
}

export default Search;
