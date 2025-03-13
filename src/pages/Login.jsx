import "./Login.css";
import netflixLogo from "./../assets/netflix-logo.png";
import { Link } from "react-router-dom";

function Login() {
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
          <form>
            <input
              type="email"
              placeholder="이메일 주소 또는 휴대폰 번호"
              required
            />
            <input type="password" placeholder="비밀번호" required />
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
