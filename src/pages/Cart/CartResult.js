import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Checkbox } from "../../components/Common/Input";
import { configAxiosAll } from "../../config/configAxios";
import { API_CART_ITEM_URL } from "../../constants";
import { getSelectedCartItems, removeCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { formatThousandDigits } from "../../utils";

const CartResult = ({ cart }) => {
  const user = useSelector((state) => state.auth.currentUser);
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );

  const dispatch = useDispatch();

  function handleCheck(e) {
    if (e.target.checked) {
      dispatch(getSelectedCartItems(cart));
    } else {
      dispatch(
        getSelectedCartItems({
          items: [],
          total: 0,
          count: 0,
        })
      );
    }
  }

  async function handleRemoveSelectedCartItems() {
    if (selectedCartItems.items.length > 0) {
      await configAxiosAll(user, dispatch).delete(`${API_CART_ITEM_URL}`, {
        data: selectedCartItems.items.map((el) => el.id),
      });
      dispatch(removeCartItems(selectedCartItems.items));
      dispatch(
        getSelectedCartItems({
          items: [],
          count: 0,
          total: 0,
        })
      );
    }
  }

  return (
    <div className="d-flex justify-content-between align-items-center">
      <div className="">
        <Checkbox
          label="Chọn tất cả"
          fields={{
            id: "cart-result",
          }}
          onChange={handleCheck}
        />

        <button
          type="button"
          disabled={selectedCartItems.items.length === 0}
          className="btn btn-sm btn-outline-danger ml-1"
          onClick={handleRemoveSelectedCartItems}
        >
          Xoá
        </button>
      </div>
      <div className="d-flex align-items-center">
        <div className="">
          <strong>Tổng tiền:</strong>{" "}
          <span>{formatThousandDigits(selectedCartItems.total)}đ</span>
        </div>
        <div className="">
          {selectedCartItems.items.length === 0 ? (
            <button
              className="btn btn-primary ml-2"
              type="button"
              onClick={() => {
                dispatch(
                  showToastMessage({
                    type: "info",
                    text: "Vui lòng chọn sản phẩm cần thanh toán",
                    isOpen: true,
                  })
                );
              }}
            >
              Thanh toán
            </button>
          ) : (
            <Link to={`/checkout`} className="btn btn-primary ml-2">
              Thanh toán
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default CartResult;
