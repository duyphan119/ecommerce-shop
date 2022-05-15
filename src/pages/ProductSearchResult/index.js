import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { isShowCollapse, isShowLoadMore } from "../../components/Common/Button";
import TitleComponent from "../../components/Common/TitleComponent";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, PRODUCTS_PER_PAGE } from "../../constants";

const ProductSearchResult = () => {
  const [searchResult, setSearchResult] = useState();
  const [limit, setLimit] = useState(PRODUCTS_PER_PAGE);

  const [queryParams] = useSearchParams();
  const q = queryParams.get("q");

  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/search?include=true&q=${q}&limit=${limit}`
      );
      console.log(data);
      setSearchResult(data);
    })();
  }, [q, limit]);

  return (
    <div className="container">
      <TitleComponent title={`KẾT QUẢ TÌM KIẾM VỚI TỪ KHOÁ "${q}"`} />
      <div className="row">
        {searchResult &&
          searchResult.items &&
          searchResult.items.map((product) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-1"
              key={product.slug}
            >
              <Product product={product} />
            </div>
          ))}
      </div>
      {isShowLoadMore(searchResult, PRODUCTS_PER_PAGE, () => {
        setLimit(limit + PRODUCTS_PER_PAGE);
      })}
      {isShowCollapse(searchResult, PRODUCTS_PER_PAGE, () => {
        setLimit(PRODUCTS_PER_PAGE);
      })}
    </div>
  );
};

export default ProductSearchResult;
