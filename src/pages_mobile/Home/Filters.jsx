import React, { useRef, useState } from "react";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import ApartmentOutlinedIcon from "@mui/icons-material/ApartmentOutlined";
import ConstructionOutlinedIcon from "@mui/icons-material/ConstructionOutlined";
import { useNavigate } from "react-router-dom";
import { newSearch } from "../../store/searchSlice";
import { useDispatch, useSelector } from "react-redux";
import DriveEtaOutlinedIcon from "@mui/icons-material/DriveEtaOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import AgricultureOutlinedIcon from "@mui/icons-material/AgricultureOutlined";
import ConnectingAirportsOutlinedIcon from "@mui/icons-material/ConnectingAirportsOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import PeopleOutlineOutlinedIcon from "@mui/icons-material/PeopleOutlineOutlined";
import "./Filters.css";

const getCategoryIcon = (category) => {
  switch (category) {
    case "Real Estate":
      return <ApartmentOutlinedIcon />;
    case "Car, Truck, RVs & Vehicles":
      return <DriveEtaOutlinedIcon />;
    case "Services":
      return <ConstructionOutlinedIcon />;
    case "Business & Industries":
      return <BusinessOutlinedIcon />;
    case "Farm & Heavy Duty Equipment":
      return <AgricultureOutlinedIcon />;
    case "Travel, Vacation & Party Space":
      return <ConnectingAirportsOutlinedIcon />;
    case "Daily Rentals":
      return <ShoppingCartOutlinedIcon />;
    case "Community & Sharing":
      return <PeopleOutlineOutlinedIcon />;
    default:
      return <SearchOutlinedIcon />;
  }
};

export default function Filters() {
  let category = "All Categories";
  const [query, setQuery] = useState("");
  const categories = useSelector((state) => state.categories);

  const inpRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  function search(query) {
    dispatch(newSearch({ query: query.trim(), category }));

    navigate("/search");
  }

  return (
    <div className="mobile_filters">
      <div className="search_box">
        <div className="icon_cont">
          <SearchOutlinedIcon className="search_icon" />
        </div>
        <input
          placeholder="Finding Something?"
          className="search_input_field"
          value={query}
          ref={inpRef}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key == "Enter" && search(query)}
        />
      </div>

      <div className="categories_row">
        {categories.map((category) => (
          <div
            key={category.name}
            onClick={() => {
              dispatch(newSearch({ category: category.name, query: "" }));
              navigate("/search", {
                state: { category: category.name },
              });
            }}
            className={"btn_cont"}
          >
            <div className="fixed_cat">
              <div className="cat_icon_cont">
                {getCategoryIcon(category.name)}
              </div>
              <p className="category_title">{category.name}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
