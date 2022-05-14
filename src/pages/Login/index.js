import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { configAxiosResponse } from "../../config/configAxios";
import { API_AUTH_URL } from "../../constants";
import { login } from "../../redux/authSlice";
import "./Login.scss";

const Login = () => {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const data = await configAxiosResponse().post(`${API_AUTH_URL}/login`, {
      email,
      password,
    });
    dispatch(login(data));
    navigate("/");
  }

  return (
    <div className="container">
      <form className="form-login" onSubmit={handleSubmit}>
        <legend>Đăng nhập</legend>

        <div className="form-group">
          <label>Địa chỉ email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            placeholder="Nhập địa chỉ email của bạn"
            required
          />
        </div>
        <div className="form-group">
          <label>Địa chỉ email</label>
          <input
            type="password"
            className="form-control"
            name="password"
            placeholder="Nhập mật khẩu của bạn"
            required
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary">
            Đăng nhập
          </button>
        </div>
      </form>
    </div>
  );
};

export default Login;
