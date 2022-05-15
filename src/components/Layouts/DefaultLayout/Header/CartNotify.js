import { Link } from "react-router-dom";
import { formatThousandDigits, getThumbnailCartItem } from "../../../../utils";
import { useDispatch, useSelector } from "react-redux";
import { configAxiosAll } from "../../../../config/configAxios";
import { API_CART_ITEM_URL } from "../../../../constants";
import { removeCartItem } from "../../../../redux/cartSlice";
import { showToastMessage } from "../../../../redux/toastSlice";
import EmptyCart from "../../../Common/EmptyCart";
const CartNotify = () => {
  const cart = useSelector((state) => state.cart.cart);
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();
  async function handleDeleteItem(item) {
    try {
      await configAxiosAll(user, dispatch).delete(
        `${API_CART_ITEM_URL}/${item.id}`
      );
      dispatch(removeCartItem(item.id));
      dispatch(
        showToastMessage({
          type: "success",
          text: "Xoá thành công",
          isOpen: true,
        })
      );
    } catch (error) {
      console.log(error);
      dispatch(
        showToastMessage({
          type: "error",
          text: "Xoá thất bại",
          isOpen: true,
        })
      );
    }
  }
  return (
    <div className="position-absolute cart-notify">
      {cart && cart.items.length > 0 ? (
        <>
          <ul className=" cart-notify-items custom-scrollbar">
            {cart.items.map((item) => (
              <li className="d-flex cart-notify-item">
                <Link to="/" className="cart-notify-item-img-link">
                  <img
                    src={getThumbnailCartItem(item)}
                    width="60px"
                    height="70px"
                    alt=""
                  />
                </Link>
                <div className="cart-notify-item-right-wrapper">
                  <Link
                    to="/"
                    className="three-dot three-dot-2 cart-notify-item-name"
                  >
                    {item.detail.product.name}
                  </Link>
                  <div className=" d-flex justify-content-between mt-1">
                    <span className="cart-notify-item-price">
                      {formatThousandDigits(item.product_price)}đ
                    </span>
                    <span className="cart-notify-item-detail">
                      {item.detail.color.value} / {item.detail.size.value}
                    </span>
                    <div
                      type="button"
                      className="cart-notify-item-action"
                      onClick={() => handleDeleteItem(item)}
                    >
                      <i className="fa fa-trash" aria-hidden="true"></i>
                    </div>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="text-center">
            <button type="button" className="btn btn-sm btn-primary">
              Đi đến giỏ hàng
            </button>
          </div>
        </>
      ) : (
        <>
          <EmptyCart />
        </>
      )}
    </div>
  );
};

export default CartNotify;
