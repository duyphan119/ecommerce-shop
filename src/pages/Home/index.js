import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import TitleComponent from "../../components/Common/TitleComponent";
import Product from "../../components/Product";
import { configAxiosResponse } from "../../config/configAxios";
import { API_PRODUCT_URL, BEST_SELLER_PRODUCTS_PREVIEW } from "../../constants";
import "./Home.scss";
const Home = () => {
  const [bestSellerProducts, setBestSellerProducts] = useState();
  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}?type=best-seller&limit=${BEST_SELLER_PRODUCTS_PREVIEW}`
      );
      setBestSellerProducts(data);
    })();
  }, []);
  return (
    <div className="container">
      <TitleComponent title="Bán chạy nhất" className="text-sm-center" />

      <div className="row">
        {bestSellerProducts &&
          bestSellerProducts.items &&
          bestSellerProducts.items.map((product) => (
            <div
              className="col-6 col-sm-6 col-md-4 col-lg-3 col-xl-2 my-1"
              key={product.slug}
            >
              <Product product={product} />
            </div>
          ))}
        <div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
          <div className="text-center my-2">
            <Link to="/" className="btn btn-primary">
              Xem thêm
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
