import React from "react";
import Header from "../DefaultLayout/Header";
const HeaderOnly = ({ children }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default HeaderOnly;
