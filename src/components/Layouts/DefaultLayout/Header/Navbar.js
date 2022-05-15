import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  configAxiosAll,
  configAxiosResponse,
} from "../../../../config/configAxios";
import { API_AUTH_URL, API_CART_URL } from "../../../../constants";
import { logout } from "../../../../redux/authSlice";
import { getCart } from "../../../../redux/cartSlice";
import CartNavItem from "./CartNavItem";
import CategoryNavItem from "./CategoryNavItem";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) {
      (async function () {
        const data = await configAxiosAll(user, dispatch).get(
          `${API_CART_URL}/user/${user.id}`
        );
        dispatch(getCart(data));
      })();
    }
  }, [user, dispatch]);

  function showNavItems() {
    let arr = [];
    if (user) {
      arr.push(
        <li className="nav-item  d-lg-none d-block" key="1">
          <Link className="nav-link text-light" to="/account">
            Thông tin tài khoản
          </Link>
        </li>
      );
      if (user.role && user.role.role === "admin") {
        return (
          <>
            <li className="nav-item  d-lg-none d-block" key="2">
              <Link className="nav-link text-light" to="/dashboard">
                Bảng điều khiển
              </Link>
            </li>
          </>
        );
      }
      arr.push(
        <li
          className="nav-item text-light d-lg-none d-block"
          key="3"
          onClick={handleLogout}
        >
          Đăng xuất
        </li>
      );
    } else {
      arr = [
        <li className="nav-item  d-lg-none d-block" key="1">
          <Link className="nav-link text-light" to="/login">
            Đăng nhập
          </Link>
        </li>,
        <li className="nav-item  d-lg-none d-block" key="2">
          <Link className="nav-link text-light" to="/register">
            Đăng ký
          </Link>
        </li>,
      ];
    }
    return arr;
  }

  function showDropdownAccount() {
    if (user) {
      if (user.role.role === "admin") {
        return (
          <div className="dropdown-menu" aria-labelledby="navbarDropdown">
            <Link className="dropdown-item" to="/">
              Thông tin tài khoản
            </Link>
            <Link className="dropdown-item" to="/dashboard">
              Bảng điều khiển
            </Link>
            <div className="dropdown-divider"></div>
            <div className="dropdown-item" onClick={handleLogout}>
              Đăng xuất
            </div>
          </div>
        );
      }
      return (
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/">
            Thông tin tài khoản
          </Link>
          <Link className="dropdown-item" to="/">
            Đơn hàng của tôi
          </Link>
          <div className="dropdown-divider"></div>
          <div className="dropdown-item" onClick={handleLogout}>
            Đăng xuất
          </div>
        </div>
      );
    } else {
      return (
        <div className="dropdown-menu" aria-labelledby="navbarDropdown">
          <Link className="dropdown-item" to="/login">
            Đăng nhập
          </Link>
          <Link className="dropdown-item" to="/register">
            Đăng ký
          </Link>
        </div>
      );
    }
  }

  async function handleLogout() {
    await configAxiosResponse().get(`${API_AUTH_URL}/logout`);
    dispatch(logout());
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-primary">
      <div className="container">
        <Link className="navbar-brand text-light" to="/">
          ESHOP
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <CategoryNavItem />
          <SearchBar />
          <ul className="navbar-nav">
            <CartNavItem />
            {showNavItems()}
            <li className="nav-item dropdown">
              <div
                className="nav-link d-lg-block d-none  text-light dropdown-toggle cursor-pointer"
                id="navbarDropdown"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Tài khoản
              </div>
              {showDropdownAccount()}
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
