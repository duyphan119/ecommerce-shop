import { useNavigate } from "react-router-dom";
import { configAxiosResponse } from "../../config/configAxios";
import { API_AUTH_URL } from "../../constants";
import "./Register.scss";

const Register = () => {
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email");
    const password = formData.get("password");
    const fullName = formData.get("fullName");
    await configAxiosResponse().post(`${API_AUTH_URL}/register`, {
      email,
      password,
      full_name: fullName,
    });
    navigate("/login");
  }

  return (
    <div className="container">
      <form className="form-login" onSubmit={handleSubmit}>
        <legend>Đăng ký</legend>
        <div className="form-group">
          <label>Họ tên</label>
          <input
            type="text"
            className="form-control"
            name="fullName"
            placeholder="Nhập Họ Tên của bạn"
            required
          />
        </div>
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
            Đăng ký
          </button>
        </div>
      </form>
    </div>
  );
};

export default Register;
