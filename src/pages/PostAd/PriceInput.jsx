import * as React from "react";
import "./PriceInput.css";
import { PriceOptions } from "../../utils/constants";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFormData } from "../../store/adSlice";

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
}) {
  const [country, setCountry] = useLocalStorage("country", null);
  const dispatch = useDispatch();

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
          Indefinite payments
        </div>
        {state == "total" && (
          <div
            style={{
              height: "16px",
              borderLeft: "1px solid #1113",
              marginBottom: "2px",
            }}
          ></div>
        )}
        <div
          className={"type" + (state == "definite" ? " selected" : "")}
          onClick={(e) => {
            setState("definite");
            reset();
          }}
        >
          Definite installments
        </div>
        {state == "indefinite" && (
          <div
            style={{
              height: "16px",
              borderLeft: "1px solid #1113",
              marginBottom: "2px",
            }}
          ></div>
        )}
        <div
          className={"type" + (state == "total" ? " selected" : "")}
          onClick={(e) => {
            setState("total");
            reset();
          }}
        >
          Total amount
        </div>
      </div>
      <div className="custom_price_input">
        <div style={{ padding: "10px" }} aria-label="menu" className="symbol">
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
            {PriceOptions.map((option) => (
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
    </div>
  );
}
