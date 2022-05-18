import React from "react";

const EmptyProductList = () => {
  return (
    <div
      className=" my-1 px-1"
      style={{ fontSize: "14px", color: "var(--danger)" }}
    >
      Không có sản phẩm tương ứng
    </div>
  );
};

export default EmptyProductList;
