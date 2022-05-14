import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { configAxiosAll, configAxiosResponse } from "../../config/configAxios";
import { API_CART_ITEM_URL, API_PRODUCT_URL } from "../../constants";
import { formatThousandDigits } from "../../utils";
import { showToastMessage } from "../../redux/toastSlice";
import { addToCart } from "../../redux/cartSlice";
import "./ProductDetail.scss";

const ProductDetail = () => {
  const { product_slug } = useParams();
  const [product, setProduct] = useState();
  const [indexColor, setIndexColor] = useState(0);
  const [indexSize, setIndexSize] = useState(0);
  const [indexImage, setIndexImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [msgQuantity, setMsgQuantity] = useState("");

  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    (async function () {
      const data = await configAxiosResponse().get(
        `${API_PRODUCT_URL}/slug/${product_slug}`
      );
      setProduct(data);
    })();
  }, [product_slug]);

  function handleChangeSlide(newIndexImage) {
    let length = product.colors[indexColor].images.length;
    if (newIndexImage < 0) {
      setIndexImage(length - 1);
    } else if (newIndexImage === length) {
      setIndexImage(0);
    } else {
      setIndexImage(newIndexImage);
    }
  }

  async function handleAddToCart() {
    if (
      quantity > 0 &&
      quantity > product.colors[indexColor].sizes[indexSize].amount
    ) {
      dispatch(
        showToastMessage({
          text: "Số lượng không hợp lệ",
          type: "info",
          isOpen: true,
        })
      );
    } else {
      try {
        if (user) {
          const data = await configAxiosAll(user, dispatch).post(
            `${API_CART_ITEM_URL}`,
            {
              product_detail_id:
                product.colors[indexColor].sizes[indexSize].detail_id,
              quantity,
              product_price: product.price,
              cart_id: user.cart.id,
            }
          );
          console.log(data);
          dispatch(addToCart(data));
          dispatch(
            showToastMessage({
              type: "success",
              text: "Thêm thành công",
              isOpen: true,
            })
          );
        } else {
          dispatch(
            showToastMessage({
              type: "error",
              text: "Thêm thất bại",
              isOpen: true,
            })
          );
        }
      } catch (error) {
        console.log(error);
        dispatch(
          showToastMessage({
            type: "error",
            text: "Thêm thất bại",
            isOpen: true,
          })
        );
      }
    }
  }

  function handleChangeQuantity(value) {
    try {
      let newQuantity = parseInt(value);
      if (isNaN(newQuantity)) {
        newQuantity = 1;
      } else {
        if (newQuantity === 0) {
          newQuantity = 1;
        } else if (
          newQuantity > product.colors[indexColor].sizes[indexSize].amount
        ) {
          setMsgQuantity(
            `Mặt hàng này chỉ còn ${product.colors[indexColor].sizes[indexSize].amount}`
          );
          newQuantity = product.colors[indexColor].sizes[indexSize].amount;
        } else {
          setMsgQuantity("");
        }
      }
      setQuantity(newQuantity);
    } catch (error) {
      setQuantity(1);
    }
  }

  if (!product) return "";
  return (
    <div>
      <div className="container my-2">
        <div className="row">
          <div className="col-5 col-sm-5 col-md-5 col-lg-5">
            <div className="overflow-hidden w-100 position-relative">
              <div
                className="position-absolute d-flex align-items-center justify-content-center product-preview-btn-prev"
                onClick={() => handleChangeSlide(indexImage - 1)}
              >
                <i className="fa fa-chevron-left" aria-hidden="true"></i>
              </div>
              <div
                className="product-images-wrapper"
                style={{ transform: `translateX(${indexImage * -100}%)` }}
              >
                <div className="product-images">
                  {product.colors[indexColor].images.map((image, index) => (
                    <img
                      src={image.url}
                      key={index}
                      className="product-image"
                      alt=""
                    />
                  ))}
                </div>
              </div>
              <div
                className="position-absolute d-flex align-items-center justify-content-center product-preview-btn-next"
                onClick={() => handleChangeSlide(indexImage + 1)}
              >
                <i className="fa fa-chevron-right" aria-hidden="true"></i>
              </div>
              <ul className="position-absolute d-flex align-items-center justify-content-center product-preview-dots">
                {product.colors[indexColor].images.map((image, index) => (
                  <li
                    className={`${indexImage === index ? "active" : ""}`}
                    onClick={() => handleChangeSlide(index)}
                    key={index}
                  ></li>
                ))}
              </ul>
            </div>
          </div>
          <div className="col-7 col-sm-7 col-md-7 col-lg-7">
            <div className="product-name">{product.name}</div>
            <div className="product-price">
              {formatThousandDigits(product.price)}đ
            </div>
            <div className=" mt-2">
              <span className="font-weight-bold">Màu sắc:</span>{" "}
              {product.colors[indexColor].value}
            </div>
            <ul className="d-flex align-items-center">
              {product.colors.map((color, index) => (
                <li
                  className="product-color"
                  key={index}
                  onClick={() => setIndexColor(index)}
                >
                  <span className={`${index === indexColor ? "active" : ""}`}>
                    {color.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-2">
              <span className="font-weight-bold">Kích cỡ: </span>
              {product.colors[indexColor].sizes[indexSize].value}
            </div>
            <ul className="d-flex align-items-center">
              {product.colors[indexColor].sizes.map((size, index) => (
                <li
                  className="product-size"
                  key={index}
                  onClick={() => setIndexSize(index)}
                >
                  <span className={`${index === indexSize ? "active" : ""}`}>
                    {size.value}
                  </span>
                </li>
              ))}
            </ul>
            <div className="product-quantity mt-2">
              <span className="font-weight-bold">Số lượng: {quantity}</span>
            </div>
            <div className="">
              <div className="product-quantity-wrapper d-flex align-items-center">
                <div
                  className="product-quantity-down d-flex align-items-center justify-content-center"
                  onClick={() => handleChangeQuantity(quantity - 1)}
                >
                  <i className="fa fa-minus" aria-hidden="true"></i>
                </div>
                <div className="">
                  <input
                    type="text"
                    value={quantity}
                    onChange={(e) => handleChangeQuantity(e.target.value)}
                  />
                </div>
                <div
                  className="product-quantity-up d-flex align-items-center justify-content-center"
                  onClick={() => handleChangeQuantity(quantity + 1)}
                >
                  <i className="fa fa-plus" aria-hidden="true"></i>
                </div>
              </div>
            </div>
            {msgQuantity !== "" && (
              <span className="product-msg-quantity">{msgQuantity}</span>
            )}
            <div className="d-flex justify-content-between product-actions my-2">
              <button
                type="button"
                className=" btn btn-lg btn-outline-primary"
                onClick={() => handleAddToCart()}
              >
                Thêm vào giỏ hàng
              </button>
              <button type="button" className="btn btn-lg btn-primary">
                Mua ngay
              </button>
            </div>
            <div className="font-weight-bold mt-2">Đặc điểm sản phẩm</div>
            <div
              className="product-description"
              dangerouslySetInnerHTML={{ __html: product.description }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
