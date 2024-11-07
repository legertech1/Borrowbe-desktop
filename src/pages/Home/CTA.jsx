import React from "react";
import "./CTA.css";
import { useNavigate } from "react-router-dom";

function CTA() {
  const navigate = useNavigate();
  return (
    <div className="cta">
      <div className="cta_main">
        <h1>Sign Up Now and Post Your Ad for Free!</h1>
        <p>
          Discover more listings, connect faster, and reach the right people.
          Join BorrowBe today and get your ad noticed!
        </p>
      </div>
      <button className="btn_classic" onClick={() => navigate("/register")}>
        Sign Up and Get Started!
      </button>
    </div>
  );
}

export default CTA;
