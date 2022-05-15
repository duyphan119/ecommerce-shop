import { useEffect, useState } from "react";
import { ButtonLink } from "../../components/Common/Button";
import TitleComponent from "../../components/Common/TitleComponent";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, BEST_SELLER_PRODUCTS_PREVIEW } from "../../constants";
import "./Home.scss";
const Home = () => {
  const [bestSellerProduct, setBestSellerProduct] = useState();
  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}?type=best-seller&limit=${BEST_SELLER_PRODUCTS_PREVIEW}`
      );
      setBestSellerProduct(data);
    })();
  }, []);
  return (
    <div className="container">
      <TitleComponent title="Bán chạy nhất" className="text-sm-center" />

      <div className="row">
        {bestSellerProduct &&
          bestSellerProduct.items &&
          bestSellerProduct.items.map((product) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-1"
              key={product.slug}
            >
              <Product product={product} />
            </div>
          ))}
      </div>
      <ButtonLink link="/" label="Xem thêm" />
    </div>
  );
};

export default Home;
