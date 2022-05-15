import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import "./EmptyCart.scss";

const EmptyCart = () => {
  const user = useSelector((state) => state.auth.currentUser);
  const location = useLocation();
  return (
    <div className="d-flex justify-content-center align-items-center flex-column">
      <div className="empty-cart-img"></div>
      <div className="">Giỏ hàng của bạn đang trống</div>
      {user && (
        <div className="d-flex">
          <Link
            to="/register"
            className="btn btn-outline-primary btn-sm my-1 mx-1"
          >
            Đăng ký
          </Link>
          <Link
            to="/login"
            className="btn btn-outline-primary btn-sm my-1 mx-1"
          >
            Đăng nhập
          </Link>
        </div>
      )}
      {location.pathname !== "/" ? (
        <Link to="/" className="btn btn-primary btn-sm my-1">
          Quay về trang chủ
        </Link>
      ) : (
        <Link to="/cart" className="btn btn-primary btn-sm my-1">
          Đi đến giỏ hàng
        </Link>
      )}
    </div>
  );
};

export default EmptyCart;
