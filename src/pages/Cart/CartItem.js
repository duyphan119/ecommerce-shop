import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Checkbox } from "../../components/Common/Input";
import { formatThousandDigits, getThumbnailCartItem } from "../../utils";
import {
  deSelectCartItem,
  removeCartItem,
  selectCartItem,
  updateCart,
} from "../../redux/cartSlice";
import { configAxiosAll } from "../../config/configAxios";
import { API_CART_ITEM_URL } from "../../constants";

const CartItem = ({ item, index }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

  const dispatch = useDispatch();

  const isChecked =
    selectedCartItems.items.findIndex((cartItem) => cartItem.id === item.id) !==
    -1;
  function handleCheck(e) {
    if (e.target.checked) {
      dispatch(selectCartItem(item));
    } else {
      dispatch(deSelectCartItem(item));
    }
  }

  async function handleChangeQuantity(newQuantity) {
    if (newQuantity > 0 && newQuantity <= item.detail.amount) {
      const data = await configAxiosAll(user, dispatch).put(
        `${API_CART_ITEM_URL}`,
        {
          id: item.id,
          cart_id: user.cart.id,
          product_detail_id: item.detail.id,
          quantity: newQuantity,
        }
      );
      dispatch(updateCart(data));
      if (isChecked) {
        dispatch(selectCartItem(data));
      } else {
        dispatch(deSelectCartItem(data));
      }
    }
  }

  async function handleRemoveCartItem() {
    await configAxiosAll(user, dispatch).delete(
      `${API_CART_ITEM_URL}/${item.id}`
    );
    dispatch(removeCartItem(item));
    if (isChecked) {
      dispatch(deSelectCartItem(item));
    }
  }

  return (
    <div className="d-flex cart-item-row justify-content-between align-items-center">
      <label htmlFor={item.id} className="cart-item-cell">
        <Checkbox
          fields={{
            id: `cart-item-${index + 1}`,
            checked: isChecked,
          }}
          onChange={handleCheck}
        />
      </label>
      <div className="cart-item-cell justify-content-start px-1 py-2 flex-1 d-flex">
        <Link
          to={`/${item.detail.product.slug}`}
          className="cart-item-img mr-1"
        >
          <img src={getThumbnailCartItem(item)} alt="" />
        </Link>
        <div className="">
          <Link to={`/${item.detail.product.slug}`} className="cart-item-name">
            {item.detail.product.name}
          </Link>
          <div className="cart-item-detail">
            {item.detail.color.value}/{item.detail.size.value}
          </div>
          <div className="text-primary">
            {formatThousandDigits(item.detail.product.price)}đ
          </div>
        </div>
      </div>
      <div className="cart-item-cell flex-column">
        <div className="cart-item-quantity-value">{item.quantity}</div>
        <div className="cart-item-quantity-actions d-flex">
          <button
            className="btn d-flex align-items-center justify-content-center"
            onClick={() => handleChangeQuantity(item.quantity - 1)}
          >
            -
          </button>
          <button
            className="btn d-flex align-items-center justify-content-center"
            onClick={() => handleChangeQuantity(item.quantity + 1)}
          >
            +
          </button>
        </div>
      </div>
      <div className="cart-item-cell text-primary">
        {formatThousandDigits(item.detail.product.price * item.quantity)}đ
      </div>
      <div className="cart-item-cell">
        <button
          type="button"
          className="btn btn-sm btn-danger"
          onClick={handleRemoveCartItem}
        >
          <i className="fa fa-trash" aria-hidden="true"></i>
        </button>
      </div>
    </div>
  );
};

export default CartItem;
