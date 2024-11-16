import React from "react";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import "./Stepper.css";

const Stepper = ({ steps, current, onClick }) => {
  return (
    <div className="steps">
      {steps.map((step, index) => (
        <div
          className={"step" + (index + 1 == current ? " selected" : "")}
          style={{ zIndex: steps.length - index }}
          onClick={() => onClick(index + 1)}
        >
          <span>{index + 1}</span>
          {step}
          <div className="bg"></div>
        </div>
      ))}
    </div>
  );
};

export default Stepper;
