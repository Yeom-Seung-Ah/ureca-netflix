import { useState, useEffect } from "react";
import "./Signup.css";
import netflixLogo from "./../assets/netflix-logo.png";
import { Link } from "react-router-dom";
import CryptoJS from "crypto-js";
import axios from "axios";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [passwordValid, setPasswordValid] = useState(true);

  const passwordPattern =
    /^(?=.*[0-9])(?=.*[!@#$%^&*()_+\-={};':"\\|,.<>/?]).{8,}$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));

    if (name === "password") {
      setPasswordValid(passwordPattern.test(value));
    }
  };

  useEffect(() => {
    setErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword:
        formData.confirmPassword &&
        formData.password !== formData.confirmPassword,
    }));
  }, [formData.confirmPassword, formData.password]);

  function sha256(message) {
    return CryptoJS.SHA256(message).toString(CryptoJS.enc.Hex);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    let newErrors = {};

    Object.keys(formData).forEach((key) => {
      if (!formData[key]) newErrors[key] = true;
    });

    if (!passwordValid) {
      newErrors.password = true;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = true;
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      alert("입력값이 올바르지 않습니다.");
      return;
    }

    setErrors(newErrors);
    const formDataToSend = {
      userId: formData.email,
      userPwd: formData.password,
      userName: formData.name,
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/signup",
        formDataToSend
      );
      if (response.data.success) {
        alert("회원가입이 완료되었습니다!");
        setFormData({ name: "", email: "", password: "", confirmPassword: "" });
        setErrors({});
      } else {
        alert(response.data.msg || "회원가입에 실패했습니다.");
      }
    } catch (error) {
      console.error("회원가입 오류:", error);
      alert(error);
    }
  };

  return (
    <div className="signup-background">
      <div className="signup-content">
        <div className="signup-logo">
          <Link to={"/"} className={"navbar-brand"}>
            <img src={netflixLogo} alt="Netflix Logo" />
          </Link>
        </div>
        <div className="signup-box">
          <h2>회원가입</h2>
          <form id="signup-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="이름"
              className={`signup-input ${errors.name ? "error-input" : ""}`}
              value={formData.name}
              onChange={handleChange}
            />

            <input
              type="text"
              name="email"
              placeholder="이메일 또는 휴대폰 번호"
              className={`signup-input ${errors.email ? "error-input" : ""}`}
              value={formData.email}
              onChange={handleChange}
            />

            <input
              type="password"
              name="password"
              placeholder="비밀번호"
              className={`signup-input ${errors.password ? "error-input" : ""}`}
              value={formData.password}
              onChange={handleChange}
            />
            <small className="password-rule">
              ※ 숫자, 특수문자를 포함해 8자 이상 입력하세요.
            </small>
            {errors.password && (
              <p className="error-text">❗ 비밀번호 형식을 확인하세요!</p>
            )}

            <input
              type="password"
              name="confirmPassword"
              placeholder="비밀번호 확인"
              className={`signup-input ${
                errors.confirmPassword ? "error-input" : ""
              }`}
              value={formData.confirmPassword}
              onChange={handleChange}
            />

            <p className="error-text">
              {errors.confirmPassword
                ? "❗ 비밀번호가 일치하지 않습니다!"
                : "\u00A0"}
            </p>

            <button type="submit" className="signup-button">
              가입하기
            </button>
          </form>

          <p className="login-link">
            이미 가입하셨나요? <Link to="/login">로그인</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
