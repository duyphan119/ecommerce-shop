import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import "./DefaultLayout.scss";

const DefaultLayout = ({ children }) => {
  return (
    <div className="default-layout d-flex flex-column ">
      <Header />
      <div style={{ flex: 1 }}>{children}</div>
      <Footer />
    </div>
  );
};

export default DefaultLayout;
