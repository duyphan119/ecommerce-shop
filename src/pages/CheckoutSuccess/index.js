import { Link } from "react-router-dom";
import "./CheckoutSuccess.scss";
const CheckoutSuccess = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center checkout-success-page">
      <div className="checkout-success-icon"></div>
      <div className="text-success font-weight-bold checkout-success-text">
        Bạn đã đặt hàng thành công
      </div>
      <div className="checkout-success-description mb-2">
        Đơn hàng của bạn đang chờ được xử lý
      </div>
      <Link to="/" className="btn btn-primary">
        Tiếp tục mua sắm
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
