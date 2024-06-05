import React from "react";
import Header from "../../components_mobile/Header";
import Footer from "../../components_mobile/Footer";
import "./index.css";

export default function MobileLayout({
  children,
  showHeader = true,
  showFooter = true,
  hidden = false,
  className = "",
}) {
  return (
    <div className={className} style={hidden ? { display: "none" } : null}>
      {className && <div className="bg"></div>}
      {/* <Header /> */}
      {showHeader && <Header />}
      <div className="main_content">{children}</div>
      {showFooter && <Footer />}
    </div>
  );
}
