import React, { useEffect } from "react";
import Navbar from "../../components/Navbar";
import AdForm from "./AdForm";
import { useLocation } from "react-router-dom";
import "./index.css";
import Footer from "../../components/Footer";

function PostAd({ edit }) {
  const { state } = useLocation();
  const ad = state?.ad;
  useEffect(() => {
    console.log("///");
    setTimeout(() => window.scrollTo(0, 0), 0);
  }, []);
  return (
    <>
      <div className="post_ad_page">
        <Navbar white={true} topOnly={true} noPostAd={true}></Navbar>

        <AdForm ad={ad} edit={edit} />
      </div>

      <Footer></Footer>
    </>
  );
}

export default PostAd;
