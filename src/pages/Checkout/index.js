import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
import Input from "../../components/Common/Input";
import Select from "../../components/Common/Select";
import TitleComponent from "../../components/Common/TitleComponent";
import { configAxiosAll } from "../../config/configAxios";
import { API_ORDER_URL, API_PROVINCE_URL } from "../../constants";
import { getSelectedCartItems, removeCartItems } from "../../redux/cartSlice";
import { showToastMessage } from "../../redux/toastSlice";
import { formatThousandDigits } from "../../utils";
const Checkout = () => {
  const selectedCartItems = useSelector(
    (state) => state.cart.selectedCartItems
  );
  const user = useSelector((state) => state.auth.currentUser);
  const cart = useSelector((state) => state.cart.cart);

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const [addressNo, setAddressNo] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [ward, setWard] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [optionsCity, setOptionsCity] = useState([]);
  const [optionsDistrict, setOptionsDistricts] = useState([]);
  const [optionsWards, setOptionsWards] = useState([]);

  useEffect(() => {
    (async function () {
      const res = await axios.get(`${API_PROVINCE_URL}?depth=3`);
      setOptionsCity(res.data);
    })();
  }, []);

  useEffect(() => {
    if (optionsCity.length !== 0) {
      const _item = optionsCity.find((item) => item.name === city);
      setOptionsDistricts(_item ? _item.districts : []);
    }
  }, [city, optionsCity]);

  useEffect(() => {
    if (optionsDistrict.length !== 0) {
      const _item = optionsDistrict.find((item) => item.name === district);
      setOptionsWards(_item ? _item.wards : []);
    }
  }, [district, optionsDistrict]);

  async function handleCheckout() {
    if (
      city !== "" &&
      district !== "" &&
      ward !== "" &&
      addressNo !== "" &&
      street !== "" &&
      phoneNumber !== ""
    ) {
      const data = await configAxiosAll(user, dispatch).post(
        `${API_ORDER_URL}`,
        {
          user_id: user.id,
          cart: cart,
          address: `${addressNo} ${street}, ${ward}, ${district}, ${city}`,
          total: selectedCartItems.total,
          telephone: phoneNumber,
        }
      );
      if (data) {
        dispatch(
          showToastMessage({
            open: true,
            text: "Thanh toán thành công",
            type: "success",
          })
        );
        dispatch(removeCartItems(selectedCartItems.items));
        dispatch(
          getSelectedCartItems({
            items: [],
            total: 0,
            count: 0,
          })
        );
        navigate("/");
      } else {
        dispatch(
          showToastMessage({
            open: true,
            text: "Thanh toán thất bại",
            type: "error",
          })
        );
      }
    }
  }

  if (selectedCartItems.items.length === 0) return <Navigate to="/cart" />;

  return (
    <div className="checkout container bg-white">
      <TitleComponent title="Thanh toán" />
      <div className="py-1">
        <div className="row">
          <div className="col-9 col-sm-9 col-md-9 col-lg-9">
            <div className="row">
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Input
                  label="Địa chỉ email"
                  fields={{
                    id: "email",
                    defaultValue: "duychomap123@gmail.com",
                    disabled: true,
                  }}
                />
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Input
                  label="Họ tên"
                  fields={{
                    id: "fullName",
                    defaultValue: "Phan Khánh Duy",
                    disabled: true,
                  }}
                />
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Input
                  label="Số điện thoại"
                  fields={{
                    id: "phoneNumber",
                    placeholder: "Nhập số điện thoại",
                    value: phoneNumber,
                  }}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                />
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Select
                  fields={{ id: "city", value: city }}
                  label="Tỉnh, Thành phố"
                  onChange={(e) => setCity(e.target.value)}
                >
                  {optionsCity.map((item) => {
                    return (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Select
                  fields={{ id: "city", value: district }}
                  label="Quận, Huyện"
                  onChange={(e) => setDistrict(e.target.value)}
                  disabled={optionsDistrict.length === 0}
                >
                  {optionsDistrict.map((item) => {
                    return (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Select
                  fields={{ id: "city", value: ward }}
                  label="Phường"
                  onChange={(e) => setWard(e.target.value)}
                  disabled={optionsWards.length === 0}
                >
                  {optionsWards.map((item) => {
                    return (
                      <option value={item.name} key={item.name}>
                        {item.name}
                      </option>
                    );
                  })}
                </Select>
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Input
                  label="Tên đường"
                  fields={{
                    id: "street",
                    placeholder: "Nhập tên đường",
                    value: street,
                  }}
                  onChange={(e) => setStreet(e.target.value)}
                />
              </div>
              <div className="col-4 col-sm-4 col-md-4 col-lg-4">
                <Input
                  label="Số nhà"
                  fields={{
                    id: "addressNo",
                    placeholder: "Nhập số nhà",
                    value: addressNo,
                  }}
                  onChange={(e) => setAddressNo(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="col-3 col-sm-3 col-md-3 col-lg-3">
            <Input
              label="Mã giảm giá"
              fields={{
                id: "addressNo",
                placeholder: "Nhập mã giảm giá (nếu có)",
              }}
            />
            <div className="d-flex align-items-center justify-content-between">
              <div className="">Tổng tiền</div>
              <div className="">
                {formatThousandDigits(selectedCartItems.total)}đ
              </div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="">Giảm giá</div>
              <div className="">0</div>
            </div>
            <div className="d-flex align-items-center justify-content-between">
              <div className="">Vận chuyển</div>
              <div className="">0</div>
            </div>
            <hr className="my-1" />
            <div className="d-flex align-items-center justify-content-between font-weight-bold">
              <div className="">Tổng cộng</div>
              <div className="">
                {formatThousandDigits(selectedCartItems.total)}đ
              </div>
            </div>
            <div className="text-center my-2">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleCheckout}
              >
                Thanh toán
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
