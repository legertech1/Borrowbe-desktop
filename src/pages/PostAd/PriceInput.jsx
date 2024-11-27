import * as React from "react";
import "./PriceInput.css";
import { PriceOptions } from "../../utils/constants";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/adSlice";
import { useMemo } from "react";

export default function PriceInput({
  price,
  setPrice,
  installments,
  setInstallments,
  setTerm,
  term,
  style,
  reset,
  state,
  setState,
  type,
}) {
  const [country, setCountry] = useLocalStorage("country", null);
  const dispatch = useDispatch();

  const options = useMemo(() => {
    if (type == "Service") {
      return PriceOptions.filter((o) => o != "Year");
    } else if (type == "Rent") {
      return PriceOptions.filter((o) => o != "Hour");
    } else if (type == "Lease" || type == "Finance")
      return PriceOptions.filter((o) => o != "Hour" && o != "Day");
    return PriceOptions.filter((o) => o != "Hour");
  }, [type]);

  return (
    <div className="price_controls" style={style}>
      {" "}
      <div className="type_selection">
        <div
          className={"type" + (state == "indefinite" ? " selected" : "")}
          onClick={(e) => {
            setState("indefinite");
            reset();
          }}
        >
          Recurring Payments
        </div>

        <div
          className={"type" + (state == "definite" ? " selected" : "")}
          onClick={(e) => {
            setState("definite");
            reset();
          }}
        >
          Installments
        </div>

        <div
          className={"type" + (state == "total" ? " selected" : "")}
          onClick={(e) => {
            setState("total");
            reset();
          }}
        >
          Total Amount
        </div>
      </div>
      <div className="custom_price_input">
        <div
          style={{ marginRight: "6px", position: "relative", top: "2px" }}
          aria-label="menu"
          className="symbol"
        >
          {country}$
        </div>
        <div
          style={{
            height: "28px",
            borderLeft: "1px solid #1113",
          }}
        ></div>
        <input
          value={price}
          placeholder={"Amount"}
          onChange={setPrice}
          className="price_input_field pricing"
          defaultValue={price}
        />
        {state == "definite" && (
          <>
            {" "}
            <div
              style={{
                height: "28px",
                borderLeft: "1px solid #1113",
              }}
            ></div>
            <input
              style={{
                color: "#555",
              }}
              value={installments}
              placeholder={"Installments"}
              onChange={setInstallments}
              className="price_input_field pricing"
              defaultValue={installments}
            />
          </>
        )}
        {state != "total" && (
          <div className="option_container">
            {options.map((option) => (
              <div
                onClick={() => setTerm(option)}
                className={`price_option ${
                  option === term && "option_selected"
                }`}
              >
                {option == "Day" ? "Daily" : option + "ly"}
              </div>
            ))}
          </div>
        )}
      </div>
      <p className="info"> $0 will be shown as Free</p>
    </div>
  );
}
