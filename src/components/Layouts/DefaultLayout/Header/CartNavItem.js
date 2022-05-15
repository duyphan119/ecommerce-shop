import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import CartNotify from "./CartNotify";

const CartNavItem = () => {
  const cart = useSelector((state) => state.cart.cart);
  return (
    <li className="nav-item-cart nav-item position-relative">
      <Link className="nav-link text-light" to="/cart">
        Giỏ hàng (
        {cart && cart.items && cart.items.length ? cart.items.length : 0})
      </Link>
      <CartNotify />
    </li>
  );
};

export default CartNavItem;
