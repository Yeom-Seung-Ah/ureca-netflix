import { useState } from "react";
import "./Login.css";
import netflixLogo from "./../assets/netflix-logo.png";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

function Login() {
  const navigate = useNavigate(); // 페이지 이동을 위한 hook

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

    try {
      const response = await axios.post("http://localhost:8080/login", {
        userId: formData.email, // 백엔드 컬럼명 맞추기
        userPwd: formData.password,
      });
      console.log(response);
      if (response.data.msg === "ok") {
        alert(`${response.data.name}님 환영합니다!`);
        sessionStorage.setItem("user", JSON.stringify(response.data.user)); // 세션 저장
        sessionStorage.setItem("name", JSON.stringify(response.data.name));
        navigate("/"); // 메인 페이지로 이동
      } else {
        setError("이메일 또는 비밀번호를 다시 확인해주세요.");
      }
    } catch (error) {
      console.error("로그인 오류:", error);
      setError("서버 오류가 발생했습니다. 다시 시도해주세요.");
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
