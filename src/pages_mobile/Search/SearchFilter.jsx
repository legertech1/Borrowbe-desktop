import React, { useEffect, useState } from "react";
import "./SearchFilter.css";
import TuneIcon from "@mui/icons-material/Tune";
import Dropdown from "../../components_mobile/shared/Dropdown";

export default function SearchFilter({
  filters,
  setFilters,
  category,
  setSearchFilters,
  setShowFilters,
}) {
  return (
    <div className="mobile_searches">
      <div className="filter-heading">
        <TuneIcon className="filter-icon" />
        Filters
      </div>
      <div className="cont">
        <div className="filter-prize">
          <p className="label">Min. price:</p>
          <input
            type="number"
            value={filters?.price?.$gt}
            // min={0}
            onChange={(e) => {
              setFilters({
                ...filters,
                price: {
                  ...filters.price,
                  $gt: e.target.value,
                },
              });
            }}
          />
        </div>

        <div className="filter-slider">
          <input
            type="range"
            // min="0"
            // max="1000
            value={filters?.price?.$gt}
            onChange={(e) => {
              setFilters({
                ...filters,
                price: {
                  ...filters.price,
                  $gt: Number(e.target.value),
                },
              });
            }}
          />
        </div>
      </div>
      <div className="cont">
        <div className="filter-prize">
          <p className="label">Max. price:</p>
          <input
            type="number"
            value={filters?.price?.$lt}
            onChange={(e) =>
              setFilters({
                ...filters,
                price: {
                  ...filters.price,
                  $lt: e.target.value,
                },
              })
            }
          />
        </div>

        <div className="filter-slider">
          <input
            type="range"
            min="0"
            max="99999"
            value={filters?.price?.$lt}
            onChange={(e) =>
              setFilters({
                ...filters,
                price: {
                  ...filters.price,
                  $lt: Number(e.target.value),
                },
              })
            }
          />
        </div>
      </div>
      <div className="term_cont">
        <div className="field">
          <p className="label">Rent Term:</p>
        </div>
        <div className="terms">
          <div
            onClick={(e) =>
              setFilters({
                ...filters,
                term: filters.term == "Day" ? null : "Day",
              })
            }
            className={"rent-terms" + (filters?.term == "Day" ? " active" : "")}
          >
            Per Day
          </div>

          <div
            onClick={(e) =>
              setFilters({
                ...filters,
                term: filters.term == "Month" ? null : "Month",
              })
            }
            className={
              "rent-terms" + (filters?.term == "Month" ? " active" : "")
            }
          >
            Per Month
          </div>

          <div
            onClick={(e) =>
              setFilters({
                ...filters,
                term: filters.term == "Year" ? null : "Year",
              })
            }
            className={
              "rent-terms" + (filters?.term == "Year" ? " active" : "")
            }
          >
            Per Year
          </div>
        </div>
      </div>
      {category && (
        <div className="filter">
          <div className="field">
            <p className="label">Sub Category:</p>
          </div>
          <Dropdown
            value={filters["meta.subCategory"] || "Any"}
            array={["Any", ...category?.subCategories.map((s) => s.name)]}
            setValue={(v) =>
              setFilters({
                ...filters,
                ["meta.subCategory"]: v,
              })
            }
          />
        </div>
      )}
      <div className="reset-apply-btn">
        <button
          className="reset"
          onClick={(e) => {
            setSearchFilters({
              price: {
                $lt: 1000000,
                $gt: -1,
              },
            });

            setFilters({
              price: {
                $lt: 1000000,
                $gt: -1,
              },
            });
          }}
        >
          Reset
        </button>
        <button
          className="apply"
          onClick={(e) => {
            if (filters.term == null) delete filters.term;
            if (filters["meta.subCategory"] == "Any")
              delete filters["meta.subCategory"];
            setSearchFilters(filters);
            setShowFilters(false);
          }}
          style={{ backgroundColor: "#2196f3 ", color: "white" }}
        >
          Apply
        </button>
      </div>
    </div>
  );
}
