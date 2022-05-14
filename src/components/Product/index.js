import { Link } from "react-router-dom";
import { formatThousandDigits, getThumbnailProduct } from "../../utils";
import "./Product.scss";
const Product = ({ product }) => {
  return (
    <>
      <div className="card">
        <Link to={`/product/${product.slug}`} className="card-link">
          <img
            src={getThumbnailProduct(product)}
            alt=""
            className="card-img-top"
          />
        </Link>
        <div className="card-body p-2">
          <div className="card-text">
            <Link
              to={`/product/${product.slug}`}
              style={{ fontSize: "14px" }}
              className="three-dot three-dot-2 font-weight-bold"
            >
              {product.name}
            </Link>
            <span style={{ fontSize: "14px" }} className="text-primary">
              {formatThousandDigits(product.price)}đ
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
