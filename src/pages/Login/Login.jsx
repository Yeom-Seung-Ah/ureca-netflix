import { useState } from "react";
import useAuth from "./../../context/useAuth";
import "./Login.css";
import netflixLogo from "./../../assets/netflix-logo.png";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const { login } = useAuth(); // 로그인 함수 가져오기

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // 입력 중 오류 메시지 초기화
    setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const result = await login(formData.email, formData.password);

    if (!result.success) {
      alert(result.message); // 정확한 오류 메시지가 alert로 출력됨
    }
  };

  return (
    <div className="login-background">
      <div className="login-content">
        <div className="login-logo">
          <Link to={"/"} className="navbar-brand">
            <img src={netflixLogo} alt="Netflix Logo" />
          </Link>
        </div>
        <div className="login-box">
          <h2>로그인</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="email"
              placeholder="이메일 주소 또는 휴대폰 번호"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {error && <p className="error-text">{error}</p>}
            <button type="submit">로그인</button>
          </form>
          <div className="signup-link">
            <p>
              넷플릭스 회원이 아닌가요?{" "}
              <Link to={"/signup"}>지금 가입하세요.</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
