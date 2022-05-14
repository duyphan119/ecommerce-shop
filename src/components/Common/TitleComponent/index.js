import React from "react";

const TitleComponent = ({ title, className }) => {
  return (
    <div
      className={`text-uppercase my-2 ${className ? className : ""}`}
      style={{ fontSize: "20px" }}
    >
      {title}
    </div>
  );
};

export default TitleComponent;
