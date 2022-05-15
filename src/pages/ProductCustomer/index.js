import React, { useEffect, useState } from "react";
import { isShowLoadMore, isShowCollapse } from "../../components/Common/Button";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, PRODUCTS_PER_PAGE } from "../../constants";
const ProductCustomer = ({ genderCategory }) => {
  const [product, setProduct] = useState();
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);
  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/gender/${genderCategory.slug}?limit=${limit}`
      );
      setProduct(data);
    })();
  }, [genderCategory.slug, limit]);
  return (
    <div className="container">
      <div className="row">
        {product &&
          product.items &&
          product.items.map((item) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-1"
              key={item.slug}
            >
              <Product product={item} />
            </div>
          ))}
      </div>
      {isShowLoadMore(product, PRODUCTS_PER_PAGE, () => {
        setLimit(limit + PRODUCTS_PER_PAGE);
      })}
      {isShowCollapse(product, PRODUCTS_PER_PAGE, () => {
        setLimit(PRODUCTS_PER_PAGE);
      })}
    </div>
  );
};

export default ProductCustomer;
