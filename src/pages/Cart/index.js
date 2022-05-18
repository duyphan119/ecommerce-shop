import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import EmptyCart from "../../components/Common/EmptyCart";
import TitleComponent from "../../components/Common/TitleComponent";
import { getSelectedCartItems } from "../../redux/cartSlice";
import "./Cart.scss";
import CartItem from "./CartItem";
import CartResult from "./CartResult";
const Cart = () => {
  const cart = useSelector((state) => state.cart.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      getSelectedCartItems({
        items: [],
        total: 0,
        count: 0,
      })
    );
  }, [dispatch]);

  if (!cart) return "";
  return (
    <div className="cart container bg-white">
      <TitleComponent title="Giỏ hàng" />
      <div className="py-1">
        {cart && cart.items && cart.items.length > 0 ? (
          <>
            <div className="row align-items-center">
              <div className="col-6 col-sm-6 col-md-6 col-lg-6">
                {cart && cart.items && cart.items.length} sản phẩm
              </div>
              <div className="col-6 col-sm-6 col-md-6 col-lg-6 text-right my-2">
                <Link to={`/`} className="btn btn-sm btn-info">
                  Tiếp tục mua hàng
                </Link>
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <div className="d-flex justify-content-between cart-item-row">
                  <div className="cart-item-cell"></div>
                  <div className="cart-item-cell justify-content-start flex-1">
                    Sản phẩm
                  </div>
                  <div className="cart-item-cell">Số lượng</div>
                  <div className="cart-item-cell">Thành tiền</div>
                  <div className="cart-item-cell"></div>
                </div>
                {cart.items &&
                  cart.items.length > 0 &&
                  cart.items.map((item, index) => (
                    <CartItem item={item} index={index} key={index} />
                  ))}
              </div>
            </div>
            <div className="row">
              <div className="col-12 col-sm-12 col-md-12 col-lg-12">
                <CartResult cart={cart} />
              </div>
            </div>
          </>
        ) : (
          <>
            <EmptyCart />
          </>
        )}
      </div>
    </div>
  );
};

export default Cart;
